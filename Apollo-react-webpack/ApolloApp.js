import React, { Component } from "react";
import client from './client/index'
import "./App.css";

console.log(client.localState.cache.data.data);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // blogTitle: 'My Blog',
      posts: [
        {
          title: "Post 1",
          text: "Here is some text"
        },
        {
          title: "Post 2",
          text: "Here is some text"
        },
        {
          title: "Post 3",
          text: "Here is some text"
        }
      ],
      selectedPost: "None"
    };
    this.highlightSelectedPost = this.highlightSelectedPost.bind(this);
  }
   componentDidMount(){

   
   }
  highlightSelectedPost(e) {
    const selectedPost = e.currentTarget.id;
        this.setState({
          selectedPost: selectedPost
        })
  }

  render() {
    return (
      <div>
        <TitleDiv />
        <div>
          <h3>Selected Post: {this.state.selectedPost}</h3>
        </div>
        <PostsContainer
          posts={this.state.posts}
          highlightSelectedPost={this.highlightSelectedPost}
          selectedPost={this.state.selectedPost}
        />
      </div>
    );
  }
}

const TitleDiv = () => {
  // console.log(props);
  return (
    <div>
      <h1>Apollo App</h1>
    </div>
  );
};

const PostsContainer = props => {
  const innerPosts = props.posts;
  return (
    <div>
      {innerPosts.map((post, index) => (
        <SpecialPost
          key={index}
          id={post.title}
          title={post.title}
          text={post.text}
          highlightSelectedPost={props.highlightSelectedPost}
          selectedPost={props.selectedPost}
        />
      ))}
    </div>
  );
};

const SpecialPost = props => {
  const handleClick = e => {
    props.highlightSelectedPost(e);
  };
  let style;
  if (props.id === props.selectedPost) {
    style = { backgroundColor: "lightBlue" };
  } else {
    style = { backgroundColor: "yellow" };
  }
  return (
    <div id={props.id} className="outline" onClick={handleClick} style={style}>
      <p>{props.title}</p>
      <p>{props.text}</p>
    </div>
  );
};

export default App;
