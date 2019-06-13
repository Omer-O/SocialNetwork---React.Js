import axios from "./axios";

//all ajax requests will go in this fileSize
export function receiveFriendsWannabes() {
    return axios.get("/friends-wannabes").then(({ data }) => {
        console.log("this is data of receiveFriendsWannabes:", data);
        return {
            type: "REQUEST_WANNABES",
            friendsWannabes: data
        };
    });
}

export function acceptFriendRequest() {
    return axios.post("/accept-friendship").then(({ data }) => {
        console.log("this is data of acceptFriendRequest:", data);
        return {
            type: "ADD_WANNABES",
            acceptedUserId: data
        };
    });
}

export function unfriend() {
    return axios.post("/end-friendship").then(({ data }) => {
        console.log("this is data of unfriend:", data);
        return {
            type: "DELETE_WANNABES",
            endUserId: data
        };
    });
}
