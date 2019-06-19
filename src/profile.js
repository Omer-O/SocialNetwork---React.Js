import React from "react";
import axios from "./axios";
import { HashRouter, Route } from "react-router-dom";
import { Profilepic } from "./profilepic";
import { BioEditor } from "./bioeditor";
import { ProfileBio } from "./profilebio";
import { App } from "./app";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    } //constructor close.
    render() {
        return (
            <div className="wraper-profile">
                <div className="container-profile">
                    <Profilepic
                        className="user-img"
                        imageUrl={this.props.imageUrl}
                        first={this.props.first}
                        last={this.props.last}
                        showUpload={this.props.showUpload}
                    />
                    <p>
                        {this.props.first} {this.props.last}
                    </p>
                </div>
                <div className="bio">
                    <BioEditor
                        bio={this.props.bio}
                        bioEdit={this.props.bioEdit}
                    />
                </div>
            </div>
        );
    }
} //profile close.
