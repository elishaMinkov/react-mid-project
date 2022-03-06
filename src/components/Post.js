import React from 'react';
import '../style.css';

const Post = (props) => {
  return (
    <div className='border-purple spaceAround relative'>
      <span>Title: </span> {props.post.title}
      <br />
      <span>Body: </span> {props.post.body}
    </div>
  );
};

export default Post;
