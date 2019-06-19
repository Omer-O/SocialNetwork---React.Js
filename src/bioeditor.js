import React from "react";
import axios from "./axios";
import { App } from "./app";
import { ProfileBio } from "./profilebio";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBio: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.saveBio = this.saveBio.bind(this);
    } //constructor close.
    handleChange({ target }) {
        this.setState({
            bio: target.value
        });
    } //handleChange close.
    handleClick(e) {
        this.setState({ editBio: true });
    } //handleClick close.
    handleSecondClick(e) {
        this.setState({ editBio: false });
    } //handleSecondClick close.
    saveBio(e) {
        e.preventDefault();
        console.log("saveBio clicked");
        axios
            .post("/bio", this.state)
            .then(result => {
                console.log("this is result of bioeditor:", result);
                this.props.bioEdit(result.data.bio);
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true });
            });
    } //saveBio close.
    render() {
        //console.log("this.props before return: ", this.state);
        return (
            <div className="bio-wraper">
                {this.state.error}
                <div className="bio-container">
                    <h4>PERSONAL INFORMATION</h4>
                    <p className="bio-field">{this.props.bio}</p>
                    <h4
                        className="edit-click"
                        onClick={e => this.handleClick(e)}
                    >
                        BIO-edit
                    </h4>
                </div>
                {this.state.editBio && (
                    <div className="textarea-container">
                        <div
                            className="close-click"
                            onClick={e => this.handleSecondClick(e)}
                        >
                            close X
                        </div>
                        <textarea
                            className="text-field"
                            type="text"
                            name="textarea"
                            defaultValue={this.props.bio}
                            onChange={e => this.handleChange(e)}
                        />
                        <button
                            className="save-btn"
                            type="submit"
                            name="button"
                            onClick={e => this.saveBio(e)}
                        >
                            SAVE
                        </button>
                    </div>
                )}
            </div>
        ); //render-return close.
    } //render close.
} //Welcome clos.
