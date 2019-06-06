// import React from 'react';
// import {ColorBox} from './colorbox'; //where th function is written.
// import {Greetee} from './greetee'; //where th function is written.
//
//
// export class Welcome extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log(this.props);
//         this.state = {
//             name: 'Kitty'
//         };
//     }
//     render() {
//         return (
//             <h1>
//                 Hello,
//                 <ColorBox color="aqua">
//                     <Greetee name={this.state.name} exclaim={false} />
//                     //this.state.name allow us to accsses the above
//                     //this.state and dinamicaly change it.
//                     !
//                 </ColorBox>
//                 <div>
//                 // #1 way:
//                     // <input onInput={e => {//we can use an arrow function
//                     //     console.log(e.target.value);//will print
//                     //     //whatever we type in the input.
//                     //     this.setState({
//                     //         name: e.target.value
//                     //     });//here we let the input dinamicaly
//                         //change the h1 with whatever the user types!
//                     }} />
//                     //#2 way:
//                     <MyInput changeName={name => this.setState({name})}/>
//                 </div>
//             </h1>
//         );
//     }
// }
//
//
// //#2 way:
// function MyInput(props) {
//     return (
//         <input onInput={e => {//we can use an arrow function
//             props.changeName(e.target.value);
//         }} />
//     );
// }


//// Assignment 5 :
//things to take care of in this component:
//#1: avoid conflicts between BrowserRouter and
    //the server to we need to:
    //!!!! build the route different!!!
    //if we have '/user/:id' in the BrowserRouter WE CANNOT
    //PASS THE SAME ROUTER IN EXPRESS (server).
//#2: users cannot accsses other users:
    // in the notes we got the code:
    // this.props.history.push('/'); will redirect the user
    // back to '/' route.
//#3: link to other user: but we do not have to do so today!!
    //we will have to tell REACT to RELOAD the new user
    //we can do it by the notes we recieved in the notes.
    //under <Route
    //        path="/user/:id"
    // the key= is the way to tell react that the user
    // changed the URL for a different component so
    // he needs to reload
