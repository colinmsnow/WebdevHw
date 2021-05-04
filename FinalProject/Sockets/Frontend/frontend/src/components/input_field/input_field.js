import React from 'react';
import './input_field.css'

const Input_Field = props =>{
    return (
        <div>
            <p>{props.name}</p>
            <input 
                className = "field"
                id = {props.id}
                name = {props.name}
                type = "text"
                value = {props.value}
                placeholder = {props.placeholder}
                disabled = {props.disabled}
                // onChange={(e) => {this.setState({value: e.target.value })
            />
        </div>
    )
}

export default Input_Field;