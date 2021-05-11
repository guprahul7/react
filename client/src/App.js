import React, { Component } from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react'; //similar to React's Context.Provider
//It wraps our React app and places the client on the context, which enables us to access it from anywhere in our component tree.

import {BrowserRouter as Router, Route} from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import './App.css';
import Launches from './components/launches';
import Launch from './components/launch';
import logo from './spacex_logo.png';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/* We wanna wrap evth. in our Router except the Provider above
          since it is the outermost element here */}
      <Router>
        <div className="container">
          <img 
            src={logo} 
            alt="SpaceX"
            style={{ width:300, display: 'block', margin: 'auto'}}
          />
          <Route exact path="/" component={Launches}></Route>
          <Route exact path="/launch/:flight_number" component={Launch}></Route>
        {/* instead of directly embedding <Launches/> here, we used router to same page and linked the component */}
        </div>
      </Router>
      </ApolloProvider>
    );
  }
}
 
export default App;
