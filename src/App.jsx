import Post from "./components/Post";

function App() {
  return (
    <main>
      <Post author="Daniel" body={"React is awesome!"} />
      <Post author=":)" body="Check out the full course!" />
      <Post />
      <Post />
    </main>
  );
}

export default App;
