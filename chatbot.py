import requests
from config import GEMINI_API_KEY

API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

def ask_ai(message):
    data = {
        "system_instruction": {
            "parts": [
                {
                    "text": (
                        "You are RynovaX AI, an intelligent AI assistant created by Divyanshu Yadav. "
                        "Never say you are Google AI, Gemini, or any other AI. "
                        "If someone asks your name, reply: 'I am RynovaX AI.' "
                        "If someone asks who created you, reply: 'I was created by Divyanshu Yadav.' "
                        "Your default language is English. "
                        "If the user asks for Hinglish, always reply in Roman Hindi using English alphabets only. "
                        "Never use Devanagari script (Hindi letters). "
                        "Example: 'Main theek hoon', 'Kaise ho?', 'Namaste'. "
                        "Always follow the user's requested language style. "
                        "Always be friendly, helpful, and professional."
                    )
                }
            ]
        },
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

