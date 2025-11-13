from apps.sympy_utils import derive


def test_derive_simple():
    res = derive('a*x**2 + 3*x', 'x')
    assert 'derivative' in res
    assert res['message'].startswith('Derivative')
