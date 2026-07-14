// ==========================
// RynovaX AI v2
// Created by Divyanshu Yadav
// ==========================

// Elements
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.querySelector(".menu-btn");

const clearBtn = document.getElementById("clearBtn");
const historyBtn = document.getElementById("historyBtn");
const newChatBtn = document.getElementById("newChatBtn");

const historyList = document.getElementById("historyList");

// Storage
let chats = JSON.parse(localStorage.getItem("rynovax_chats")) || [];

// Time
function getCurrentTime(){

    return new Date().toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}

// Load Page
window.onload=function(){

    const savedChat=localStorage.getItem("rynovax_chat");

    if(savedChat){

        chatBox.innerHTML=savedChat;

    }

    loadHistory();

};

// History List
function loadHistory(){

    historyList.innerHTML="";

    chats.forEach((chat,index)=>{

        historyList.innerHTML+=`

<div class="history-item" onclick="openChat(${index})">

💬 ${chat.title}

</div>

`;

    });

}

// Open Chat
function openChat(index){

    chatBox.innerHTML=chats[index].content;

    localStorage.setItem(

        "rynovax_chat",

        chats[index].content

    );

}

// Save Chat
function saveChat(title){

    chats.unshift({

        title:title,

        content:chatBox.innerHTML

    });

    localStorage.setItem(

        "rynovax_chats",

        JSON.stringify(chats)

    );

    loadHistory();

}
// ==========================
// Send Message
// ==========================

async function sendMessage(){

    const message = userInput.value.trim();

    if(!message) return;

    const chatTitle =
        message.length > 25
        ? message.substring(0,25) + "..."
        : message;

    // User Message
    chatBox.innerHTML += `
<div class="message user">
    <div class="avatar user-avatar">👤</div>
    <div class="bubble">
        ${message}
        <div class="time">${getCurrentTime()}</div>
    </div>
</div>
`;

    userInput.value = "";

    // Typing Animation
    chatBox.innerHTML += `
<div class="message ai" id="loading">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">
        RynovaX AI is typing
        <span class="typing-dots">...</span>
    </div>
</div>
`;

    chatBox.scrollTop = chatBox.scrollHeight;

    try{

        const response = await fetch(
            "https://rynovax.onrender.com/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    message:message
                })
            }
        );

        const data = await response.json();

        document.getElementById("loading")?.remove();

        chatBox.innerHTML += `
<div class="message ai">
    <div class="avatar ai-avatar">🤖</div>
    <div class="bubble">
        ${data.reply}
        <div class="time">${getCurrentTime()}</div>
`;

    }catch(error){

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

    localStorage.setItem(
        "rynovax_chat",
        chatBox.innerHTML
    );

    saveChat(chatTitle);

    chatBox.scrollTop = chatBox.scrollHeight;

}
// ==========================
// Buttons & Events
// ==========================

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        sendMessage();
    }

});

// Sidebar Toggle
menuBtn.addEventListener("click", function(){

    sidebar.classList.toggle("active");

});

// New Chat
newChatBtn.addEventListener("click", function(){

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

    localStorage.removeItem("rynovax_chat");

    chatBox.scrollTop = 0;

});

// Clear Chat
clearBtn.addEventListener("click", function(){

    if(confirm("Clear current chat?")){

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

        localStorage.removeItem("rynovax_chat");

    }

});

// History Button
historyBtn.addEventListener("click", function(){

    if(chats.length===0){

        alert("No chat history found.");

    }else{

        loadHistory();

        sidebar.classList.add("active");

    }

});
