const socket = io()
let Name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do{
    Name = prompt('plese enter your name')
}while(!Name)

textarea.addEventListener('keyup', (e)=>{
    if (e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg ={
        user: Name,
        message: message
    }

    //append

    appendMessage(msg, 'outgoing')

    
    textarea.value = ''
    scrollToBottom()

    //send to server
    socket.emit('message',msg)
}

function appendMessage(msg, type){
    let maindiv = document.createElement('div')
    let className = type
    maindiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p> ${msg.message}</p>
    `
    maindiv.innerHTML = markup
    messageArea.appendChild(maindiv)
}

// recieve message

socket.on('message', (msg) =>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}