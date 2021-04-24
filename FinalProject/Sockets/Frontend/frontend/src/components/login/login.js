import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Purple_Button, White_Button, White_Button_Right} from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import './login.css'

class login extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    
    render () {
       
        return (
            <div>
            <Link to="/create" style = {{ textDecoration: 'none'}}>
                <White_Button_Right name = "Create Account" />
            </Link>

            <div class="content">
                <Input_Field name = "Username"/>
                <Input_Field name = "Password"/>
                <Purple_Button name = "Login"/>
                <White_Button name = "Forgot Password?" />
            </div>
            </div>
        )
    }
}
export default login;