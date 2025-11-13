from rest_framework.views import APIView
from rest_framework.response import Response
from .services import ra_dec_to_altaz

class ConvertView(APIView):
    def post(self, request):
        data = request.data
        ra = float(data.get('ra'))
        dec = float(data.get('dec'))
        lat = float(data.get('observer', {}).get('lat', 0))
        lon = float(data.get('observer', {}).get('lon', 0))
        time_iso = data.get('time')
        res = ra_dec_to_altaz(ra, dec, lat, lon, time_iso)
        return Response({'message':'ok','result':res,'error':None})
