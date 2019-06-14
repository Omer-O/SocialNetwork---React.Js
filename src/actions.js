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
