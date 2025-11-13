from functools import lru_cache
import sympy
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application

_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
_ALLOWED = {'sin': sympy.sin, 'cos': sympy.cos, 'exp': sympy.exp}

@lru_cache(maxsize=128)
def _compile(expr_text, var_names):
    local = {name: sympy.Symbol(name) for name in var_names}
    local.update(_ALLOWED)
    expr = parse_expr(expr_text, local_dict=local, transformations=_TRANSFORMS)
    return expr

def derive(expr_text: str, var: str):
    try:
        expr = _compile(expr_text, (var,))
        d = sympy.diff(expr, sympy.Symbol(var))
        return {'message': 'Derivative computed', 'result': str(d), 'latex': sympy.latex(d), 'error': None}
    except Exception as exc:
        return {'message': 'Failed to parse expression', 'result': None, 'latex': None, 'error': str(exc)}
