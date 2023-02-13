import { useEffect, useState } from "react";
import Modal from "./Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostList({ modalOpen, onHideModal }) {
  const [postList, setPostList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchposts = async () => {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPostList(resData.posts);
      setIsFetching(false);
    };
    fetchposts();
  }, []);

  return (
    <>
      {modalOpen && (
        <Modal onHideModal={onHideModal}>
          <NewPost onCancel={onHideModal} />
        </Modal>
      )}
      <ul className={classes.posts}>
        {!isFetching &&
          postList.length > 0 &&
          postList.map((element) => (
            <Post
              key={Math.random().toString()}
              author={element.author}
              body={element.body}
            />
          ))}
        {!isFetching && postList.length === 0 && (
          <div>
            <h2> There are no posts yet</h2>
            <p>Start adding some!</p>
          </div>
        )}
        {isFetching && <p>Loading...</p>}
      </ul>
    </>
  );
}

export default PostList;
