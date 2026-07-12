const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

async function sendMessage() {
    const message = userInput.value.trim();

    if (!message) return;

    chatBox.innerHTML += `
<div class="message user">
    <div class="avatar user-avatar">👤</div>
    <div class="bubble">${message}</div>
</div>
`;

    userInput.value = "";
chatBox.innerHTML += `
<div class="message ai" id="loading">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">
        RynovaX AI is typing<span class="typing-dots">...</span>
    </div>
</div>
`;
    chatBox.innerHTML += `
<div class="message user">
    <div class="avatar user-avatar">👤</div>
    <div class="bubble">${message}</div>
</div>
`;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("https://rynovax.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
<div class="message ai">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">${data.reply}</div>
</div>
`;

    } catch (error) {

        document.getElementById("loading")?.remove();  

    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

