from apps.astro_utils.services import ra_dec_to_altaz

def test_ra_dec_to_altaz():
    res = ra_dec_to_altaz(10.684, 41.269, 51.5, -0.13, '2025-11-14T00:00:00')
    assert 'alt' in res and 'az' in res
