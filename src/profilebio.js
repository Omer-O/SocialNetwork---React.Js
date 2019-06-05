import React from 'react';

export function ProfileBio({ clickHandler, first, last }) {
    bio = bio  || "ABOUT";
    return (
             <ul className="user-bio"
                 onClick={clickHandler}>
                 <li>{first} {last}</li>
                 <li>{bio}</li>
             </ul>
    )//return close.
}//ProfileBio close.
