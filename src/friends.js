import React from "react";
import { connect } from "react-redux";
import { getFriendship, acceptFriendship, unfriend } from "./actions";
import { Link } from "react-router-dom";

class Friends extends React.Component {
    componentDidMount() {
        console.log("componentDidMount!!!!!!");
        this.props.dispatch(getFriendship());
    } //componentDidMount close.
    render() {
        if (!this.props.myFriends) {
            return <h1>LOADING</h1>;
        }
        return (
            <div className="friends-page-wraper">
                <div className="warper-friends">
                    <h1 className="friends-pending">FRIENDS</h1>
                    {this.props.myFriends.length &&
                        this.props.myFriends.map(friend => (
                            <div className="friends" key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    <img
                                        className="web-img"
                                        src={
                                            friend.url || "/img/profilepic.jpg"
                                        }
                                        alt={`${friend.first} ${friend.last}`}
                                    />
                                    <p className="search-name">
                                        {friend.first} {friend.last}
                                    </p>
                                </Link>
                                <button
                                    className="unfriend-accpet-btn"
                                    onClick={e =>
                                        this.props.dispatch(unfriend(friend.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        ))}
                </div>
                <div className="wraper-pending">
                    <h1 className="friends-pending">PENDING REQUESTS</h1>
                    {this.props.pending.length &&
                        this.props.pending.map(pend => (
                            <div className="pending" key={pend.id}>
                                <Link to={`/user/${pend.id}`}>
                                    <img
                                        className="web-img"
                                        src={pend.url || "/img/profilepic.jpg"}
                                        alt={`${pend.first} ${pend.last}`}
                                    />
                                    <p className="search-name">
                                        {pend.first} {pend.last}
                                    </p>
                                </Link>
                                <button
                                    className="pending-accpet-btn"
                                    onClick={e =>
                                        this.props.dispatch(
                                            acceptFriendship(pend.id)
                                        )
                                    }
                                >
                                    accpet
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
} //render close.
const mapStateToProps = state => {
    if (state.myFriends) {
        var friends = [];
        var pending = [];
        state.myFriends.forEach(item => {
            if (item.accepted == true) {
                friends.push(item);
            } else {
                pending.push(item);
            }
        });
    }

    return {
        myFriends: friends,
        pending: pending
    };
};
export default connect(mapStateToProps)(Friends);
//connect the componnent to REDUX:
//always have ti return
//an Object
//once our globalstate (redux) actually has
//something in it
//this info come from the reducers.js => the return
// const mapStateToProps = state => {
//     console.log("state of mapStateToProps:", state);
//     return {
//         myFriends: state.myFriends
//     };
// }; //mapStateToProps close.
//in connect we pass the mapStateToProps as first argument
//and the class/function in 2nd parameter.

//because we will export the connectand not the Component
