import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
import numpy as np
from apps.sympy_utils.services import _compile
import sympy

def savefig_to_bytes(fig, fmt='png', dpi=100):
    buf = BytesIO()
    fig.savefig(buf, format=fmt, dpi=dpi, bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return buf

def plot_xy(x, y, title=None):
    fig, ax = plt.subplots(figsize=(8,4))
    ax.plot(x, y)
    if title:
        ax.set_title(title)
    return savefig_to_bytes(fig)

def plot_expression(expr_text, x_range=(0, 2*np.pi), n=200):
    try:
        expr = _compile(expr_text, ('x',))
        fn = sympy.lambdify(sympy.Symbol('x'), expr, 'numpy')
        x = np.linspace(x_range[0], x_range[1], n)
        y = fn(x)
        return {'message':'ok','buffer':plot_xy(x,y,title=expr_text),'error':None}
    except Exception as exc:
        return {'message':'error','buffer':None,'error':str(exc)}
