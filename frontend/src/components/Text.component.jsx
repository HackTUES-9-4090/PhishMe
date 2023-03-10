import React from 'react';
import { textColor } from '../utils/Constants';

function Text({ text, onClick, style })
{
    return (
        <p 
            style = {{ color: textColor, ...style }}
            {...{ onClick }}
        >
            {text}
        </p>
    )
}

export default Text;