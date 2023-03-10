import React from 'react';
import { textColor } from '../utils/Constants';

function Text({ text, fontSize, onClick })
{
    return (
        <p 
            style = {{ color: textColor, fontSize }}
            {...{ onClick }}
        >
            {text}
        </p>
    )
}

export default Text;