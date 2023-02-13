import { useState } from "react";
import Modal from "./Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostList({ modalOpen, onHideModal }) {
  const [postList, setPostList] = useState([]);

  function addPost(post) {
    const newList = [...postList, post];
    console.log(newList);
    setPostList(newList);
  }

  return (
    <>
      {modalOpen && (
        <Modal onHideModal={onHideModal}>
          <NewPost onCancel={onHideModal} onAddPost={addPost} />
        </Modal>
      )}
      <ul className={classes.posts}>
        {postList.map((element) => (
          <Post author={element.author} body={element.body} />
        ))}
      </ul>
    </>
  );
}

export default PostList;
