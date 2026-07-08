import json
import os

MEMORY_FILE = "memory.json"

def load_memory():
    if not os.path.exists(MEMORY_FILE):
        return []

    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []

def save_message(user, ai):
    memory = load_memory()

    memory.append({
        "user": user,
        "assistant": ai
    })

    # Sirf last 20 conversations save karega
    memory = memory[-20:]

    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(memory, f, indent=4, ensure_ascii=False)

def get_memory():
    memory = load_memory()

    if not memory:
        return ""

    text = ""

    for chat in memory:
        text += f"User: {chat['user']}\n"
        text += f"RynovaX AI: {chat['assistant']}\n"

    return text

