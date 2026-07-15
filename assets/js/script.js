// ==========================================
// RynovaX AI v4
// Created by Divyanshu Yadav
// ==========================================

// ===== Elements =====

const chatBox = document.getElementById("chatBox");

const userInput = document.getElementById("userInput");

const sendBtn = document.getElementById("sendBtn");

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const newChatBtn = document.getElementById("newChatBtn");

const historyBtn = document.getElementById("historyBtn");

const clearBtn = document.getElementById("clearBtn");

const historyList = document.getElementById("historyList");

// ===== Storage =====

let chats = JSON.parse(

localStorage.getItem("rynovax_chats")

) || [];

// ===== Time =====

function getTime(){

return new Date().toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

}

// ===== Load Chat =====

window.onload=function(){

const savedChat=

localStorage.getItem("rynovax_chat");

if(savedChat){

chatBox.innerHTML=savedChat;

}

loadHistory();

};

// ===== Save Current Chat =====

function saveCurrentChat(){

localStorage.setItem(

"rynovax_chat",

chatBox.innerHTML

);

}

// ===== Save History =====

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

// ===== Load History =====

function loadHistory(){

historyList.innerHTML="";

chats.forEach((chat,index)=>{

historyList.innerHTML+=`

<div
class="history-item"
onclick="openHistory(${index})">

💬 ${chat.title}

</div>

`;

});

}

// ===== Open History =====

function openHistory(index){

chatBox.innerHTML=

chats[index].content;

saveCurrentChat();

}

// ==========================================
// Send Message
// ==========================================

async function sendMessage(){

const message=userInput.value.trim();

if(message==="") return;

const title=

message.length>30

?message.substring(0,30)+"..."

:message;

// ---------- USER MESSAGE ----------

chatBox.innerHTML+=`

<div class="message user">

<div class="bubble">

${message}

<div class="time">

${getTime()}

</div>

</div>

<div class="avatar user-avatar">

👤

</div>

</div>

`;

userInput.value="";

chatBox.scrollTop=chatBox.scrollHeight;

// ---------- Typing ----------

chatBox.innerHTML+=`

<div class="message ai"

id="typing">

<div class="avatar ai-avatar">

🤖

</div>

<div class="bubble">

<span class="typing">

● ● ●

</span>

</div>

</div>

`;

chatBox.scrollTop=chatBox.scrollHeight;

try{

const response=

await fetch(

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

const data=

await response.json();

document

.getElementById("typing")

.remove();

chatBox.innerHTML+=`

<div class="message ai">

<div class="avatar ai-avatar">

🤖

</div>

<div class="bubble">

${data.reply}

<div class="time">

${getTime()}

</div>

</div>

</div>

`;

saveCurrentChat();

saveHistory(title);

chatBox.scrollTop=

chatBox.scrollHeight;

}

catch(error){

document

.getElementById("typing")

.remove();

chatBox.innerHTML+=`

<div class="message ai">

<div class="avatar ai-avatar">

🤖

</div>

<div class="bubble">

❌ Unable to connect.

</div>

</div>

`;

}

}

// ==========================================
// Buttons & Events
// ==========================================

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keydown",function(e){

if(e.key==="Enter"){

e.preventDefault();

sendMessage();

}

});

// Sidebar
menuBtn.addEventListener("click",function(){

sidebar.classList.toggle("active");

});

// New Chat
newChatBtn.addEventListener("click",function(){

chatBox.innerHTML=`

<div class="message ai">

<div class="avatar ai-avatar">

🤖

</div>

<div class="bubble">

<b>RynovaX AI</b>

<br><br>

Hello 👋

I am RynovaX AI.

How can I help you today?

<div class="time">

Now

</div>

</div>

</div>

`;

saveCurrentChat();

sidebar.classList.remove("active");

});

// Clear Chat
clearBtn.addEventListener("click",function(){

if(!confirm("Delete current chat?")) return;

localStorage.removeItem("rynovax_chat");

chatBox.innerHTML="";

sidebar.classList.remove("active");

});

// History
historyBtn.addEventListener("click",function(){

loadHistory();

});

// Close sidebar when clicking outside
document.addEventListener("click",function(e){

if(

!sidebar.contains(e.target)

&&

!menuBtn.contains(e.target)

){

sidebar.classList.remove("active");

}

});
