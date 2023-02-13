import Post from "./Post";
import classes from "./PostList.module.css";

function PostList() {
  return (
    <ul className={classes.posts}>
      <Post author="Daniel" body={"React is awesome!"} />
      <Post author=":)" body="Check out the full course!" />
    </ul>
  );
}

export default PostList;
