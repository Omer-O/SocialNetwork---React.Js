import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }//constructor close.
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }//handleChange close.
    submit(e) {
        e.preventDefault();
        axios.post('/registration', {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        }).then(({ data }) => {
                if (data.success) {
                    console.log('we are in registration if');
                    location.replace('/');
                } else if (data.error){
                    this.setState({
                        error: data.error
                    });
                }
            }).catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    }//submit close.
    render() {
        return (
                <div className="big-container">
                    <h3>Join the community - spread the INK</h3>
                    <div className="form-container">
                        {this.state.error}
                        <input name="first" type="text" placeholder="first-name" required onChange={e => this.handleChange(e)} />
                        <input name="last" type="text" placeholder="last-name" required onChange={e => this.handleChange(e)} />
                        <input name="email" type="email" placeholder="email" required onChange={e => this.handleChange(e)} />
                        <input name="password" type="password" placeholder="password" required onChange={e => this.handleChange(e)} />
                        <button disabled={!this.state.password} onClick={e => this.submit(e)}>SUBMIT</button>
                    </div>
                    <h3>Already member?<Link to="/login"> log in</Link></h3>
                </div>
        )//render-return close.
    }//render close.
}//Welcome clos.
