const ws = require('ws')
const uuid4 = require('uuid').v4
const url = require('url')
const express = require('express')
const http = require('http')

const server = http.createServer();

let test = [];
let connectionFunction = {};


const handMessage = (message,roomId)=>{
    Object.keys(connectionFunction).forEach(uuid =>{
        const confun = connectionFunction[uuid]
        if (confun.roomId === roomId){
            console.log(uuid)
        }
    })

}

const handRemove = (username)=>{
    // const mess = username.toString();
    // console.log(username);
    test = test.filter(user => user.username.trim() !== username.trim());
    // test.pop();
    // console.log(test)
}

const websock = new ws.WebSocketServer({server});

websock.on("connection",(connections,req)=>{
    console.log("websocket is connected...")
    const { roomId, username } = url.parse(req.url,true).query;

    test.push({
        username,
        roomId
    })

    const uuid = uuid4();

    console.log(test);
    connections.username = username;
    connections.roomId = roomId;
    connections.uuid = uuid;

    connectionFunction[uuid] = connections;

    console.log(username)
    connections.on("message",(message)=>handMessage(message,connections.roomId));
    connections.on("close",()=>{handRemove(connections.username)})

})

server.listen(8080,()=>{
    console.log("server is connected");
})