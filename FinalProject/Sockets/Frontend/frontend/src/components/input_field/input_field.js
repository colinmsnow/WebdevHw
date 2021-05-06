import React from 'react';
import './input_field.css'

const Input_Field = props =>{
    let height = "2em"
    if (props.height != null){
        height = props.height
    }
    return (
        <div style={{width:"100%"}}>
            {props.name != null && <p>{ props.name}</p>}
            <input 
                className = "field"
                id = {props.id}
                name = {props.name}
                type = "text"
                value = {props.value}
                placeholder = {props.placeholder}
                disabled = {props.disabled}
                style = { {height:height}}
                // onChange={(e) => {this.setState({value: e.target.value })
            />
        </div>
    )
}

export default Input_Field;