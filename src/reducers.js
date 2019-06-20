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

    if (action.type === "CHAT_MESSAGES") {
        return {
            ...state,
            chat: action.messages.reverse()
        };
    }

    if (action.type === "ADD_MESSAGE") {
        return {
            ...state,
            chat: state.chat.concat(action.messages)
        };
    }
    console.log("this is action reducer:", action);
    return state;
}
