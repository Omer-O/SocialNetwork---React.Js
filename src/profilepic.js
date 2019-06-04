import React from 'react';

export function Profilepic({ imageUrl, first, last, clickHandler }) {
    imageUrl = imageUrl  || "img/profilepic.jpg";
    return (
        <img className="user-img"
         src={imageUrl}
         alt={`${first} ${last}`}
         onClick={clickHandler}
        />
    )//returrn close.
}//profilepic close.


//default image:
//on the server side:
//result.rows[0].imageUrl  || 'default image'
