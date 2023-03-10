import React from 'react';
import { textColor } from '../assets/Constants';

function Text({ text, fontSize })
{
    return (
        <p style = {{ color: textColor, fontSize }}>{text}</p>
    )
}

export default Text;