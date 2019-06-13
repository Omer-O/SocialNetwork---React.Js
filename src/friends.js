import React from "react";
import { connect } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend
} from "./actions";

class Friends extends React.Component {
    componentDidMount() {
        //in function components: props.dispatch();
        this.props.dispatch(getListOfAnimals());
    }
    render() {
        if (!this.props.myFriends) {
            //here we say that if the animals does not exist than:
            return;
            //it is very known problem.
        }
        return (
            <div>
                <h1>REDUUUUUUUUUUXXXXXXXXX</h1>
                {this.props.myFriends.length &&
                    this.props.myFriends.map(friend => (
                        <div key={friend}> {friend}</div>
                    ))}
            </div>
        );
    }
}
//connect the componnent to REDUX:
const mapStateToProps = state => {
    //always have ti return
    //an Object
    console.log("state of mapStateToProps:", state);
    return {
        //once our globalstate (redux) actually has
        //something in it
        myFriends: state.listAnimals
        //this info come from the reducers.js => the return
        //
    };
};
export default connect(mapStateToProps)(Friends);
//in connect we pass the mapStateToProps as first argument
//and the class/function in 2nd parameter.

//because we will export the connectand not the Component
