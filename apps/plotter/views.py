from rest_framework.views import APIView
from django.http import HttpResponse
from .helpers import plot_expression

class PlotFunctionView(APIView):
    def post(self, request):
        expr = request.data.get('expr')
        r = plot_expression(expr)
        if r['error']:
            return HttpResponse(r['error'], status=400)
        buf = r['buffer']
        return HttpResponse(buf.getvalue(), content_type='image/png')
