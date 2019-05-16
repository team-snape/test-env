import React from 'react';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import {clientCopy} from './index';


export wrap = () => {
  console.log(clientCopy);
}


