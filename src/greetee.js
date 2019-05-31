import React from 'react';

export function Greetee(props) {
    let elem;
    if (props.msg == 'Nice') {
        elem = <div>NICE</div>;
    } else {
        elem = <div>NOT NICE</div>;
    }
    return(
        <span className="ugly" style={({//styling the JSX
            color: 'tomato'
        })}>
            <strong>{props.name  || 'World'}</strong>
            {prop/exclaim && '!!!'}
        </span>
    );
};
