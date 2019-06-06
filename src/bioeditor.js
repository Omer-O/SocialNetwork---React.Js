
import React from 'react';
import axios from './axios';
import { App } from './app';
import { ProfileBio } from './profilebio';

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBio: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }//constructor close.
    handleChange({ target }) {
        this.setState({
            bio: target.value
        });
    }//handleChange close.
    handleClick(e) {
        this.setState({ editBio: true })
    }
    handleSecondClick(e) {
        this.setState({ editBio: false })
    }

    saveBio(e) {
        e.preventDefault();
        axios.post('/bio', {
            bio: this.state.bio,
        }).then(result => {
            console.log('this is result of bioeditor:', result);
            this.props.bioEdit(result.data.bio);
            handleSecondClick();
        }).catch(err => {
            console.log(err);
            this.setState({ error: true });
        });
    }//saveBio close.
    render() {
            return (

                <div className="bio-wraper">
                 {this.state.error}
                    <div className="bio-container">
                        <div className="edit-click"
                         onClick={e => this.handleClick(e)}
                        >edit</div>
                        <h2>PERSONAL INFORMATION</h2>
                        <p className ="bio-field"
                        >{this.props.bio}</p>
                        <div className="close-click"
                         onClick={e => this.handleSecondClick(e)}
                        >close</div>
                    </div>
                {this.state.editBio &&
                    <textarea className='text-field'
                     type="text"
                     name="bio"
                     defaultValue={this.state.bio}
                     onChange={e => this.handleChange(e)}
                    ></textarea>}
                    <button className="save-btn"
                     name="button"
                     onClick={e => this.saveBio(e)}
                     onClick={e => this.handleSecondClick(e)}
                     >SAVE</button>
                </div>
            )//render-return close.
    }//render close.
}//Welcome clos.
