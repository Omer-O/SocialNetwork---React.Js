import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
         };
    }//constructor close.
    handleChange({ target }) {
        this.setState({//we can target all the
            //changes in the 'input name='
            [target.name]: target.value
        });
    }//handleChange close.
    submit() {
        axios.post('/login', {
            email: this.state.email,
            password: this.state.password
        }).then(({ data }) => {
                if (data.success) {
                    location.replace('/');
                } else {
                    this.setState({
                        error: true
                    });
                }
            }
        );//axios.post close.
    }//submit close.
    render() {
        return (
                <div className="big-container">
                    <h1>INK IT</h1>
                    <h2>sketch IT tatoo IT share IT</h2>
                    <h3>PLEASE LOGIN</h3>
                    <div className="form-container">
                        {this.state.error && <div className="error">oops, WRONG INFO</div>}
                        <input name="email" type="text" placeholder="email" onChange={e => this.handleChange(e)} />
                        <input name="password" type="password" placeholder="password" onChange={e => this.handleChange(e)} />
                        <button onClick={e => this.submit()}>LOGIN</button>
                    </div>
                    <h3><Link to="/registration">Registration</Link></h3>
                </div>
        )//render-return close.
    }//render close.
}//Welcome clos.
