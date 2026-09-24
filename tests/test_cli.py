import io
import json
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
    assert str(status) in capsys.readouterr().err


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
    assert capsys.readouterr().out.strip() == "view-as-ai 1.0.1"
