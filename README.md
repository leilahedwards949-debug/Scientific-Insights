# Scientific Insights Hub

This is a personal, human-centered toolkit I built to make everyday scientific tasks easier: symbolic math, astronomy helpers, quick machine learning demos, and reproducible plots — all accessible from a small web app.

My goal with this repository is to help researchers and students experiment quickly, get clear, friendly feedback from computations, and produce figures they can download and reuse.
## Table of contents

- Introduction
- Human-centered improvements (what I changed and why)
- Quick start
- How each library is used (concise)
- API examples
- Tests, docs and developer notes
- Future improvements
- License
## Introduction

Scientific Insights Hub is a small, friendly web application I built to help people explore scientific ideas fast. It favors clarity and good defaults, returns helpful messages on errors, and makes common tasks—like plotting or solving an equation—feel straightforward.

Design principles:

- Be kind to the user: give actionable error messages and sensible defaults.
- Make results reproducible: deterministic pipelines, saved artifacts, and documented examples.
- Keep the backend testable and the frontend minimal so the tool is easy to extend.
## Key features

- Friendly Symbolic Calculator (SymPy): parse, differentiate, simplify, and show LaTeX along with short, human-readable explanations.
- Astronomy Tools (Astropy): convert coordinates and times with clear units and text descriptions.
- Plot generator (Matplotlib): server-side generation, captions, and a one-click download link.
- ML Playground (Scikit-learn): small, explainable demo models with model summaries and simple visual diagnostics.
- REST API endpoints that return helpful JSON with `message`, `result`, and `error` fields.
- Tests (Pytest) and docs (Sphinx) to keep the project maintainable.
## Tech stack

- Python 3.10+
- Django 4.x (API + simple views)
- SymPy, Astropy, Matplotlib, Scikit-learn
- Pytest for tests, Sphinx for docs
## Libraries & Their Roles (concise + human-centered)

I use each library with an emphasis on returning clear, human-readable outputs and robust validation.

### Django

- Thin API layer: validate, call service, return friendly JSON.
- Provide helpful HTTP statuses and `message` fields in responses.

### Matplotlib

- Generate figures server-side and attach a short caption and metadata (title, axis labels) so users immediately understand the plot.

Example helper (human-friendly):

```python
def plot_xy_with_caption(x, y, title=None):
      buf = plot_xy(x, y, title=title)
      return {
            'image_bytes': buf.getvalue(),
            'caption': title or 'Auto-generated plot',
            'width': 800,
            'height': 400
      }
```

### Scikit-learn

- Small, explainable pipeline. Provide `model_summary()` that returns coefficients, feature names, and a short human message.

### SymPy

- Safe parsing with clear error messages: explain syntax errors and suggest fixes.
- Provide LaTeX and a one-line plain English result when possible.

Example (friendly response):

```json
{
   "result": "2*a*x + 3",
   "latex": "2 a x + 3",
   "message": "Derivative computed: 2*a*x + 3"
}
```

### Astropy

- Return results with units and plain-language descriptions, e.g. "Altitude: 45.3° (above horizon)".

### Pytest & Sphinx

- Tests should assert both machine-level correctness and human-facing messages where appropriate.
- Docs should include short quickstarts that show expected outputs and friendly messages.
## Human-centered improvements (what I changed and why)

I updated the project guidance and added human-first patterns you should apply across the codebase. These are concrete, low-risk changes to improve clarity and UX:

1. Standardized JSON response shape for APIs

   - All endpoints should return: `{ "message": <string>, "result": <object|null>, "error": <string|null> }`.
   - This makes frontend logic simple and gives immediate human feedback.

2. Friendly error handling for parsers

   - For SymPy parsing errors, parse the exception and return a short suggestion, e.g. "Missing operator between '2x' — try '2*x'".

3. Plot captions and download metadata

   - Include `caption`, `width`, `height`, and `suggested_filename` in the plot response so the UI can render and label images clearly.

4. Model summaries for ML

   - Provide a `/api/ml/summary/` endpoint that returns a short explanation of the trained model (coefficients, intercept, score) and a human-friendly sentence like "This model explains X% of variance on the training set.".

5. Astropy outputs with units and comments

   - Return both numeric values and a short description: `{'alt':45.3, 'unit':'deg', 'desc':'45.3° above the horizon at observer location'}`.

6. Tests that check human messages

   - Add assertions ensuring the `message` field is present and helpful, not just machine-level correctness.

These changes are described in code snippets below and are ready to copy into your services and views.
## Quick start (PowerShell)

1. Clone and enter the repo:

```powershell
git clone <repo-url>
cd Scientific-Insights-Hub-main
```

2. Create virtual env and install packages:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3. Run migrations and start the server:

```powershell
python manage.py migrate
python manage.py runserver
```

Open http://127.0.0.1:8000/ and try the Symbolic Calculator and Plotter.
## Using Each Module (quick highlights)

Symbolic math (SymPy)
- Parse safely, return plain-English messages and LaTeX. Use `lambdify` for numeric evaluation.

Astronomy utilities (Astropy)
- Return numeric value, unit, and a short description (e.g., "45.3° above horizon").

Machine learning demo (Scikit-learn)
- Expose train/predict and a `summary` endpoint that returns a short, human-friendly explanation.

Plot generator (Matplotlib)
- Return `image` + `caption` + `suggested_filename` so the UI can render and save with a friendly name.
## API Endpoints (human-friendly examples)

All endpoints return a JSON object with `message`, `result`, and `error` keys. Example:

```json
{ "message": "Derivative computed", "result": {...}, "error": null }
```

Derive expression (SymPy)

```bash
curl -X POST http://127.0.0.1:8000/api/sympy/derive/ \
   -H "Content-Type: application/json" \
   -d '{"expr":"a*x**2 + 3*x","var":"x"}'
```

Plot a function (returns image bytes and metadata)

```bash
curl -X POST http://127.0.0.1:8000/api/plot/function/ \
   -H "Content-Type: application/json" \
   -d '{"expr":"sin(x)","range":[0,6.283]}' --output plot.png
```
## Running tests

Run unit and integration tests with Pytest:

```powershell
pytest -q
```

Include `-k` to filter tests and `-q --maxfail=1` for quick iteration.

## Building documentation

```powershell
cd docs
sphinx-build -b html . _build/html
```

## Screenshots / Example outputs

Replace placeholders in `docs/images/` with real outputs. Try the Symbolic Calculator and the Plotter to generate images you can add here.

## Future improvements

- Add async workers for long-running tasks (Celery/django-rq).
- Add Redis caching for plots and repeated computations.
- Add user accounts and quotas for heavy compute flows.

## License

MIT — see `LICENSE`.

---

If you'd like, I can now apply these human-centric patterns into the codebase directly: add the standardized JSON response helpers, update the SymPy parser to return helpful messages, and modify the plot responses to include captions and filenames. Tell me which code changes you'd like me to commit and I'll make them.
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
