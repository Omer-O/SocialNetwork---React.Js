import axios from "./axios";

//all ajax requests will go in this fileSize
export function getFriendship() {
    return axios
        .get("/get-friendship")
        .then(({ data }) => {
            console.log("this is data of getFriendship:", data);
            return {
                type: "REQUEST_WANNABES",
                friendsWannabes: data
            };
        })
        .catch(error => {
            console.log("receiveFriendsWannabes ERROR:", error);
        });
}

// export function acceptFriendship() {
//     return axios
//         .post("/accept-friendship")
//         .then(({ data }) => {
//             console.log("this is data of acceptFriendship:", data);
//             return {
//                 type: "ADD_WANNABES",
//                 acceptedUserId: data
//             };
//         })
//         .catch(error => {
//             console.log("acceptFriendRequest ERROR:", error);
//         });
// }
//
// export function unfriend() {
//     return axios
//         .post("/end-friendship")
//         .then(({ data }) => {
//             console.log("this is data of unfriend:", data);
//             return {
//                 type: "DELETE_WANNABES",
//                 endUserId: data
//             };
//         })
//         .catch(error => {
//             console.log("unfriend ERROR:", error);
//         });
// }
