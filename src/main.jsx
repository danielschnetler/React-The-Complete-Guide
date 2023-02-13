import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import NewPost, { action as newPostAction } from "./routes/NewPost";
import RootLayout from "./routes/RootLayout";
import Posts, { loader as postsLoader } from "./routes/Posts";
import PostDetails, { loader as postDetailsLoader } from "./routes/PostDetails";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route path="/" element={<Posts />} loader={postsLoader}>
      <Route path="/create-post" element={<NewPost />} action={newPostAction} />
      <Route path="/:id" element={<PostDetails />} loader={postDetailsLoader} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
