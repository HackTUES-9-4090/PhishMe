import React, { useState }  from 'react';
import { textColor } from '../assets/Constants';
import styles from './styles/UserAttacks.module.css';
import GlobalStyles from '../assets/GlobalStyles.module.css';
import UserAttacksDetails from '../pages/DashBoard/components/UserAttacksDetails.component';

function UserAttacks({ employeeName = 'Danail Yordanov', phishingsCount = 1 })
{
    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className = {styles.userAttackContainer}>
            <div className = {styles.userData}>
                <p style = {{ color: textColor, fontSize: 25 }}>{employeeName}</p>

                <div
                    className = {styles.phishings} 
                    style = {{ backgroundColor: phishingsCount > 0 ? '#F0706A' : '#88D453' }}
                >
                    <p style = {{ color: textColor }}>{phishingsCount}</p>
                </div>

            </div>

            {
                seeMore && 
                <UserAttacksDetails/>
            }

            <div className = {GlobalStyles.Center}>
                <div className = {GlobalStyles.centeredRow}>
                    <p 
                        className = {GlobalStyles.Center}
                        style = {{ color: textColor }}
                        onClick = {() => setSeeMore(!seeMore)}
                    >
                        {seeMore ? 'Close details' : 'Open details'}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default UserAttacks;