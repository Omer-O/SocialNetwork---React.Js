
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function FindPeople({x}) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        let abort;
        (async () => {
            const {data} = await axios.get(`/users`);
            console.log('this is data of FindPeople:', data);
        //     if (!abort) {
        //         setUser(data.user);
        //     }
        })();
        return () => {
        //     abort = true;
        };
    }, [x]);
    return (
        <div>
            <ul>
                <li>Hello, {`${x}`}</li>
                <img src={user.url} alt={`${user.first}`} />
            </ul>
            <input onChange={e => setUser(e.target.value)}   defaultValue={user} />
        </div>
    );
}
