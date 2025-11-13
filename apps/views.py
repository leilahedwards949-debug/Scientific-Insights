from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import numpy as np

from .common_utils import make_response
from .sympy_utils import derive
from .plotter import plot_with_metadata
from .ml_demo import SimpleRegressor


@csrf_exempt
def sympy_derive_view(request):
    try:
        body = json.loads(request.body)
        expr = body.get('expr')
        var = body.get('var', 'x')
    except Exception as e:
        return JsonResponse(make_response('Invalid JSON', None, str(e)), status=400)

    res = derive(expr, var)
    if 'error' in res:
        return JsonResponse(make_response('Parse error', None, res.get('error') or ''), status=400)
    return JsonResponse(make_response(res.get('message', 'OK'), res))


@csrf_exempt
def plot_function_view(request):
    try:
        body = json.loads(request.body)
        expr = body.get('expr', 'x')
        start, end = body.get('range', [0, 2 * np.pi])
        n = int(body.get('n', 300))
    except Exception as e:
        return JsonResponse(make_response('Invalid request', None, str(e)), status=400)

    # safe evaluation for now uses numpy on a simple expression; in production use sympy lambdify
    x = np.linspace(start, end, n)
    try:
        # naive and safe: only allow 'x' and numpy functions
        # For demo purposes evaluate using numpy's eval environment — in prod, use validated lambdify
        y = eval(expr, {'__builtins__': {}}, {'x': x, 'np': np, 'sin': np.sin, 'cos': np.cos})
    except Exception as e:
        return JsonResponse(make_response('Evaluation error', None, str(e)), status=400)

    meta = plot_with_metadata(x, y, title=expr)
    # return image as binary with suggested filename in header
    response = HttpResponse(meta['image_bytes'], content_type='image/png')
    response['Content-Disposition'] = f'attachment; filename="{meta["suggested_filename"]}"'
    return response


@csrf_exempt
def ml_train_view(request):
    try:
        body = json.loads(request.body)
        # expect body: {"X": [[...]], "y": [...]} for quick demo
        X = np.array(body.get('X'))
        y = np.array(body.get('y'))
    except Exception as e:
        return JsonResponse(make_response('Invalid JSON', None, str(e)), status=400)

    model = SimpleRegressor(alpha=1.0).train(X, y)
    model.save()
    return JsonResponse(make_response('Model trained and saved', {'summary': model.summary()}))


@csrf_exempt
def ml_predict_view(request):
    try:
        body = json.loads(request.body)
        X = np.array(body.get('features'))
    except Exception as e:
        return JsonResponse(make_response('Invalid JSON', None, str(e)), status=400)

    try:
        model = SimpleRegressor.load()
    except Exception as e:
        return JsonResponse(make_response('Model load error', None, str(e)), status=500)

    preds = model.predict(X)
    return JsonResponse(make_response('Prediction successful', {'predictions': preds.tolist()}))
