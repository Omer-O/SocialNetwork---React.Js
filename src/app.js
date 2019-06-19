import React from "react";
import axios from "./axios";
import { Logo } from "./logo";
import { Profilepic } from "./profilepic";
import { Uploader } from "./uploader";
import { BioEditor } from "./bioeditor";
import { Profile } from "./profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { OtherProfile } from "./otherprofile";
import { FindPeople } from "./findpeople";
import Friends from "./friends";
import Chat from "./chat";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.uploaded = this.uploaded.bind(this);
        this.bioEdit = this.bioEdit.bind(this);
        this.showUpload = this.showUpload.bind(this);
    } //constructor close.
    uploaded(imageUrl) {
        this.setState({
            imageUrl: imageUrl
            // uploaderVisible: false
        });
    } //uploaded close.
    handleClick(e) {
        this.setState({ uploaderVisible: false });
    }
    showUpload() {
        this.setState({
            uploaderVisible: true
        });
    } //showUpload close.
    bioEdit(bio) {
        this.setState({
            bio: bio
        });
    } //bioEdit close.
    componentDidMount() {
        axios.get("/user").then(({ data }) => this.setState(data));
    } //componentDidMount close.
    render() {
        if (!this.state.id) {
            return <img src="/img/profilepic.jpg" className="user-img" />;
        }
        console.log("this.state of app:", this.state);
        return (
            <BrowserRouter>
                <div>
                    <header className="wraper-header">
                        <img src="/img/logo.png" className="logo-image" />
                        <h2>
                            <Link to={"/findusers"}>find friend</Link>
                        </h2>
                        <h2>
                            <Link to="/friends">friends</Link>
                        </h2>
                        <h2>
                            <Link to="/chat">chat room</Link>
                        </h2>
                        <h2>
                            <Link to="/">edit profile</Link>
                        </h2>
                        <h2>
                            <a href="/logout">logout</a>
                        </h2>
                        <div className="uploader">
                            {this.state.uploaderVisible && (
                                <div>
                                    <div
                                        className="close-click"
                                        onClick={e => this.handleClick(e)}
                                    >
                                        close X
                                    </div>
                                    <Uploader uploaded={this.uploaded} />
                                </div>
                            )}
                        </div>
                        <Profilepic
                            className="user-img"
                            imageUrl={this.state.imageUrl}
                            first={this.state.first}
                            last={this.state.last}
                            showUpload={this.showUpload}
                        />
                    </header>
                    <div className="wraper-app">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div className="container-profile">
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.imageUrl}
                                        onClick={this.showUpload}
                                        bio={this.state.bio}
                                        bioEdit={this.bioEdit}
                                    />
                                </div>
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/findusers"
                            render={() => <FindPeople />}
                        />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                    </div>
                </div>
            </BrowserRouter>
        );
    } //render close.
} //App close.
