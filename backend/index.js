const ws = require('ws')
const uuid4 = require('uuid').v4
const url = require('url')
const express = require('express')
const http = require('http')


const server = http.createServer();

let test = [];
const connectionFunction = {};
const roomId = [1,2];
const romMembers = {
    1:{
        "members" : ["Mounesh","Gokul"],
        "Message" : [{
            "mess" : "Hi,I am MOunesh",
            "by" : "Mounesh"
        },
        {
            "mess":"hi, I am gokul",
            "by" : "Gokul"
        }
    ]
    },
    2:{
        "members" : ["Jeva","Nimal"],
        "Message" : [{
            "mess" : "Hi,I am Jeva",
            "by" : "Jeva"
        },
        {
            "mess":"hi, I am Nimal",
            "by" : "Nimal"
        }
    ]
    }
};

const handMessage = (message)=>{
    const mess = message.toString();
    console.log(mess);
}

const handRemove = (username)=>{
    // const mess = username.toString();
    console.log(username);
    test = test.filter(user => user.username.trim() !== username.trim());
    // test.pop();
    console.log(test)
}

const websock = new ws.WebSocketServer({server});

websock.on("connection",(connections,req)=>{
    console.log("websocket is connected...")
    const { roomId, username } = url.parse(req.url,true).query;

    test.push({
        username,
        roomId
    })

    console.log(test);

    connections.username = username;
    console.log(username)
    connections.on("message",(message)=>handMessage(message));
    connections.on("close",()=>{handRemove(connections.username)})

})

server.listen(8080,()=>{
    console.log("server is connected");
})