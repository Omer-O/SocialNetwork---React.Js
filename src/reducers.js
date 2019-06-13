//now we will create a global state.
//this function will update the global state.
export default function reducer(state = {}, action) {
    console.log("this is state reducer:", state);
    if (action.type === "REQUEST_WANNABES") {
        return {
            ...state,
            friendsWannabes: action.receiveFriendsWannabes
        };
    }
    if (action.type === "ADD_WANNABES") {
        return {
            ...state,
            acceptedUserId: action.acceptFriendRequest
        };
    }
    if (action.type === "DELETE_WANNABES") {
        return {
            ...state,
            endUserId: action.unfriend.filter(endUserId)
        };
    }
    console.log("this is action reducer:", action);
    return state;
}
//tips:
//we can use:
//spread operator (...)
// OR object.assign()

//clone our state is ...state, targeting
//type reffer to the retun in actions.js
//here we tell the reducer how to update the list
//of animals to global state.
