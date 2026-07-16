// =========================================
// RynovaX AI v6
// Part 1
// =========================================

// Elements
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const newChatBtn = document.getElementById("newChatBtn");
const clearBtn = document.getElementById("clearBtn");
const historyBtn = document.getElementById("historyBtn");
const historyList = document.getElementById("historyList");

// Storage
let chats = JSON.parse(localStorage.getItem("rynovax_chats")) || [];

// Time
function getTime(){

    return new Date().toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit"

    });

}

// Save Current Chat
function saveCurrentChat(){

    localStorage.setItem(

        "rynovax_chat",

        chatBox.innerHTML

    );

}

// Load Current Chat
window.onload = function(){

    const saved = localStorage.getItem("rynovax_chat");

    if(saved){

        chatBox.innerHTML = saved;

    }

    loadHistory();

};

// Save History
function saveHistory(title){

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

// Load History
function loadHistory(){

    historyList.innerHTML = "";

    chats.forEach((chat,index)=>{

        historyList.innerHTML += `

<div class="history-item"
onclick="openHistory(${index})">

💬 ${chat.title}

</div>

`;

    });

}

// Open History
function openHistory(index){

    chatBox.innerHTML = chats[index].content;

    saveCurrentChat();

    sidebar.classList.remove("active");

}

// ===============================
// Copy AI Reply
// ===============================

function copyText(btn){

    const text = btn.parentElement.querySelector(".reply").innerText;

    navigator.clipboard.writeText(text);

    btn.innerHTML = "✅ Copied";

    setTimeout(()=>{

        btn.innerHTML="📋 Copy";

    },2000);

}

// =========================================
// Send Message
// =========================================

async function sendMessage(){

    const message = userInput.value.trim();

    if(message==="") return;

    const title =
    message.length>30
    ? message.substring(0,30)+"..."
    : message;

    // User Message

    chatBox.innerHTML += `

<div class="message user">

<div class="bubble">

${message}

<span class="time">

${getTime()}

</span>

</div>

<div class="avatar">

👤

</div>

</div>

`;

    userInput.value="";

    chatBox.scrollTop = chatBox.scrollHeight;

    // Typing

    chatBox.innerHTML += `

<div class="message ai" id="typing">

<div class="avatar">

🤖

</div>

<div class="bubble">

Thinking...

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

        document.getElementById("typing")?.remove();

        // AI Reply

chatBox.innerHTML += `

<div class="message ai">

    <div class="avatar">
        🤖
    </div>

    <div class="bubble">

        <div class="reply">
            ${data.reply}
        </div>

        <div class="bubble-footer">

            <button class="copy-btn" onclick="copyText(this)">
                📋 Copy
            </button>

            <span class="time">
                ${getTime()}
            </span>

        </div>

    </div>

</div>

`;

    }catch(error){

        document.getElementById("typing")?.remove();

        chatBox.innerHTML += `

<div class="message ai">

<div class="avatar">

🤖

</div>

<div class="bubble">

❌ Unable to connect to RynovaX AI.

</div>

</div>

`;

    }

    saveCurrentChat();

    saveHistory(title);

    chatBox.scrollTop = chatBox.scrollHeight;

}

// =========================================
// Events
// =========================================

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        e.preventDefault();

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

<div class="avatar">

🤖

</div>

<div class="bubble">

<h3>Welcome 👋</h3>

<p>

Hi!

I'm <b>RynovaX AI</b>.

How can I help you today?

</p>

<span class="time">

Now

</span>

</div>

</div>

`;

    saveCurrentChat();

    sidebar.classList.remove("active");

});

// Clear Chat
clearBtn.addEventListener("click", function(){

    if(confirm("Clear current chat?")){

        chatBox.innerHTML = "";

        chats = [];

        historyList.innerHTML = "";

        localStorage.removeItem("rynovax_chat");

        localStorage.removeItem("rynovax_chats");

    }

});

// History
historyBtn.addEventListener("click", function(){

    loadHistory();

    sidebar.classList.add("active");

});

// Close Sidebar when clicking outside
document.addEventListener("click", function(e){

    if(
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ){

        sidebar.classList.remove("active");

    }

});
