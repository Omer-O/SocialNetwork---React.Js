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
            .then(({data}) => {
                if (data.error) {
                    this.props.history.push("/");
                } else {
                    console.log('this is data of otheruser:', data);
                    this.setState(data);
                }
            }).catch(err => {
                console.log(err);
                this.setState({ error: true });
            });
    }//componentDidMount close.
    render() {
        return (
            <div className="wraper-app">
            {this.state.error}
                <div className="profile-container">
                    <div className="profile-pic-container">
                        <Profilepic
                            className="web-img"
                            imageUrl={this.state.url}
                            first={this.state.first}
                            last={this.state.last}
                        />
                        <button className="request-friend"
                         // onClick={(e => this.uploadFile(e))}
                         >Friend Request</button>
                    </div>
                    <div className="bio-container">
                        <p className="search-name">
                         {this.state.first} {this.state.last}
                        </p>
                        <p className ="bio-field">{this.state.bio}</p>
                    </div>
                 </div>
            </div>
        );
    }
}//OtherProfile close.
