import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
from typing import Dict, Any


def _savefig_to_bytes(fig, fmt='png', dpi=150):
    buf = BytesIO()
    fig.savefig(buf, format=fmt, dpi=dpi, bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return buf


def plot_xy(x, y, title: str = None) -> BytesIO:
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.plot(x, y)
    ax.grid(True)
    if title:
        ax.set_title(title)
    return _savefig_to_bytes(fig, fmt='png')


def plot_with_metadata(x, y, title: str = None) -> Dict[str, Any]:
    buf = plot_xy(x, y, title=title)
    return {
        'image_bytes': buf.getvalue(),
        'caption': title or 'Generated plot',
        'suggested_filename': (title or 'plot').replace(' ', '_') + '.png'
    }
