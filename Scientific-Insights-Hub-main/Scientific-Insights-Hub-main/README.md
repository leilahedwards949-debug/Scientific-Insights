# Scientific Insights Hub

I built Scientific Insights Hub as a cohesive toolkit for scientists, researchers, and students who want to combine symbolic math, astronomy utilities, interactive plotting, and lightweight machine learning demos in one reproducible project. This repository contains a Django backend that exposes computational and plotting endpoints, example helper modules, tests, and developer documentation.

---

## Table of contents

- Project title
- Introduction / Overview
- Key features
- Tech stack
- Libraries & their roles
- Project architecture
- Installation & setup
- How to run the app
- Using each module
   - Symbolic math (SymPy)
   - Astronomical utilities (Astropy)
   - Machine learning demo (Scikit-learn)
   - Plot generator (Matplotlib)
- API endpoints
- Running tests (Pytest)
- Building documentation (Sphinx)
- Screenshots / example outputs (placeholders)
- Future improvements
- License

---

## Introduction / Overview

Scientific Insights Hub is a practical, full‑stack example that demonstrates how to combine symbolic computation, astronomy utilities, plotting, and simple machine learning into a single reproducible application. I designed it to be a sandbox for exploration, teaching, and quick prototyping.

Core goals:

- Make symbolic math workflows accessible through a web API and helper functions.
- Provide astronomy utilities (coordinate transforms, time handling) using Astropy.
- Generate publication-quality plots with Matplotlib and serve them via Django.
- Demonstrate small, well-documented ML examples using Scikit-learn.
- Ship tests and developer docs so others can extend and reproduce results.

## Key features

- Symbolic math: parsing, differentiation, simplification, substitution, and LaTeX rendering via SymPy.
- Astronomy utilities: coordinate conversions, time scale handling, and basic ephemeris helpers using Astropy.
- Plot generator: server-side Matplotlib utilities that return PNG/SVG images for embedding or download.
- ML playground: lightweight Scikit-learn demos (regression/classification) with training and inference helpers.
- REST API: endpoints that run computations, generate plots, and run ML demos.
- Tests & docs: Pytest-based unit/integration tests and Sphinx-built developer documentation.

## Tech stack

- Python 3.10+ (recommended)
- Django (web framework / REST API)
- SymPy (symbolic math)
- Astropy (astronomy utilities)
- Matplotlib (plotting)
- Scikit-learn (machine learning examples)
- Pytest (testing)
- Sphinx (documentation)

## Libraries & Their Roles

### Django

Django provides the web framework that exposes API endpoints, serves static/media assets (generated plots), and organizes the backend logic into apps. Typical responsibilities:

- URL routing and request handling
- Returning generated plot images or JSON results
- Running background tasks or caching for expensive operations (optional)

### Matplotlib

Used to produce PNG/SVG figures on demand. I include helpers that accept arrays, model outputs, or symbolic expressions and return image buffers that Django can stream to clients.

Example (server-side plotting helper):

```python
from io import BytesIO
import matplotlib.pyplot as plt

def plot_example(x, y):
      fig, ax = plt.subplots()
      ax.plot(x, y)
      buf = BytesIO()
      fig.savefig(buf, format='png', bbox_inches='tight')
      buf.seek(0)
      return buf
```

### Scikit-learn

Provides quick, reproducible ML examples. I keep pipelines small and deterministic so they can be used in demos and tests.

Example (training a linear regressor):

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
preds = model.predict(X_test)
```

### SymPy

SymPy powers the symbolic math module: parsing, differentiation, simplification, substitution, and LaTeX rendering.

Example:

```python
from sympy import symbols, diff, latex

x, a = symbols('x a')
expr = a*x**2 + 3*x
deriv = diff(expr, x)
latex_str = latex(deriv)  # -> '2 a x + 3'
```

### Astropy

Astropy handles astronomy-specific utilities such as coordinate conversions (ICRS <-> AltAz), times and time scales, and basic ephemeris utilities. Outputs use Astropy Quantities where appropriate.

Example (coordinate conversion):

```python
from astropy.coordinates import SkyCoord
from astropy import units as u

coord = SkyCoord(ra=10.684*u.degree, dec=41.269*u.degree, frame='icrs')
# transform_to requires an observer/time for AltAz; see helper functions in astro_utils
```

### Pytest

Unit and integration tests verify the core logic (symbolic parsing, AST transforms, plot generation) and API endpoints. Tests live under `tests/` and use fixtures for repeatability.

### Sphinx

Sphinx builds the developer documentation (API reference and how-to guides). I keep docstrings in modules and provide a small Sphinx config under `docs/`.

## Project architecture

High-level layout (implementation details may vary):

- manage.py (Django entry)
- project/ (Django project settings)
   - apps/
      - sympy_utils/         # symbolic math helpers + API views
      - astro_utils/         # Astropy utilities + API views
      - plotter/             # Matplotlib plot generation + endpoints
      - ml_demo/             # Scikit-learn examples and wrappers
- static/                 # optional static assets
- docs/                   # Sphinx docs
- tests/                  # Pytest test suite

This structure keeps computation logic inside small, testable modules and reserves Django views as thin wrappers that validate input and format responses.

## Installation & Setup

These instructions assume you are using PowerShell on Windows. Adapt the shell commands if you use WSL or another environment.

1. Clone the repository

```powershell
git clone <repo-url>
cd Scientific-Insights-Hub-main
```

2. Create and activate a virtual environment

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
```

3. Install dependencies

If the project contains a `requirements.txt` file:

```powershell
pip install -r requirements.txt
```

Otherwise install the core libraries:

```powershell
pip install django sympy astropy matplotlib scikit-learn pytest sphinx
```

4. Run Django migrations

```powershell
python manage.py migrate
```

5. (Optional) Create an admin user

```powershell
python manage.py createsuperuser
```

## How to Run the App

Start the Django development server:

```powershell
python manage.py runserver
```

Open http://127.0.0.1:8000/ in your browser. API endpoints are available under `/api/` by default (see the API Endpoints section).

If the repository includes a separate frontend (for example a Vite/React app), consult its README and run it in parallel.

## Using Each Module

### Symbolic math (SymPy)

Module responsibilities:

- Parse string expressions into SymPy expressions
- Differentiate and simplify
- Evaluate numerically with variable substitutions
- Render LaTeX for embedding in docs or UI

Example usage (Python helper):

```python
from sympy_utils.helpers import parse_and_diff
res = parse_and_diff('a*x**2 + 3*x', var='x')
print(res['derivative_latex'])
```

### Astronomical utilities (Astropy)

Module responsibilities:

- Convert coordinates (RA/Dec ↔ Alt/Az given observer location and time)
- Handle time scale conversions and produce timezone-aware strings
- Provide basic rise/set/visibility helpers

Example usage:

```python
from astro_utils.helpers import ra_dec_to_altaz
altaz = ra_dec_to_altaz(ra=10.684, dec=41.269, observer_location=(lat, lon), time='2025-11-14T00:00:00')
print(altaz)
```

### Machine learning demo (Scikit-learn)

Module responsibilities:

- Small, self-contained training/inference scripts (linear regression, small classifier)
- Example preprocessing pipelines and metrics
- Utilities to serialize/deserialize model objects for short-term reuse

Example usage:

```python
from ml_demo.simple import train_linear_regression, predict
model = train_linear_regression(X_train, y_train)
preds = predict(model, X_new)
```

### Plot generator (Matplotlib)

Module responsibilities:

- Produce PNG/SVG images from arrays, model outputs, or symbolic expressions
- Return image buffers that Django responds with as image content
- Optional utilities to style figures for publication

Example usage:

```python
from plotter.helpers import plot_expression
buf = plot_expression('sin(x)', x_range=(0, 2*3.14159))
# return buf.getvalue() as image/png in an HttpResponse
```

## API Endpoints

The exact endpoints are defined in the Django URL configuration. Typical patterns used in this project are:

- POST /api/sympy/expr/derive/   - body: { "expr": "a*x**2", "var": "x" }
- POST /api/plot/                - body: { "type": "function", "expr": "sin(x)", "range": [0,6.28] }
- POST /api/astro/convert/       - body: { "ra": 10.684, "dec": 41.269, "time": "...", "observer": {...} }
- POST /api/ml/train/            - body: { "demo": "linear_regression", "params": {...} }
- POST /api/ml/predict/          - body: { "demo": "linear_regression", "features": [...] }

Responses follow a simple JSON schema with the following keys (where relevant):

- `result`: the main result (string, number, or object)
- `latex`: LaTeX rendering of symbolic results
- `image_url` or binary image response for plot endpoints
- `error`: when an exception occurred

Example curl (derive an expression):

```powershell
curl -X POST http://127.0.0.1:8000/api/sympy/expr/derive/ \
   -H "Content-Type: application/json" \
   -d '{"expr": "a*x**2 + 3*x", "var": "x"}'
```

## Running Tests (Pytest)

Run the full test suite with:

```powershell
pytest -q
```

To run a subset of tests:

```powershell
pytest tests/test_sympy_utils.py -q
```

## Building Documentation (Sphinx)

From the `docs/` directory run:

```powershell
# using make on Windows via GnuWin or WSL is optional
sphinx-build -b html . _build/html
```

HTML docs will appear in `docs/_build/html/`.

## Screenshots / Example Outputs

Replace the placeholders below with real images in `docs/images/` or `assets/`.

![Placeholder: symbolic math output](docs/images/sympy-example.png)

![Placeholder: plot output](docs/images/plot-example.png)

![Placeholder: ML demo UI](docs/images/ml-demo.png)

## Future Improvements

- Expand ML demos with persisted example datasets and saved model artifacts
- Add asynchronous plot generation and caching for heavy visualizations
- Integrate higher-precision ephemeris sources or remote APIs for advanced astronomy use cases
- Improve frontend UX and add interactive notebooks for experimentation
- Add CI (GitHub Actions) to run tests and build docs on push

## License

This project is released under the MIT License — see LICENSE for details.

---

If you want, I can also generate a minimal `requirements.txt`, a Sphinx config, or a short quickstart script to launch the backend and any frontend. Tell me which artifact you'd like next and I'll implement it.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1xVXjUftWhl8jYLzeIFSzaNmcr0c9eIlt

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
