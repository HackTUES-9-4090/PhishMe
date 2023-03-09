import React from 'react';
import { textColor } from '../assets/Constants';
import styles from './styles/UserAttacks.module.css';

function UserAttacks({ employeeName, phishingsCount })
{
    return (
        <div className = {styles.userAttackContainer}>
            <p style = {{ color: textColor, fontSize: 25 }}>{employeeName}</p>

            <div
                className = {styles.phishings} 
                style = {{ backgroundColor: phishingsCount > 0 ? '#F0706A' : '#88D453' }}
            >
                <p style = {{ color: textColor }}>{phishingsCount}</p>
            </div>
        </div>
    )
}

export default UserAttacks;