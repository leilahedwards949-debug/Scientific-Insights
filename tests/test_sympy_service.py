from apps.sympy_utils.services import derive

def test_derive_simple():
    res = derive('a*x**2 + 3*x', 'x')
    assert res['error'] is None
    assert '2*a*x' in res['result'] or '2*a*x + 3' in res['result']
from apps.sympy_utils import derive


def test_derive_simple():
    res = derive('a*x**2 + 3*x', 'x')
    assert 'derivative' in res
    assert res['message'].startswith('Derivative')
