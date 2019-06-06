import React from 'react';
import axios from './axios';
import { BioEditor } from './bioeditor';
import { Profilepic } from './profilepic';

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }//constructor close.
    componentDidMount() {
        axios.get('/otheruser/' + this.props.match.params.id)
            .then(({ data }) => {
                console.log('this is data of api user:', data);
                if (data.error) {
                    this.props.history.push("/");
                } else {
                    this.setState(data);
                }
        });
    }//componentDidMount close.
    render() {
        return (
            <div className="wraper-app">
                <header className="site-container">
                    <img src="img/logo.png"
                        className="logo-image"
                    />
                    <Profilepic
                        className="user-img"
                        imageUrl={this.state.url}
                        first={this.state.first}
                        last={this.state.last}
                    />
                 </header>
                 <div className="wraper-profile">
                    <div className="bio-container">
                        {this.state.first} {this.state.last}
                    </div>
                    <p className ="bio-field">{this.state.bio}</p>
                 </div>
            </div>
        );
    }
}//OtherProfile close.
