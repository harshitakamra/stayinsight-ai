import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path in {"/", "/health"}:
            body = {"message": "StayInsight AI API", "status": "ok"}
            payload = json.dumps(body).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        else:
            payload = b'{"detail":"not found"}'
            self.send_response(404)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)

    def do_POST(self):
        payload = b'{"detail":"not implemented"}'
        self.send_response(501)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)


def run():
    port = int(os.environ.get("PORT", "8000"))
    host = "0.0.0.0"
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"Serving on {host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run()
