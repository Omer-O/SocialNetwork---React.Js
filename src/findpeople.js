
import React from 'react';
import {useState, useEffect } from 'react';
import axios from './axios';
import { Link } from "react-router-dom";

export function FindPeople() {
    const [users, setUsers] = useState([]);
    const [userSrch, setUserSrch] = useState("text");

    useEffect(() => {
        let abort;
        axios.post("/users", {search: userSrch})
        .then(result => {
            console.log('this is data of FindPeople:', result.data);
            if (!abort) {
                setUsers(result.data.users);
                return () => {
                    abort = true;
                }
            }
        });
    }, [userSrch]);//useEffect close.
    return (
        <div>
            <div className="search-bar" >
                <h1>FIND FRIENDS</h1>
                <input
                 name="search"
                 type="text"
                 placeholder="search"
                 onChange={e => setUserSrch(e.target.value)}
                />
            </div>
            <div className="search-results">
                {users.length &&
                    users.map(user => (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`} >
                                <img className="web-img"
                                 src={user.url || "/img/profilepic.jpg"}
                                 alt={`${user.first} ${user.last}`}
                                />
                                <p className="search-name">
                                 {user.first} {user.last}
                                </p>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}//FindPeople close.
