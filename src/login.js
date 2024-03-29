import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    } //constructor close.
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    } //handleChange close.
    submit(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else if (data.error) {
                    this.setState({
                        error: data.error
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    } //submit close.
    render() {
        return (
            <div className="form-container">
                <h3>LOGIN</h3>
                {this.state.error}
                <input
                    className="fadeIn first"
                    name="email"
                    type="text"
                    placeholder="email"
                    required
                    onChange={e => this.handleChange(e)}
                />
                <input
                    className="fadeIn second"
                    name="password"
                    type="password"
                    placeholder="password"
                    required
                    onChange={e => this.handleChange(e)}
                />
                <button
                    type="submit"
                    disabled={!this.state.password}
                    onClick={e => this.submit(e)}
                >
                    LOGIN
                </button>
            </div>
        ); //render-return close.
    } //render close.
} //Welcome clos.
