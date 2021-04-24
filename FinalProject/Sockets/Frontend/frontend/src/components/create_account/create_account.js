import React, {Component} from 'react';
import {Purple_Button, White_Button, Purple_Button_Right} from '../buttons/buttons';
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
            <Purple_Button_Right name = "Back" />
            <div class="content">
                {/* <Input_Field name = "Username"/> */}
                {/* <Input_Field name = "Password"/> */}
                <Purple_Button name = "Create Account"/>
                <White_Button name = "Forgot Password?" />
            </div>
            </div>
        )
    }
}
export default create_account;