import React from 'react';
import { Form, Input, Select } from 'antd';
import { textColor } from '../utils/Constants';


function FormItem({ name, label, type = 'text', message, select = false, options, validations })
{
    const validationRules = { required: true };

    return (
        <Form.Item
            label = { <label htmlFor = {name} style = {{ color: textColor }}>{label}</label>}
            name = {name}
            rules = {[{ ...validationRules, ...validations, message }]}
        >
        {
            select 
            ?
            <Select
                id = {name}
                style = {{ minWidth: '32vw' }}
                options = {options}
            />
            :
            <Input
                name = {name}
                id = {name}
                type = {type}
                style = {{ minWidth: '32vw' }}
            />
        }    
        </Form.Item>
    )
}

export default FormItem;