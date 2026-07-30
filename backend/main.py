import json
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


app = Handler
    text = payload.review_text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Review text cannot be empty.")

    lower = text.lower()
    
    # Sentiment calculation heuristics
    pos_words = ["great", "excellent", "amazing", "wonderful", "clean", "love", "good", "friendly", "helpful", "beautiful", "best", "perfect", "enjoyed"]
    neg_words = ["poor", "bad", "dirty", "terrible", "noisy", "slow", "broken", "delayed", "horrible", "awful", "cold", "rudely", "disappointed"]
    
    pos_count = sum(1 for w in pos_words if w in lower)
    neg_count = sum(1 for w in neg_words if w in lower)

    if pos_count > neg_count:
        sentiment = "Positive"
        score = min(0.95, 0.65 + pos_count * 0.1)
    elif neg_count > pos_count:
        sentiment = "Negative"
        score = max(0.15, 0.45 - neg_count * 0.1)
    else:
        sentiment = "Neutral"
        score = 0.50

    # Theme extraction
    themes = []
    if any(w in lower for w in ["host", "staff", "owner", "service", "help"]):
        themes.append("Host & Staff")
    if any(w in lower for w in ["location", "place", "view", "beach", "near"]):
        themes.append("Location")
    if any(w in lower for w in ["clean", "tidy", "spotless", "dirty"]):
        themes.append("Cleanliness")
    if any(w in lower for w in ["food", "breakfast", "dinner", "coffee", "restaurant"]):
        themes.append("Food & Dining")
    if any(w in lower for w in ["bed", "ac", "room", "shower", "noisy", "wifi"]):
        themes.append("Room Comfort")

    if not themes:
        themes = ["General Hospitality"]

    # Summary & Action items
    if sentiment == "Positive":
        summary = f"Guest expressed high satisfaction regarding {', '.join(themes)}."
        action_items = [
            "Maintain current high service standards.",
            "Consider asking guest to post a public review on Google / Tripadvisor."
        ]
        suggested_reply = "Dear Guest, thank you so much for your wonderful review! We are delighted you enjoyed your stay and look forward to welcoming you back soon."
    elif sentiment == "Negative":
        summary = f"Guest highlighted issues regarding {', '.join(themes)}."
        action_items = [
            "Investigate mentioned issues with maintenance/housekeeping team.",
            "Send an apology note and partial voucher or complimentary perk."
        ]
        suggested_reply = "Dear Guest, we sincerely apologize for your experience. We take your feedback very seriously and are addressing these issues immediately to improve our stay quality."
    else:
        summary = f"Guest offered balanced feedback regarding {', '.join(themes)}."
        action_items = [
            "Review specific guest recommendations for small amenities or service speed.",
            "Follow up with guest for further suggestions."
        ]
        suggested_reply = "Dear Guest, thank you for taking the time to share your feedback! We appreciate your suggestions and will use them to refine our guest experience."

    return schemas.AIAnalyzeResponse(
        sentiment=sentiment,
        sentiment_score=score,
        themes=themes,
        summary=summary,
        action_items=action_items,
        suggested_reply=suggested_reply
    )