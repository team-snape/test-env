import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { find } from 'lodash';

import App from './components/App';
//import { resolvers, defaults } from './resolvers';

// cache, Schema, and Apollo Store
const cache = new InMemoryCache();

// original index schema
export const typeDefs = `
  type User {
    id: Int!
    text: String!
    name: String
    userName: String
    department: String
    access: String
    completed: Boolean!
  }

  type Mutation {
    addUser(
      text: String!,
      name: String,
      userName: String,
      department: String,
      access: String,
      ): User
    updateUser(
      id:ID!
      text: String!,
      name: String,
      userName: String,
      department: String,
      access: String,
      ): User
    toggleUser(id: Int!): User
    deleteUser(id:Int!):User
  }

  type Query {
    visibilityFilter: String
    Users: [User]
  }
`;

// from user.js
const TOGGLE_USER = gql`
  mutation ToggleUser($id: Int!) {
    toggleUser(id: $id) @client
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) @client {
      id
    }
  }
`;

const User = ({
  id,
  completed,
  name,
  userName,
  department,
  access,
  handelEditCard,
}) => (
  <Mutation mutation={TOGGLE_USER} variables={{ id }}>
    {toggleUser => (
      <div
        className="card"
        style={{
          opacity: completed ? '0.5' : '1',
        }}
      >
        <header className="card-header">
          <p className="card-header-title">
            {name}
            (@
            {userName})
          </p>
        </header>
        <div className="card-content">
          <h1>
            {' '}
            <strong>Departement-</strong> {department}
          </h1>
          <h1>
            {' '}
            <strong>Access-</strong> {access}
          </h1>
        </div>
        <footer className="card-footer">
          <a onClick={toggleUser} className="card-footer-item">
            {completed ? 'Activate' : 'Deactivate'}
          </a>
          <a className="card-footer-item" onClick={() => handelEditCard(id)}>
            Edit
          </a>
          <Mutation mutation={DELETE_USER} variables={{ id }}>
            {deleteUser => (
              <a onClick={() => deleteUser()} className="card-footer-item">
                Delete
              </a>
            )}
          </Mutation>
        </footer>
      </div>
    )}
  </Mutation>
);

//from UserForm.js

const ADD_USER = gql`
  mutation addUser(
    $text: String!
    $name: String
    $userName: String
    $department: String
    $access: String
  ) {
    addUser(
      text: $text
      name: $name
      userName: $userName
      department: $department
      access: $access
    ) @client {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $text: String!
    $name: String
    $userName: String
    $department: String
    $access: String
  ) {
    updateUser(
      id: $id
      text: $text
      name: $name
      userName: $userName
      department: $department
      access: $access
    ) @client {
      id
    }
  }
`;


const UserForm = ({ userId, users, handelEditCard }) => {
    const user = find(users, user => user.id === userId);
    if (userId === null) {
      return (
        <Mutation mutation={ADD_USER}>
          {addUser => (
            <div>
              <h1 className="title">Add User</h1>
              <Form handleSubmit={addUser} />
            </div>
          )}
        </Mutation>
      );
    }
    return (
      <Mutation mutation={UPDATE_USER}>
        {updateUser => (
          <div>
            <h1 className="title">Update User</h1>
            <UserUpdateForm
              handleSubmit={updateUser}
              user={user}
              handelEditCard={handelEditCard}
            />
          </div>
        )}
      </Mutation>
    );
  };

//from resovlers.js

const defaults = {
  users: [],
  visibilityFilter: 'SHOW_ALL',
};

let nextUserId = 0;

const resolvers = {
  Mutation: {
    addUser: (_, { text, name, userName, department, access }, { cache }) => {
      const query = gql`
        query GetUsers {
          users @client {
            id
            text
            name
            userName
            department
            access
            completed
          }
        }
      `;

      const previous = cache.readQuery({ query });
      //console.log('data', previous.users);
      const newUser = {
        id: nextUserId++,
        text,
        name,
        userName,
        department,
        access,
        completed: false,
        __typename: 'UserItem',
      };
      const data = {
        users: previous.users.concat([newUser]),
      };

      // if (
      //   name === '' ||
      //   userName === '' ||
      //   department === '' ||
      //   access === ''
      // ) {
      //   alert('all field is required');
      // } else {
        // user Name Validation
        const validation = previous.users.find(
          user => user.userName === userName,
        );
        // if (validation === undefined) {
          cache.writeData({ data });
          return newUser;
      //   }
      //   alert('user name is already in use');
      // // }
    },
    updateUser: (_, variables, { cache }) => {
      const query = gql`
        query GetUsers {
          users @client {
            id
            text
            name
            userName
            department
            access
            completed
          }
        }
      `;
      const id = `UserItem:${variables.id}`;
      const previous = cache.readQuery({ query });
      // user Name Validation
      const validation = previous.users.find(user => {
        user.userName === variables.userName;
      });
      if (validation === undefined) {
        const data = { ...variables };
        cache.writeData({ id, data });
        return null;
      }
      alert('user name is already in use');
    },

    deleteUser: (_, variables, { cache }) => {
      const query = gql`
        query Users {
          users @client {
            id
            text
            name
            userName
            department
            access
            completed
          }
        }
      `;
  
      const previous = cache.readQuery({ query });
      const data = {
        users: previous.users.filter(user => user.id !== variables.id),
      };
      cache.writeData({ data });
      return data;
    },

    toggleUser: (_, variables, { cache }) => {
      const id = `UserItem:${variables.id}`;
      const fragment = gql`
        fragment completeUser on UserItem {
          completed
        }
      `;
      const user = cache.readFragment({ fragment, id });
      const data = { ...user, completed: !user.completed };
      cache.writeData({ id, data });
      return null;
    },
  },
};

//from UserUpdateForm.js

class UserUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.user.id,
      text: 'text hardcoded',
      name: props.user.name,
      userName: props.user.userName,
      department: props.user.department,
      access: props.user.access,
    };
    this.handelChange = this.handelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit({ variables: { ...this.state } });
    this.props.handelEditCard(null);
  };

  render() {
    const { name, userName, department, access } = this.state;
    return (
      <div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={name}
              name="name"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">UserName</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={userName}
              name="userName"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Department</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={department}
              name="department"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Access</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={access}
              name="access"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <button
          className="button is-primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Update
        </button>
      </div>
    );
  }
}

// from UserList.js
const getVisibleUsers = (users, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return users;
    case 'SHOW_COMPLETED':
      return users.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return users.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const UserList = ({ users, visibilityFilter, handelEditCard }) => (
  <ul>
    {/* {console.log(users)} */}
    {getVisibleUsers(users, visibilityFilter).map(user => (
      <User key={user.id} {...user} handelEditCard={handelEditCard} />
    ))}
  </ul>
);

//original index.js code
const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs}),
});


render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

