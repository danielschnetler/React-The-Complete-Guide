const Add = (a, b) => {
  return a + b;
};

function Post(props) {
  return (
    <div>
      <p>{props.author}</p>
      <p>{props.body}</p>
      <p>{Add(1, 2)}</p>
    </div>
  );
}

export default Post;
