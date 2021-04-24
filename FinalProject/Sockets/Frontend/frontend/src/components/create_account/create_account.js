import React, {Component} from 'react';
import {Purple_Button, White_Button, White_Button_Right} from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import '../login/login.css'

class create_account extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    
    render () {
        
        return (
            <div>
            <White_Button_Right name = "Create Account" />
            <div class="content">
                {/* <Input_Field name = "Username"/> */}
                {/* <Input_Field name = "Password"/> */}
                <Purple_Button name = "Login"/>
                <White_Button name = "Forgot Password?" />
            </div>
            </div>
        )
    }
}
export default create_account;