import React from "react";

export default function PopUpBackground({children}) {
    const style = {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 1)',
    };

    return (
        <div>
            {children}
        </div>
    );
}