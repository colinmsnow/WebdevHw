import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {Purple_Button, Purple_Button_Right} from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import '../login/login.css';

class create_account extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    
    render () {
        
        return (
            <div>
            <div class="nav">
            <Link to="/" style={{textDecoration:"none", marginRight:"3em"}}>
            <Purple_Button_Right name = "Back" />
            </Link>
            </div>
            <div class="content">
                <Input_Field name = "Name" id = "new_name"/>
                <Input_Field name = "Username" id= "new_username"/>
                <Input_Field name = "Password" id= "new_password"/>
                <Input_Field name = "Confirm Password" id = "confirm_password"/>
                <Purple_Button name = "Create Account"/>
            </div>
            </div>
        )
    }
}
export default create_account;