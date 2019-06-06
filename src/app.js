import React from 'react';
import axios from './axios';
import { Logo } from './logo';
import { Profilepic } from './profilepic';
import { Uploader } from './uploader';
import { BioEditor } from './bioeditor';
import { Profile } from './profile';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { OtherProfile } from './otherprofile';
//in the render of app we will pass the browser router inside we will pass the profile and than we render a componenet name OtherProfile.

//All the routes must be inside BrowserRouter


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.uploaded = this.uploaded.bind(this);
        this.bioEdit = this.bioEdit.bind(this);
        this.showUpload = this.showUpload.bind(this);
    }//constructor close.
    uploaded(imageUrl) {
        this.setState({
            imageUrl: imageUrl,
            uploaderVisible: false
        });
    }//uploaded close.
    showUpload() {
        this.setState({
            uploaderVisible: true
        })
    }//showUpload close.
    bioEdit(bio) {
        this.setState({
            bio: bio,
            //bioEditVisible: false
        });
    }//bioEdit close.
    componentDidMount() {
        axios.get('/user').then(
                ({data}) => this.setState(data)
        );
    }//componentDidMount close.
    render() {
        if (!this.state.id) {
            return (
            <img src="/img/profilepic.jpg"
                className="user-img" />
            )
        }
        return (
            <div className="wraper-app">
                <header className="wraper-header">
                    <img src="/img/logo.png"
                        className="logo-image"
                    />
                    <Profilepic
                        className="user-img"
                        imageUrl={this.state.imageUrl}
                        first={this.state.first}
                        last={this.state.last}
                        showUpload={this.showUpload}
                    />
                 </header>
                 {this.state.uploaderVisible &&
                  <Uploader uploaded={this.uploaded} />}
                    <BrowserRouter>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.imageUrl}
                                        onClick={this.showUpload}
                                        bio={this.state.bio}
                                        bioEdit={this.bioEdit}
                                    />
                                )}
                            />
                            <Route path="/user/:id" component={OtherProfile} />
                        </div>
                    </BrowserRouter>
             </div>
        );
    }//render close.
}//App close.
