import React from 'react';
import axios from './axios';
import { Profilepic } from './profilepic';
import { Uploader } from './uploader';
import { BioEditor } from './bioeditor';
import { ProfileBio } from './profilebio';
import { App } from './app';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }//constructor close.
    render() {
        return (
            <div className="profile-container">
                <Profilepic
                    className="user-img"
                    imageUrl={this.props.imageUrl}
                    first={this.props.first}
                    last={this.props.last}
                    showUpload={this.props.showUpload}
                    // clickHandler={e => this.setState({
                    //     })}
                />
                 <BioEditor bioEdit={this.bioEdit} />}
            </div>
        )
    }
}//profile close.
