import React from 'react';

export function Profilepic({ showUpload, imageUrl, first, last }) {
    imageUrl = imageUrl  || "/img/profilepic.jpg";
    return (
        <img className="user-img"
         src={imageUrl}
         alt={`${first} ${last}`}
         onClick={showUpload}
        />
    )//return close.
}//profilepic close.
