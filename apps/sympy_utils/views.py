from rest_framework.views import APIView
from rest_framework.response import Response
from .services import derive

class DeriveView(APIView):
    def post(self, request):
        expr = request.data.get('expr')
        var = request.data.get('var', 'x')
        res = derive(expr, var)
        status_code = 200 if res.get('error') is None else 400
        return Response(res, status=status_code)
