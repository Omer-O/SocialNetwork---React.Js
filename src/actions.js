import axios from "./axios";

//all ajax requests will go in this fileSize
export async function getFriendship() {
    const data = await axios.get("/get-friendship");
    return {
        type: "REQUEST_WANNABES",
        friendsWannabes: data.data.rows
    };
}

export async function acceptFriendship(id) {
    await axios.post("/accept-friendship", { user_id: id });
    return {
        type: "ADD_WANNABES",
        acceptedUserId: id
    };
}

export async function unfriend(id) {
    await axios.post("/end-friendship", { user_id: id });
    return {
        type: "DELETE_WANNABES",
        endUserId: id
    };
}

//live chat:

export function chatMessages(msgs) {
    console.log("received messages (socketIO): ", msgs);
    return {
        type: "CHAT_MESSAGES",
        messages: msgs
    };
}

export function chatMessage(msg) {
    console.log("action chatMessage", msg);
    return {
        type: "ADD_MESSAGE",
        messages: msg
    };
}
