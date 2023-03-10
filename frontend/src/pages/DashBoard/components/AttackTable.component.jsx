import React from 'react';
import { Table } from 'antd';
import { VerticalLeftOutlined } from '@ant-design/icons';
import { textColor } from "../../../utils/Constants";
import Text from '../../../components/Text.component';

function AttackTable()
{
    function render(text, record)
    {
    return {
        props: { style: 
        {  
        background: 'rgba(20, 66, 114, 0.8)', 
        color: textColor, 
        borderColor: '#0A2647',
        } },
        children: <div>{text}</div>
    } 
    }
    const columns = 
  [
    { title: 'Name', width: 300, align: 'center', dataIndex: 'name', key: 'name', render } , 
    { title: 'Email', width: 300, align: 'center', dataIndex: 'email', key: 'email', render } ,
    { title: 'Clicked fail', width: 200,align: 'center', dataIndex: 'clickedFail', key: 'clickedFail', render},
    { title: 'Submit fail', width: 200, align: 'center', dataIndex: 'submitFail', key: 'submitFail', render}
  ];

  const data = 
  [
    { key: '1', name: 'Danail', clickedFail: 'da', submitFail: 'ne' },
    { key: '2', name: 'Danail', clickedFail: 'da', submitFail: 'ne' },
    { key: '3', name: 'Danail', clickedFail: 'da', submitFail: 'ne' },
    { key: '4', name: 'Danail', clickedFail: 'da', submitFail: 'ne' },
    { key: '5', name: 'Danail', clickedFail: <VerticalLeftOutlined />, submitFail: 'ne' }
  ];
    return(
        <>
            <Text text = {'Attack name'}/>
            <Table 
            dataSource = {data} 
            columns = {columns} 
            />;
        </>
    )
}

export default AttackTable;