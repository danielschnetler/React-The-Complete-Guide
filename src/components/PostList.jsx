import { useLoaderData } from "react-router";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostList() {
  const postList = useLoaderData("").posts;
  console.log(postList);
  return (
    <>
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
