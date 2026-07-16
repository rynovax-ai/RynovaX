from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

TOKEN="8575100886:AAHQlKObNMX73ToIUPjEwsCm_s6pJ1ifjf8"

async def start(update:Update, context:ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🤖 Rynovix AI Online\nAsk me anything!"
    )

async def chat(update:Update, context:ContextTypes.DEFAULT_TYPE):
    msg=update.message.text

    await update.message.reply_text(
        "AI processing: "+msg
    )


app=Application.builder().token(TOKEN).build()

app.add_handler(CommandHandler("start",start))
app.add_handler(MessageHandler(filters.TEXT,chat))

print("Bot Started")

app.run_polling()
