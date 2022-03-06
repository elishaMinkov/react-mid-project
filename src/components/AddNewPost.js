import React, { useState } from 'react';

const AddNewPost = (props) => {
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');

  const handleAdd = () => {
    let post = {};
    post.id = props.id;
    post.title = title;
    post.body = body;
    props.add(post);
  };

  return (
    <div>
      Title: <input type='text' onChange={(e) => setTitle(e.target.value)} />
      <br />
      Body: <input type='text' onChange={(e) => setBody(e.target.value)} />
      <br />
      <br />
      <div>
        <input
          type='button'
          value='cancel'
          onClick={() => props.cancel()}
          className='background-yellow'
        />
        <input
          type='button'
          value='Add'
          onClick={handleAdd}
          className='background-yellow'
        />
      </div>
    </div>
  );
};

export default AddNewPost;
