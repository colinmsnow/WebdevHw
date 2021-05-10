import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Purple_Button_Right } from '../buttons/buttons';
import '../login/login.css';

class forgot_password extends Component {
    // Forgot password screen
    // Kindly lets you know that there is no way to recover it
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div>
                <div class="nav">
                    <Link to="/" style={{ textDecoration: "none", marginRight: "3em" }}>
                        <Purple_Button_Right name="Back" />
                    </Link>
                </div>
                <div class="content" style={{ marginTop: "-12vh" }}>
                    <h2><center>Sorry, that's too bad.</center></h2>
                </div>
            </div>
        )
    }
}

export default forgot_password;