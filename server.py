import sys
import os
import json
import csv
import io
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class ThesisExplorerRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def get_tesis_root(self):
        return os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))

    def resolve_safe_path(self, rel_path):
        if not rel_path:
            return None
        tesis_root = self.get_tesis_root()
        clean_path = os.path.normpath(rel_path.lstrip("/"))
        full_path = os.path.abspath(os.path.join(tesis_root, clean_path))
        if full_path.startswith(tesis_root) and os.path.exists(full_path):
            return full_path
        return None

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        url_parts = urllib.parse.urlparse(self.path)
        path = url_parts.path
        query = urllib.parse.parse_qs(url_parts.query)

        if path == "/api/explorer/tree":
            self.handle_api_tree()
        elif path == "/api/explorer/file":
            req_path = query.get("path", [None])[0]
            self.handle_api_file(req_path)
        elif path == "/api/explorer/search":
            q = query.get("q", [""])[0]
            self.handle_api_search(q)
        elif path == "/api/explorer/raw":
            req_path = query.get("path", [None])[0]
            self.handle_api_raw(req_path)
        elif path == "/api/version":
            self.handle_api_version()
        else:
            super().do_GET()

    def handle_api_version(self):
        ver_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "version.json")
        if os.path.exists(ver_file):
            try:
                with open(ver_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                self.send_json(data)
                return
            except Exception as e:
                self.send_json({"error": str(e)}, 500)
                return
        self.send_json({"version": "2.4.0", "build_date": "2026-09-25", "title": "Wetland Monitor Master Thesis"}, 200)

    def handle_api_tree(self):
        tesis_root = self.get_tesis_root()
        manuscript_files = []
        special_items = [
            ("03_Thesis_Manuscript/DATA_DIGEST.md", "Data Digest (Valores Clave y Balances)", "⭐ Síntesis", "gold"),
            ("03_Thesis_Manuscript/Figures_Catalog.md", "Catálogo de Figuras (Enfoque Persona)", "🖼️ Curaduría", "blue"),
            ("03_Thesis_Manuscript/Methods_Chapter_Academic_Enhanced.md", "Capítulo Metodológico Extendido", "🔬 Métodos", "purple"),
            ("03_Thesis_Manuscript/OfficialDraft_Carbon_fluxes.txt", "Borrador Maestro Completo (.txt)", "📄 Manuscrito", "gray"),
        ]
        for rel_path, title, badge, color in special_items:
            full_p = os.path.join(tesis_root, rel_path)
            if os.path.exists(full_p):
                manuscript_files.append({
                    "path": rel_path,
                    "title": title,
                    "badge": badge,
                    "color": color,
                    "size": os.path.getsize(full_p)
                })

        chapters = []
        chap_dir = os.path.join(tesis_root, "03_Thesis_Manuscript/chapters")
        if os.path.exists(chap_dir):
            for f in sorted(os.listdir(chap_dir)):
                if f.endswith(".md"):
                    full_p = os.path.join(chap_dir, f)
                    title = f.replace(".md", "").replace("_", " ")
                    chapters.append({
                        "path": f"03_Thesis_Manuscript/chapters/{f}",
                        "title": title,
                        "size": os.path.getsize(full_p)
                    })

        data_files = []
        data_dir = os.path.join(tesis_root, "01_Pipeline_Resultados/processed_data")
        if os.path.exists(data_dir):
            for f in sorted(os.listdir(data_dir)):
                if f.endswith(".csv"):
                    full_p = os.path.join(data_dir, f)
                    data_files.append({
                        "path": f"01_Pipeline_Resultados/processed_data/{f}",
                        "title": f,
                        "size": os.path.getsize(full_p)
                    })

        figures = []
        fig_dir = os.path.join(tesis_root, "01_Pipeline_Resultados/figures")
        if os.path.exists(fig_dir):
            for f in sorted(os.listdir(fig_dir)):
                if f.lower().endswith((".png", ".jpg")):
                    full_p = os.path.join(fig_dir, f)
                    figures.append({
                        "path": f"01_Pipeline_Resultados/figures/{f}",
                        "title": f,
                        "size": os.path.getsize(full_p)
                    })

        scripts = []
        script_dir = os.path.join(tesis_root, "01_Pipeline_Resultados/scripts")
        if os.path.exists(script_dir):
            for root, dirs, files in os.walk(script_dir):
                for f in files:
                    if f.endswith((".R", ".py", ".sh")) and not f.startswith("."):
                        rel = os.path.relpath(os.path.join(root, f), tesis_root)
                        scripts.append({
                            "path": rel,
                            "title": f,
                            "dir": os.path.basename(root),
                            "size": os.path.getsize(os.path.join(root, f))
                        })

        self.send_json({
            "status": "ok",
            "manuscript_core": manuscript_files,
            "chapters": chapters,
            "data_tables": data_files,
            "figures": figures,
            "scripts": sorted(scripts, key=lambda x: (x["dir"], x["title"]))
        })

    def handle_api_file(self, req_path):
        full_path = self.resolve_safe_path(req_path)
        if not full_path or not os.path.isfile(full_path):
            self.send_json({"error": "File not found or invalid path"}, status=404)
            return

        ext = os.path.splitext(full_path)[1].lower()
        tesis_root = self.get_tesis_root()
        rel_path = os.path.relpath(full_path, tesis_root)

        if ext in [".md", ".txt"]:
            with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            self.send_json({
                "type": "markdown",
                "path": rel_path,
                "title": os.path.basename(full_path),
                "content": content,
                "size": len(content)
            })
        elif ext == ".csv":
            with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                raw_text = f.read()
            f_in = io.StringIO(raw_text)
            reader = csv.reader(f_in)
            rows = []
            for idx, r in enumerate(reader):
                if idx > 300:
                    break
                rows.append(r)
            self.send_json({
                "type": "csv",
                "path": rel_path,
                "title": os.path.basename(full_path),
                "headers": rows[0] if rows else [],
                "rows": rows[1:] if len(rows) > 1 else [],
                "raw": raw_text
            })
        elif ext in [".r", ".py", ".sh", ".json"]:
            with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            lang = "r" if ext == ".r" else ("python" if ext == ".py" else ("bash" if ext == ".sh" else "json"))
            self.send_json({
                "type": "code",
                "lang": lang,
                "path": rel_path,
                "title": os.path.basename(full_path),
                "content": content
            })
        elif ext in [".png", ".jpg", ".jpeg", ".webp"]:
            self.send_json({
                "type": "image",
                "path": rel_path,
                "title": os.path.basename(full_path),
                "raw_url": f"/api/explorer/raw?path={urllib.parse.quote(rel_path)}"
            })
        else:
            self.send_json({"error": "Unsupported file type"}, status=400)

    def handle_api_raw(self, req_path):
        full_path = self.resolve_safe_path(req_path)
        if not full_path or not os.path.isfile(full_path):
            self.send_error(404, "File not found")
            return

        ext = os.path.splitext(full_path)[1].lower()
        mime_map = {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
            ".svg": "image/svg+xml",
            ".pdf": "application/pdf"
        }
        content_type = mime_map.get(ext, "application/octet-stream")

        with open(full_path, "rb") as f:
            data = f.read()

        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def handle_api_search(self, query):
        if not query or len(query.strip()) < 2:
            self.send_json({"results": []})
            return

        tesis_root = self.get_tesis_root()
        q = query.strip().lower()
        results = []

        search_dirs = [
            os.path.join(tesis_root, "03_Thesis_Manuscript"),
            os.path.join(tesis_root, "01_Pipeline_Resultados/processed_data")
        ]

        for sdir in search_dirs:
            if not os.path.exists(sdir):
                continue
            for root, dirs, files in os.walk(sdir):
                for f in files:
                    if f.endswith((".md", ".txt", ".csv")) and not f.startswith("."):
                        fpath = os.path.join(root, f)
                        rel = os.path.relpath(fpath, tesis_root)
                        try:
                            with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
                                for line_idx, line in enumerate(fp):
                                    if q in line.lower():
                                        snippet = line.strip()
                                        if len(snippet) > 200:
                                            snippet = snippet[:200] + "..."
                                        results.append({
                                            "file": rel,
                                            "filename": f,
                                            "line": line_idx + 1,
                                            "snippet": snippet
                                        })
                                        if len(results) >= 60:
                                            break
                        except Exception:
                            pass
                    if len(results) >= 60:
                        break
                if len(results) >= 60:
                    break

        self.send_json({"query": query, "count": len(results), "results": results})

    def log_message(self, format, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")
        sys.stderr.flush()

if __name__ == "__main__":
    port = 1115
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = ThreadingHTTPServer(("0.0.0.0", port), ThesisExplorerRequestHandler)
    print(f"Serving HTTP on 0.0.0.0 port {port} (http://127.0.0.1:{port}/) ...")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
