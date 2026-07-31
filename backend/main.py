import json


async def app(scope, receive, send):
    if scope["type"] != "http":
        return

    path = scope["path"]
    headers = [(b"content-type", b"application/json")]

    if path in {"/", "/health"}:
        body = json.dumps({"message": "StayInsight AI API", "status": "ok"}).encode("utf-8")
        await send({
            "type": "http.response.start",
            "status": 200,
            "headers": headers,
        })
        await send({"type": "http.response.body", "body": body})
        return

    body = b'{"detail":"not found"}'
    await send({
        "type": "http.response.start",
        "status": 404,
        "headers": headers,
    })
    await send({"type": "http.response.body", "body": body})
