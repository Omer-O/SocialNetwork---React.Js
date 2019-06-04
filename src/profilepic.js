import React from 'react';

export function Profilepic({ imageUrl, first, last, clickHandler }) {
    imageUrl = imageUrl  || "img/profilepic.jpg";
    return (
        <img classNmae="user-image" src={imageUrl} alt={`${first} ${last}`} onClick={clickHandler} />
    )
}


//default image:
//on the server side:
//result.rows[0].imageUrl  || 'default image'

//on the user side:
//imageUrl = imageUrl  || 'default image'
