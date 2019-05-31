import React from 'react';
import axios from 'axios';

export class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this[target.name] = target.value;
    }
    submit () {//the submit button on click function!!
        axios.post('/welcome', {//we can copy paste from pettion
            //but here we will need to res.json({})
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        }).then(
            ({data}) => {
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
        );
    }
    render() {
        return (

                <div class="form-container">
                    {this.state.error && <div className="error">ERROR</div>}
                    <input name="first" onChange={e => this.handleChange(e)} />
                    <input name="last" onChange={e => this.handleChange(e)}/>
                    <input name="email" onChange={e => this.handleChange(e)}/>
                    <input name="password" onChange={e => this.handleChange(e)}/>
                    <button onClick={e => this.submit()}>SUBMIT</button>
                </div>
        )
    }
}
