import React from 'react';
import {useState, useEffect } from 'react';
import axios from './axios';

export function FriendsButton(props) {
    const [friendRequest, setFriendRequest] = useState("");

    function updateRelationship() {
           console.log("i am async updateRelationship");
               axios.post("/friends", {
                       user_id: props.user_id,
                       status: friendRequest
               }).then(result => {
                   console.log("results of updateRelationship", result);
                   setFriendRequest(result.data.status);
               }).catch (error => {
                   console.log('updateRelationship ERROR:', error);
               });
   }//updateRelationship close.

    useEffect(() => {
        axios.get("/friends/" + props.user_id)
        .then(result => {
            console.log("this is result of /friends:", result);
            setFriendRequest(result.data.status);
        }).catch (error => {
            console.log('useEffect of friendship ERROR:', error);
        });
    }, []);//useEffect close.
    return (
            <button className="friend-btn"
             onClick={updateRelationship}
            >{friendRequest}</button>
    );
}//FriendsButton close.
