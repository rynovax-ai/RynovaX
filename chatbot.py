import requests
from config import GEMINI_API_KEY

API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

def ask_ai(message):
    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": message
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(API_URL, json=data)
        result = response.json()

        if response.status_code == 200:
            return result["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return str(result)

    except Exception as e:
        return str(e)

