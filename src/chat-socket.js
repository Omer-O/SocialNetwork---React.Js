import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        //will prevent duplications in the chat.
        socket = io.connect();

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));
        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};

///return {
// ...state,
// chatMessages
// }

// to use for the scroll chat - to put the new massage in the bottom:
// this.elemRef.current.scrollTop = this.elemRef.current.scrollHeight - this.elemRef.current.clientHeight
// const socket = io.connect(); //need to make sure it apperas only 1 time!!
// //and that user that NOT LOGIN cannot connect to the SOCKET.
// //this is suppose to be on the client side:
// socket.emit("yo", {
//     message: "YO"
// });
// socket.on("globalMessage", {
//     msg: "yo!"
// });
//
// io.sockets.sockets[mySocketId].emit();
