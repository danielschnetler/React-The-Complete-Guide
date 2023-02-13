import { useState } from "react";
import classes from "./NewPost.module.css";

function NewPost() {
  const [textArea, setTextArea] = useState(""); //const something = useState(initial value); something[0]=(initial value)...; something[1](somevalue)
  const [textInput, setTextInput] = useState("");

  const textAreaChangeHandler = (event) => {
    setTextArea(event.target.value);
  };

  function inputChangeHandler(event) {
    setTextInput(event.target.value);
  }

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea
          id="body"
          required
          rows={3}
          onChange={textAreaChangeHandler}
        />
      </p>
      <p>{textArea}</p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={inputChangeHandler} />
      </p>
      <p>{textInput}</p>
    </form>
  );
}

export default NewPost;
