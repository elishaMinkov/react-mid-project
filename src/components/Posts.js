import React, { useEffect, useState } from 'react';
import AddNewPost from './AddNewPost';
import Post from './Post';

const Posts = (props) => {
  let [posts, setPosts] = useState([]);
  let [index, setIndex] = useState(0);
  let [id, setId] = useState(props.id);
  let [isAddNewPost, setIsAddNewPost] = useState(false);

  useEffect(() => {
    setPosts(props.posts ? props.posts : []);
    setIndex(props.posts ? props.posts.length + 1 : 0);
  }, [props.posts]);

  const addNewPost = (post) => {
    post.userId = id;
    let updatedposts = [...posts, post];
    props.updatePosts(updatedposts);
    setIsAddNewPost(false);
  };

  return (
    <div className={"border-black height-50 padding-7"}>
      <div className='relative'>
        <span >Posts – User {id} </span>{' '}
        {!isAddNewPost && (
          <input
            type='button'
            value='add'
            className='background-yellow right-button'
            onClick={() => setIsAddNewPost(true)}
          />
        )}
      </div>
      {isAddNewPost ? (
        <AddNewPost
          id={index}
          add={addNewPost}
          cancel={() => setIsAddNewPost(false)}
        />
      ) : (
        <div className='split-ver spaceAround'>
          {posts.length > 0 &&
            posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
        </div>
      )}
    </div>
  );
};

export default Posts;
