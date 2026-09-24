import io
import json
import socket
import subprocess
import sys
from pathlib import Path

import httpx
import pytest

from view_as_ai import cli

FIXTURE = Path(__file__).parent / "fixtures" / "example.html"


def test_file_json_and_local_base(capsys):
    assert (
        cli.main([str(FIXTURE), "--format", "json", "--base-url", "https://launch.test/page"]) == 0
    )
    data = json.loads(capsys.readouterr().out)
    assert data["url"] == "https://launch.test/page"
    assert data["title"] == "Example Domain"
    assert data["urls"] == {"0": "https://iana.org/domains/example"}


def test_stdin_and_numbered_view(monkeypatch, capsys):
    monkeypatch.setattr(sys, "stdin", io.StringIO("<h1>Ready</h1><p>Launch</p>"))
    assert cli.main(["-"]) == 0
    output = capsys.readouterr().out
    assert "View as AI preview; Total lines: 3" in output
    assert "L0: # Ready\nL1: \nL2: Launch" in output


def test_output_file(tmp_path, capsys):
    target = tmp_path / "preview.txt"
    assert cli.main([str(FIXTURE), "--format", "text", "-o", str(target)]) == 0
    assert target.read_text("utf-8").startswith("# Example Domain\n")
    assert capsys.readouterr().out == ""


@pytest.fixture
def mock_http(monkeypatch):
    real_client = httpx.Client

    def install(handler):
        monkeypatch.setattr(
            cli.httpx,
            "Client",
            lambda **kwargs: real_client(transport=httpx.MockTransport(handler), **kwargs),
        )

    return install


def test_url_fetches_origin_html_by_default(mock_http, capsys):
    def handler(request):
        assert request.headers["user-agent"].startswith("Mozilla/5.0")
        return httpx.Response(
            200,
            headers={"content-type": "text/html; charset=utf-8"},
            content=b'<h1>Origin</h1><a href="/next">Next</a>',
            request=request,
        )

    mock_http(handler)
    assert cli.main(["https://launch.test/start", "--format", "json"]) == 0
    result = json.loads(capsys.readouterr().out)
    assert result["text"] == "# Origin\n\n【0†Next】"
    assert result["urls"] == {"0": "https://launch.test/next"}


def test_schemeless_domain_defaults_to_https(mock_http, capsys):
    def handler(request):
        assert request.url == "https://launch.test/path"
        return httpx.Response(
            200,
            headers={"content-type": "text/html; charset=utf-8"},
            text="<h1>Origin</h1>",
            request=request,
        )

    mock_http(handler)
    assert cli.main(["launch.test/path", "--format", "text"]) == 0
    assert capsys.readouterr().out == "# Origin\n"


@pytest.mark.parametrize(
    ("source", "expected"),
    [
        ("http:/launch.test/path", "http://launch.test/path"),
        ("https:/launch.test/path", "https://launch.test/path"),
        ("http:launch.test/path", "http://launch.test/path"),
        ("HTTPS:launch.test/path", "https://launch.test/path"),
    ],
)
def test_explicit_http_scheme_tolerates_missing_slashes(mock_http, capsys, source, expected):
    def handler(request):
        assert str(request.url) == expected
        return httpx.Response(
            200,
            headers={"content-type": "text/html; charset=utf-8"},
            text="<h1>Origin</h1>",
            request=request,
        )

    mock_http(handler)
    assert cli.main([source, "--format", "text"]) == 0
    assert capsys.readouterr().out == "# Origin\n"


@pytest.mark.parametrize(
    "source",
    [
        "https:/",
        "https//launch.test",
        "ftp://launch.test",
        "launch.test:bad-port",
    ],
)
def test_bad_url_reports_invalid_url(source, capsys):
    assert cli.main([source]) == 1
    error = capsys.readouterr().err
    assert error.startswith("view-as-ai: Invalid URL:")
    assert "No such file or directory" not in error


def test_explicit_local_path_remains_local(tmp_path, capsys):
    source = tmp_path / "example.com"
    source.write_text("<h1>Local</h1>", encoding="utf-8")
    assert cli.main([str(source), "--format", "text"]) == 0
    assert capsys.readouterr().out == "# Local\n"


def test_bare_html_name_is_treated_as_website(mock_http, capsys):
    def handler(request):
        assert request.url == "https://page.html"
        return httpx.Response(
            200,
            headers={"content-type": "text/html; charset=utf-8"},
            text="<h1>Remote</h1>",
            request=request,
        )

    mock_http(handler)
    assert cli.main(["page.html", "--format", "text"]) == 0
    assert capsys.readouterr().out == "# Remote\n"


def test_existing_bare_html_name_is_still_treated_as_website(
    tmp_path, monkeypatch, mock_http, capsys
):
    (tmp_path / "page.html").write_text("<h1>Local</h1>", encoding="utf-8")
    monkeypatch.chdir(tmp_path)

    def handler(request):
        assert request.url == "https://page.html"
        return httpx.Response(
            200,
            headers={"content-type": "text/html; charset=utf-8"},
            text="<h1>Remote</h1>",
            request=request,
        )

    mock_http(handler)
    assert cli.main(["page.html", "--format", "text"]) == 0
    assert capsys.readouterr().out == "# Remote\n"


def test_dot_slash_html_path_is_local(tmp_path, monkeypatch, capsys):
    source = tmp_path / "page.html"
    source.write_text("<h1>Local</h1>", encoding="utf-8")
    monkeypatch.chdir(tmp_path)
    assert cli.main(["./page.html", "--format", "text"]) == 0
    assert capsys.readouterr().out == "# Local\n"


def test_redirect_and_http_charset(mock_http, capsys):
    def handler(request):
        if request.url.path == "/start":
            return httpx.Response(302, headers={"location": "/final"}, request=request)
        return httpx.Response(
            200,
            headers={"content-type": "text/html; charset=iso-8859-1"},
            content='<h1>café</h1><a href="next">Next</a>'.encode("latin-1"),
            request=request,
        )

    mock_http(handler)
    assert cli.main(["https://launch.test/start", "--format", "json"]) == 0
    result = json.loads(capsys.readouterr().out)
    assert result["url"] == "https://launch.test/final"
    assert "café" in result["text"]
    assert result["urls"] == {"0": "https://launch.test/next"}


@pytest.mark.parametrize("status", [403, 404, 500])
def test_http_errors(mock_http, capsys, status):
    def handler(request):
        return httpx.Response(status, request=request)

    mock_http(handler)
    assert cli.main(["https://launch.test/"]) == 1
    assert capsys.readouterr().err.startswith(f"view-as-ai: HTTP {status} ")


def test_dns_failure_is_clear(mock_http, capsys):
    def handler(request):
        try:
            raise socket.gaierror(8, "nodename nor servname provided, or not known")
        except socket.gaierror as exc:
            raise httpx.ConnectError(str(exc), request=request) from exc

    mock_http(handler)
    assert cli.main(["page.html"]) == 1
    assert capsys.readouterr().err == "view-as-ai: Could not resolve host: page.html\n"


def test_connection_refused_is_clear(mock_http, capsys):
    def handler(request):
        try:
            raise ConnectionRefusedError(61, "Connection refused")
        except ConnectionRefusedError as exc:
            raise httpx.ConnectError(str(exc), request=request) from exc

    mock_http(handler)
    assert cli.main(["localhost:9"]) == 1
    assert capsys.readouterr().err == "view-as-ai: Connection refused: localhost\n"


def test_timeout_is_clear(mock_http, capsys):
    def handler(request):
        raise httpx.ReadTimeout("timed out", request=request)

    mock_http(handler)
    assert cli.main(["launch.test"]) == 1
    assert capsys.readouterr().err == "view-as-ai: Request timed out: launch.test\n"


def test_unsupported_content_type(mock_http, capsys):
    def handler(request):
        return httpx.Response(200, headers={"content-type": "application/pdf"}, request=request)

    mock_http(handler)
    assert cli.main(["https://launch.test/"]) == 1
    assert "Expected HTML; received application/pdf" in capsys.readouterr().err


def test_empty_html_warns_about_client_rendering(monkeypatch, capsys):
    monkeypatch.setattr(
        sys, "stdin", io.StringIO('<div id="root"></div><script src="app.js"></script>')
    )
    assert cli.main(["-", "--format", "text"]) == 0
    assert "JavaScript content is intentionally not executed" in capsys.readouterr().err


@pytest.mark.parametrize("value", ["0", "-1", "nan", "inf"])
def test_timeout_validation(value):
    with pytest.raises(SystemExit) as exc:
        cli.main([str(FIXTURE), "--timeout", value])
    assert exc.value.code == 2


@pytest.mark.parametrize(
    "value", ["https://", "ftp://host/path", "https://[broken", "https://host:invalid/"]
)
def test_base_url_validation(value):
    with pytest.raises(SystemExit) as exc:
        cli.main([str(FIXTURE), "--base-url", value])
    assert exc.value.code == 2


def test_base_url_rejects_schemeless_remote():
    with pytest.raises(SystemExit) as exc:
        cli.main(["launch.test", "--base-url", "https://base.test/"])
    assert exc.value.code == 2


def test_invalid_remote_port_is_clear_error(capsys):
    assert cli.main(["https://launch.test:invalid/"]) == 1
    assert "Invalid URL" in capsys.readouterr().err


def test_module_entrypoint():
    result = subprocess.run(
        [sys.executable, "-m", "view_as_ai", str(FIXTURE), "--format", "text"],
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr
    assert result.stdout.startswith("# Example Domain\n")


def test_version(capsys):
    with pytest.raises(SystemExit) as exc:
        cli.main(["--version"])
    assert exc.value.code == 0
    assert capsys.readouterr().out.strip() == "view-as-ai 1.0.2"


def test_help_explains_common_usage(capsys):
    with pytest.raises(SystemExit) as exc:
        cli.main(["--help"])
    assert exc.value.code == 0
    output = capsys.readouterr().out
    normalized = " ".join(output.split())
    assert "Preview a website as an AI browsing model sees it." in normalized
    assert "Bare domains use HTTPS" in normalized
    assert "explicit local path (./page.html)" in normalized
    assert "line-numbered view (default), plain text, or JSON" in normalized
