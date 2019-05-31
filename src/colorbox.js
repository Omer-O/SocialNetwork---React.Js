import React from 'react';

export function ColorBox({ color, children }) {
    return (
        <span style={{ backgroundColor: color }}>
            {children}
        </span>
    );
}
