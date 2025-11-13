import json
from django.test import Client


def test_sympy_derive_endpoint():
    client = Client()
    resp = client.post('/api/sympy/derive/', json.dumps({'expr': 'x**2 + 3*x', 'var': 'x'}), content_type='application/json')
    assert resp.status_code == 200
    data = json.loads(resp.content)
    assert 'message' in data and data['result'] is not None
