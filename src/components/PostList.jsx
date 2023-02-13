import { useState } from "react";
import Modal from "./Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostList({ modalOpen, onHideModal }) {
  const [postList, setPostList] = useState([]);

  function addPostHandler(post) {
    setPostList((existingPosts) => [...existingPosts, post]);
  }

  return (
    <>
      {modalOpen && (
        <Modal onHideModal={onHideModal}>
          <NewPost onCancel={onHideModal} onAddPost={addPostHandler} />
        </Modal>
      )}
      <ul className={classes.posts}>
        {postList.length > 0 &&
          postList.map((element) => (
            <Post
              key={Math.random().toString()}
              author={element.author}
              body={element.body}
            />
          ))}
        {postList.length === 0 && (
          <div>
            <h2> There are no posts yet</h2>
            <p>Start adding some!</p>
          </div>
        )}
      </ul>
    </>
  );
}

export default PostList;
