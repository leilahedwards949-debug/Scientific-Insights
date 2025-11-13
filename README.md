# Scientific Insights Hub

This is a personal, human-centered toolkit I built to make everyday scientific tasks easier: symbolic math, astronomy helpers, quick machine learning demos, and reproducible plots — all accessible from a small web app.

My goal with this repository is to help researchers and students experiment quickly, get clear, friendly feedback from computations, and produce figures they can download and reuse.
## Future Improvements

- Expand ML demos with persisted example datasets and saved model artifacts
- Add asynchronous plot generation and caching for heavy visualizations
- Integrate higher-precision ephemeris sources or remote APIs for advanced astronomy use cases
- Improve frontend UX and add interactive notebooks for experimentation
- Add CI (GitHub Actions) to run tests and build docs on push
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
