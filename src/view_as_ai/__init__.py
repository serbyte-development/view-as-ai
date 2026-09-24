"""Preview a website as AI browsing systems are likely to see it."""

from .parser import PageContents, process_html
from .pruner import prune_html

__version__ = "1.0.1"

__all__ = ["PageContents", "__version__", "process_html", "prune_html"]
