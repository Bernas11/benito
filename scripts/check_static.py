from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
files = [ROOT / "config.js", *sorted((ROOT / "assets/js").glob("*.js"))]
for path in files:
    result = subprocess.run(["node", "--check", str(path)], capture_output=True, text=True)
    if result.returncode:
        print(result.stderr, file=sys.stderr)
        raise SystemExit(f"Sintaxe JavaScript inválida: {path.relative_to(ROOT)}")

config = (ROOT / "config.js").read_text(encoding="utf-8")
match = re.search(r"weatherKey:\s*(['\"])(.*?)\1", config, re.S)
if not match:
    raise SystemExit("Não foi possível validar weatherKey em config.js")
if match.group(2).strip():
    raise SystemExit("Não comitas uma chave meteorológica: o valor deve ficar vazio")
print(f"{len(files)} ficheiros JavaScript válidos; weatherKey não está publicada")
