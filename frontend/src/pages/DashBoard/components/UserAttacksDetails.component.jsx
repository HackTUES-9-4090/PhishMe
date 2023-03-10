import React from 'react';
import Text from '../../../components/Text.component';
import styles from '../styles/UserAttacksDetails.module.css';
import GlobalStyles from '../../../utils/GlobalStyles.module.css';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

function UserAttacksDetails({ attackName = 'Car phishing email', communcationType = 'Formal', success = true})
{
    return (
        <div className = {styles.attackDetailsContainer}>
            <div className = {styles.attackDetails}>
                <div>
                    <Text text = {'Attack name: ' + attackName}/>
                    <Text text = {'Communication type: ' + communcationType}/>
                </div>

                <div 
                    style = {{ justifyContent: 'space-between', width: '25%'}}
                    className = {GlobalStyles.centeredRow}
                >
                {
                    success 
                    ? <CheckOutlined style = {{ fontSize: 35, color: 'green' }}/>
                    : <CloseOutlined style = {{ fontSize: 35, color: 'red' }} />
                }

                <Text text = {success ? 'Passed' : 'Failed'} fontSize = {20}/>
                </div> 
            </div>

            <Divider style = {{ backgroundColor: '#ffffff' }} />
        </div>
    )
}

export default UserAttacksDetails;