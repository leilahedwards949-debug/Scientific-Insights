from functools import lru_cache
from typing import Dict, Tuple
import sympy
from sympy import Symbol, latex
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application

_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
_ALLOWED = {k: getattr(sympy, k) for k in ['sin', 'cos', 'exp', 'log', 'sqrt']}


@lru_cache(maxsize=256)
def _compile(expr_text: str, var_names: Tuple[str, ...]):
    local = {name: Symbol(name) for name in var_names}
    local.update(_ALLOWED)
    expr = parse_expr(expr_text, local_dict=local, transformations=_TRANSFORMS)
    fn = sympy.lambdify(tuple(local[name] for name in var_names), expr, modules=['numpy'])
    return expr, fn


def derive(expr_text: str, var: str) -> Dict:
    try:
        expr, _ = _compile(expr_text, (var,))
        d = sympy.diff(expr, Symbol(var))
        return {
            'expr': str(expr),
            'derivative': str(d),
            'latex': latex(d),
            'message': f'Derivative computed for variable "{var}".'
        }
    except Exception as e:
        msg = str(e)
        # friendly suggestion for a common mistake
        if 'could not parse' in msg or 'SyntaxError' in msg:
            hint = 'Check for missing operators, e.g. use 2*x instead of 2x.'
        else:
            hint = None
        return {'error': msg, 'hint': hint}
