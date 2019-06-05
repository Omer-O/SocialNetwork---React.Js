
import React from 'react';
import axios from './axios';
import { App } from './app';
import { ProfileBio } from './profilebio';

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        editBio: false
        this.handleClick = this.handleClick.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }//constructor close.
    handleChange({ target }) {
    console.log('this is bioeditor handleChange e:', target);
        this.setState({
            bio: target.value
        });
    console.log('this is target.value:', target.value);
    }//handleChange close.
    handleClick() {
        this.setState({ editBio: true })
    }
    saveBio(e) {
        e.preventDefault();
        axios.post('/bio', {
            bio: this.state.bio,
        }).then(result => {
            console.log('this is result of bioeditor:', result);
            this.props.bioEdit(result.data.bio);
            this.setState({ editBio: false })
            }).catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    }//saveBio close.
    render() {
        return (
        <div className="form-container">
            {this.state.error}
            <button className="save-btn"
             name="button"
             onClick={e => this.saveBio(e)}
             >SAVE</button>
            <textarea className='text-field'
             type="text"
             name="bio"
             value={this.props.bio}
             cols="50"
             row='4'
             onChange={e => this.handleChange(e)}
            >write here</textarea>
        </div>
        )//render-return close.
    }//render close.
}//Welcome clos.
