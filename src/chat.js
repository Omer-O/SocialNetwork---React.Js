import React from "react";
import { connect } from "react-redux";
import { socket } from "./chat-socket";
import { init } from "./chat-socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.elemRef = React.createRef();
    }
    handleChange({ target }) {
        this.state.chat = target.value;
    }
    saveChat() {
        console.log("save clicked, text: ", this.state.chat);
        // let socket = init();
        socket.emit("chatMessage", this.state.chat);
    }
    render() {
        console.log("this.props chat before return: ", this.props.chat);
        if (!this.props.chat) {
            return <h1>LOADING</h1>;
        }
        return (
            <div className="chat-wraper">
                <div className="chat-container" ref={this.elemRef}>
                    {this.props.chat &&
                        this.props.chat.map(chat => (
                            <div className="chat" key={chat.id}>
                                <div className="chat-user">
                                    <img
                                        className="chat-img"
                                        src={chat.url || "/img/profilepic.jpg"}
                                        alt={`${chat.first} ${chat.last}`}
                                    />
                                    <p>{chat.created_at}</p>
                                </div>
                                <div className="chat-container">
                                    <p>{chat.message}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="chat-insert-field">
                    <textarea
                        className="chat-field"
                        type="text"
                        name="textarea"
                        defaultValue={this.props.bio}
                        onChange={e => this.handleChange(e)}
                    />
                    <button
                        className="save-btn"
                        type="submit"
                        name="button"
                        onClick={e => this.saveChat(e)}
                    >
                        SEND
                    </button>
                </div>
            </div>
        ); //render-return close.
    } //render close.
} //Chat close.
const mapStateToProps = state => {
    return {
        chat: state.chat
    };
};

export default connect(mapStateToProps)(Chat);
