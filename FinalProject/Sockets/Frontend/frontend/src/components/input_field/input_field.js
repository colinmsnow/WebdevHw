import React from 'react';
import './input_field.css'

const Input_Field = props => {
    // Text input field

    let height = "2em"
    let border = "0px"
    if (props.height != null) {
        height = props.height
    }
    if (props.borderRadius != null) {
        border = props.borderRadius
    }
    return (
        <div style={{ width: "100%" }}>
            {props.name != null && <p>{props.name}</p>}
            <input
                className="field"
                id={props.id}
                name={props.name}
                type="text"
                value={props.value}
                placeholder={props.placeholder}
                disabled={props.disabled}
                style={{ height: height, borderRadius: border }}
            />
        </div>
    )
}

export default Input_Field;