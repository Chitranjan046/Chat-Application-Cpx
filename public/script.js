const socket = io();

let name;
var text = document.querySelector('#textarea');
var message_area = document.querySelector('.message__area');
var sendButton = document.querySelector('#sendButton');

do {
    name = prompt("Enter your name first");
} while (!name);

function sendMessage() {
    const msg = text.value;
    if (msg.trim() !== '') {
        let mesgObj = {
            user: name,
            message: msg
        };

        appendMessage(mesgObj, "outgoing");

        text.value = '';

        socket.emit('message', mesgObj);
    }
}

text.addEventListener('keyup', (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendButton.addEventListener('click', () => {
    sendMessage();
});

function appendMessage(msg, type) {
    let division = document.createElement("div");
    let className = type;

    division.classList.add(className, "message");

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    division.innerHTML = markup;

    message_area.appendChild(division);
}

socket.on('message', (msg) => {
    appendMessage(msg, "incoming");
});
