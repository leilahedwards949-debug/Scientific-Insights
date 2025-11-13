import numpy as np
from apps.plotter.helpers import plot_xy, plot_expression
from apps.ml_demo.services import SimpleRegressor

def test_plot_xy_bytes():
    x = np.linspace(0,1,10)
    y = x**2
    buf = plot_xy(x,y)
    data = buf.getvalue()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'

def test_plot_expression_basic():
    r = plot_expression('sin(x)')
    assert r['error'] is None

def test_ml_train_predict():
    X = np.random.RandomState(0).normal(size=(30,2))
    y = X[:,0]*2 + X[:,1]*-1
    model = SimpleRegressor().train(X,y)
    preds = model.predict(X[:5])
    assert len(preds) == 5
import numpy as np
from apps.plotter import plot_xy
from apps.ml_demo import SimpleRegressor


def test_plot_xy_png_header():
    x = np.linspace(0, 1, 10)
    y = x**2
    buf = plot_xy(x, y)
    data = buf.getvalue()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'


def test_ml_train_predict():
    X = np.random.RandomState(0).normal(size=(30, 2))
    y = X[:, 0] * 2.0 + X[:, 1] * -1.0 + 0.1
    model = SimpleRegressor(alpha=1.0).train(X, y)
    preds = model.predict(X[:5])
    assert len(preds) == 5
