# Running this project

## 1. Activate the virtual environment

```bash
cd /Users/iCastro/Projects/study/anthropic/bca
source .venv/bin/activate
```

## 2. Launch Jupyter Lab

```bash
jupyter lab
```

This opens JupyterLab in your browser. From there, open any of:
- `01_dependencies.ipynb`
- `request.ipynb`
- `system_prompt.ipynb`

## Alternative (no activation needed)

```bash
/Users/iCastro/Projects/study/anthropic/bca/.venv/bin/jupyter lab
```

## When done

```bash
deactivate
```

## Notes

- `.env` holds secrets (e.g. `ANTHROPIC_API_KEY`) and is gitignored.
- To reinstall dependencies: `pip install -r requirements.txt` (with the venv activated).
