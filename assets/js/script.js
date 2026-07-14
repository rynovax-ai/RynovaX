const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.querySelector(".menu-btn");
const clearBtn = document.getElementById("clearBtn");
const historyBtn = document.getElementById("historyBtn");

function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Load old chat
window.onload = function () {
    const savedChat = localStorage.getItem("rynovax_chat");

    if (savedChat) {
        chatBox.innerHTML = savedChat;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    // User Message
    chatBox.innerHTML += `
<div class="message user">
    <div class="avatar user-avatar">👤</div>
    <div class="bubble">
    ${message}
    <div class="time">${getCurrentTime()}
</div>
</div>
`;

    userInput.value = "";

    // Typing Animation
    chatBox.innerHTML += `
<div class="message ai" id="loading">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">
        RynovaX AI is typing<span class="typing-dots">...</span>
    </div>
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

        document.getElementById("loading")?.remove();

        // AI Reply
        chatBox.innerHTML += `
<div class="message ai">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">
    ${data.reply}
    <div class="time">${getCurrentTime()}
</div>
</div>
`;

    } catch (error) {

        document.getElementById("loading")?.remove();

        chatBox.innerHTML += `
<div class="message ai">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">
        ❌ Unable to connect to RynovaX AI.
    </div>
</div>
`;

    }

    // Save chat after AI reply/error
    localStorage.setItem("rynovax_chat", chatBox.innerHTML);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("rynovax_chat");

    chatBox.innerHTML = `
<div class="message ai">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">
        <b>RynovaX AI</b><br><br>
        Hello! I am RynovaX AI.<br>
        How can I help you today?
    </div>
</div>
`;
});

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});
historyBtn.addEventListener("click", () => {

    const savedChat = localStorage.getItem("rynovax_chat");

    if (savedChat) {
        alert("✅ Chat History Available");
    } else {
        alert("❌ No Chat History Found");
    }

});
