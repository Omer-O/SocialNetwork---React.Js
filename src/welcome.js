import React from 'react';
import axios from 'axios';

export class Welcome extends React.Component {
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
        this[target.name] = target.value;
    }//handleChange close.
    submit(e) {//the submit button on click function!!
        e.preventDefault();
        let { first, last, email, password } = this.state;
        const user = {
            first: first,
            last: last,
            email: email,
            password: password
        }
        axios.post('/welcome', { user }).then(
        //    console.log('this is user POST:', {user});
            ({ data }) => {
                if (data.success) {//in the res.json we should
                    //pass the success = true
                    //if succsessful we will need to reload the page
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
                        {this.state.error && <div className="error">ERROR</div>}
                        <input name="first" placeholder="first-name" onChange={e => this.handleChange(e)} />
                        <input name="last" placeholder="last-name" onChange={e => this.handleChange(e)} />
                        <input name="email" placeholder="email" onChange={e => this.handleChange(e)} />
                        <input name="password" placeholder="password" onChange={e => this.handleChange(e)} />
                        //<input name="_csrf" type="hidden" value="{{csrfToken}}" />
                        <button onClick={e => this.submit()}>SUBMIT</button>
                    </div>
                    <h3>Already a memeber? <a href="#">log in</a>.</h3>
                </div>
        )
    }//render close.
}
