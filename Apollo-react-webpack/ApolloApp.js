import React, { Component } from "react";
import "./App.css";
import {Query} from 'react-apollo';
import qql from 'graphql-tag';

// import client from './client/index';
// import {resolvers} from './client/resolvers';
// import {GET_USERS} from './client/components/App';
import {typeDefs} from './client/index';

// console.log(client.localState.cache.data.data.ROOT_QUERY);
// console.log(resolvers.Mutation);

// console.log(GET_USERS.definitions['0'].selectionSet.selections['0'].selectionSet.selections);
//console.log(typeDefs);

//array of query values from client
//const dataArray = GET_USERS.definitions['0'].selectionSet.selections['0'].selectionSet.selections;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {typeDefs};
    
  }
   componentDidMount(){
     console.log('yes it did mount')
   }
  

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Apollo Aperture</h1>
        <div>{typeDefs}</div>
      </div>
    );
  };
};



export default App;
