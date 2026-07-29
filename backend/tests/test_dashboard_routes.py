import os
import sys

from fastapi.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import main


def test_reviews_stats_route_is_accessible_for_authenticated_user():
    client = TestClient(main.app)

    login_response = client.post(
        "/login",
        data={"username": "demo@stayinsight.ai", "password": "demo12345"},
    )

    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    stats_response = client.get(
        "/reviews/stats",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert stats_response.status_code == 200
    payload = stats_response.json()
    assert payload["total_reviews"] >= 0
    assert payload["positive_reviews"] >= 0
