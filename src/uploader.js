//here we will need a function for axios post to accept the imageUrl

//we will need on server side that INSERT the image to the table
//than we send the url to the uploader (here) and he will send it to App
import React from 'react';
import axios from './axios';
import { Logo } from './logo';

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }//constructor close.
    handleChange(e) {
        console.log('this is handleChange e:', e.target.files[0]);
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0
        });
    }//handleChange close.
    uploadFile(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', this.state.selectedFile)

        axios.post('/user-image', formData)
             .then(({ data }) => {
                if (data.success) {
                    location.replace('/');
                } else if (data.error){
                    this.setState({
                        error: data.error
                    });
                }
            }).catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    }//submit close.
    render() {
        return (
        <div className="form-container">
            {this.state.error}
            <button className="upload-btn"
             onClick={(e => this.uploadFile(e))}
             >UPLOAD</button>
            <input className='browse-btn'
             type="file"
             name="file"
             onChange={(e => this.handleChange(e))}
            />
        </div>
        )//render-return close.
    }//render close.
}//Welcome clos.
