import { useLoaderData, Link, Form, redirect } from "react-router-dom";

import Modal from "../components/Modal";
import classes from "./PostDetails.module.css";
import commonbutton from "./Button.module.css";

function PostDetails({}) {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
        <p>
          <Link
            className={commonbutton.action}
            to={"/"}
            type="button"
            onClick={async () => action(post.id)}
          >
            Delete?
          </Link>
        </p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }) {
  const response = await fetch("http://localhost:8080/posts/" + params.id);
  const resData = await response.json();
  return resData.post;
}

async function action(id) {
  console.log(id);
  const response = await fetch("http://localhost:8080/" + id, {
    method: "DELETE",
  });
  console.log(response);
  return redirect("/");
}
