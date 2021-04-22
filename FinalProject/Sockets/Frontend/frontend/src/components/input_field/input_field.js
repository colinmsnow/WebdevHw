import React from 'react';
import './input_field.css'

const Input_Field = props =>{
    return (
        <div>
            <p>{props.name}</p>
            <input 
                className = "field"
                // id = {props.id}
                name = {props.name}
                type = "text"
                value = {props.value}
                // onChange={}
            />
        </div>
    )
}

export default Input_Field;