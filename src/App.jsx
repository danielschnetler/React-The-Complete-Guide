import PostList from "./components/PostList";
import MainHeader from "./components/MainHeader";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  function modalClosedHandler() {
    setShowModal(false);
  }
  function modalOpenHandler() {
    setShowModal(true);
  }
  return (
    <>
      <MainHeader onCreatePost={modalOpenHandler}></MainHeader>
      <main>
        <PostList modalOpen={showModal} onHideModal={modalClosedHandler} />
      </main>
    </>
  );
}

export default App;
