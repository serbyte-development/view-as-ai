from view_as_ai import process_html, prune_html


def _text(html: str) -> str:
    return process_html(prune_html(html), "https://example.test/").text


def test_explicit_menu_popup_is_pruned_but_primary_nav_is_kept():
    html = """
    <nav><a href="/docs">Docs</a></nav>
    <ul role="menu"><li><button>Light</button></li><li><button>Dark</button></li></ul>
    <main><h1>Page</h1></main>
    """
    text = _text(html)
    assert "Docs" in text
    assert "Light" not in text
    assert "Dark" not in text
    assert "# Page" in text


def test_plain_hidden_control_wrapper_is_retained_without_stronger_signal():
    html = """
    <div class="hidden"><form><input placeholder="Search this book ..."></form></div>
    <main><p>Readable content</p></main>
    """
    text = _text(html)
    assert "Search this book" in text
    assert "Readable content" in text


def test_contextual_related_navigation_is_pruned():
    html = """
    <main>
      <article><h1>Passport</h1><p>Apply online.</p></article>
      <div class="gem-c-contextual-sidebar">
        <div class="gem-c-related-navigation"><h2>Related content</h2><a href="/fees">Fees</a></div>
      </div>
    </main>
    """
    text = _text(html)
    assert "# Passport" in text
    assert "Apply online." in text
    assert "Related content" not in text
    assert "Fees" not in text


def test_preference_switcher_is_pruned_without_touching_forms():
    html = """
    <div class="color-theme"><button>Theme</button><button>Dark</button></div>
    <div class="language-switcher"><a href="/fr">Français</a></div>
    <form class="gravity-theme"><input placeholder="Email"></form>
    <main><p>Body</p></main>
    """
    text = _text(html)
    assert "Theme" not in text
    assert "Dark" not in text
    assert "Français" not in text
    assert "[Input: Email]" in text
    assert "Body" in text


def test_secondary_navigation_items_are_pruned_without_dropping_global_nav():
    html = """
    <nav class="global-nav"><a href="/missions">Missions</a></nav>
    <div class="hds-secondary-navigation-menu-items"><nav><a href="/mars">Mars Home</a></nav></div>
    <main><h1>Mars Facts</h1></main>
    """
    text = _text(html)
    assert "Missions" in text
    assert "Mars Home" not in text
    assert "# Mars Facts" in text


def test_complementary_sidebar_is_pruned_but_main_content_remains():
    html = """
    <main><article><h1>Credit reports</h1><p>Main guidance.</p></article></main>
    <aside role="complementary"><h2>Related resources</h2><a href="/more">More</a></aside>
    """
    text = _text(html)
    assert "# Credit reports" in text
    assert "Main guidance." in text
    assert "Related resources" not in text
    assert "More" not in text


def test_explicit_contentinfo_region_is_pruned():
    html = """
    <main><h1>Guide</h1><p>Main information.</p></main>
    <footer role="contentinfo"><h2>Quick links</h2><a href="/contact">Contact</a></footer>
    """
    text = _text(html)
    assert "# Guide" in text
    assert "Main information." in text
    assert "Quick links" not in text
    assert "Contact" not in text


def test_explicit_utility_navigation_is_pruned():
    html = """
    <nav><a href="/home">Home</a></nav>
    <ul class="site-utility-nav"><li><a href="/alerts">Alerts</a></li></ul>
    <main><h1>Visit</h1></main>
    """
    text = _text(html)
    assert "Home" in text
    assert "Alerts" not in text
    assert "# Visit" in text


def test_bootstrap_navbar_is_pruned_without_dropping_ordinary_nav():
    html = """
    <nav class="navbar navbar-expand-lg"><a href="/about">About</a></nav>
    <nav class="primary-links"><a href="/docs">Docs</a></nav>
    <main><h1>Tutorial</h1></main>
    """
    text = _text(html)
    assert "About" not in text
    assert "Docs" in text
    assert "# Tutorial" in text
