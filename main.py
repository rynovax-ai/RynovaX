from chatbot import ask_ai

print("=" * 40)
print("🤖 RynovaX AI Started")
print("Type 'exit' to quit")
print("=" * 40)

while True:
    user_input = input("\nYou: ")

    if user_input.lower() == "exit":
        print("RynovaX AI: Goodbye! 👋")
        break

    reply = ask_ai(user_input)
    print(f"\nRynovaX AI: {reply}")

