from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import ask_ai

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "RynovaX AI API is running!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "No message"}), 400

    reply = ask_ai(data["message"])

    return jsonify({
        "reply": reply
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

