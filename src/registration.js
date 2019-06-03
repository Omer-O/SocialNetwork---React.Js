import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            password: ''
         };
    }//constructor close.
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }//handleChange close.
    submit() {
        axios.post('/registration', {
            first: this.state.first,
            last: this.state.last,
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
                    <h3>Join the community - spread the INK</h3>
                    <div className="form-container">
                        {this.state.error && <div className="error">please insert
                        the right info</div>}
                        <input name="first" type="text" placeholder="first-name" onChange={e => this.handleChange(e)} />
                        <input name="last" type="text" placeholder="last-name" onChange={e => this.handleChange(e)} />
                        <input name="email" type="text" placeholder="email" onChange={e => this.handleChange(e)} />
                        <input name="password" type="password" placeholder="password" onChange={e => this.handleChange(e)} />
                        <button onClick={e => this.submit()}>SUBMIT</button>
                    </div>
                    <h3>Already member?<Link to="/login"> log in</Link></h3>
                </div>
        )//render-return close.
    }//render close.
}//Welcome clos.
