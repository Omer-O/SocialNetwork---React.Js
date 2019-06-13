import React from 'react';
import { connect } from 'react-redux';
import { getListOfAnimals } from './actions';

class CuteAnimals extends React.Component {

    componentDidMount() {
        //in function components: props.dispatch();
        this.props.dispatch(getListOfAnimals());
    }
    render() {
        if (!this.props.myAnimals) {
            //here we say that if the animals does not exist than:
            return;
            //it is very known problem.
        }
        return (
            <div>
                <h1>REDUUUUUUUUUUXXXXXXXXX</h1>
                {this.props.myAnimals.length &&
                    this.props.myAnimals.map(animal =>(
                        <div key = {animal} > {animal}</div>
                    ))}
            </div>
        );
    };
}
//connect the componnent to REDUX:
const mapStateToProps = state => {//always have ti return
    //an Object
console.log('state of mapStateToProps:', state);
    return{
        //once our globalstate (redux) actually has
        //something in it
        myAnimals: state.listAnimals
        //this info come from the reducers.js => the return
        //
    };
};
export default connect(mapStateToProps)(CuteAnimals);
//in connect we pass the mapStateToProps as first argument
//and the class/function in 2nd parameter.

//because we will export the connectand not the Component
