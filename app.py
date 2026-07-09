from flask import Flask, request, jsonify
from chatbot import ask_ai

app = Flask(__name__)

@app.route("/")
def home():
    return "RynovaX AI API is running!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "No message provided"}), 400

    user_message = data["message"]
    reply = ask_ai(user_message)

    return jsonify({
        "reply": reply
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

