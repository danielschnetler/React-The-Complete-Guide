import { useState } from "react";
import Modal from "./Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostList({ modalOpen, onHideModal }) {
  const [enteredBody, setEnteredBody] = useState("Hello");
  const [enteredAuthor, setEnteredAuthor] = useState("Daniel");

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }
  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  return (
    <>
      {modalOpen && (
        <Modal onHideModal={onHideModal}>
          <NewPost
            onAuthorChange={authorChangeHandler}
            onBodyChange={bodyChangeHandler}
            onCancel={onHideModal}
          />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author=":)" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostList;
