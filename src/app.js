import React from 'react';
import axios from './axios';
import { Logo } from './logo';
import { Profilepic } from './profilepic';
import { Uploader } from './uploader';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }//constructor close.
    componentDidMount() {
        axios.get('/user').then(
                ({data}) => this.setState(data)
                //we will want to return from index.js
                //into data: id, first, last, userimg, bio
        );
    }//componentDidMount close.
    render() {
        if (!this.state.id) {
            return (
            <img src="img/profilepic.jpg"
                className="user-img"
            />
            )
        }
        return (
            <div className="site-container">
                <img src="img/logo.png"
                 className="logo-image"
                />
                <Profilepic
                className="user-img"
                imageUrl={this.state.imageUrl}
                first={this.state.first}
                clickHandler={e => this.setState({
                    uploaderVisible: true })}
                />
                {this.state.uploaderVisible && <Uploader />}
            </div>
        )
    }
}//App close.
