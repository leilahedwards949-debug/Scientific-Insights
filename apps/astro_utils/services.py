from astropy.coordinates import SkyCoord, EarthLocation, AltAz
from astropy import units as u
from astropy.time import Time

def ra_dec_to_altaz(ra, dec, lat, lon, time_iso):
    coord = SkyCoord(ra=ra*u.degree, dec=dec*u.degree, frame='icrs')
    loc = EarthLocation(lat=lat*u.degree, lon=lon*u.degree)
    t = Time(time_iso)
    altaz = coord.transform_to(AltAz(obstime=t, location=loc))
    return {'alt': altaz.alt.degree, 'az': altaz.az.degree, 'unit': 'deg', 'desc': f"Altitude {altaz.alt.degree:.2f}°"}
