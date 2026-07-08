from chatbot import ask_ai

print("=" * 40)
print("🤖 Nova AI Started")
print("Type 'exit' to quit")
print("=" * 40)

while True:
    user = input("\nYou: ")

    if user.lower() == "exit":
        print("Nova AI: Goodbye! 👋")
        break

    reply = ask_ai(user)
    print(f"\nNova AI: {reply}")

