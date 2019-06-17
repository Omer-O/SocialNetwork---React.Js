//now we will create a global state.
//this function will update the global state.
export default function reducer(state = {}, action) {
    console.log("this is state reducer:", state);
    if (action.type === "REQUEST_WANNABES") {
        return {
            ...state,
            myFriends: action.friendsWannabes
        };
    }
    if (action.type === "ADD_WANNABES") {
        return {
            ...state,
            myFriends: state.myFriends.map(friend => {
                if (friend.id == action.acceptedUserId) {
                    return {
                        ...friend,
                        accepted: true
                    };
                } else {
                    return friend;
                }
            })
        };
    }
    if (action.type === "DELETE_WANNABES") {
        return {
            ...state,
            myFriends: state.myFriends.filter(
                friend => friend.id != action.endUserId
            )
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
