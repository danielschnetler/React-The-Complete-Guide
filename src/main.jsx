import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import NewPost from "./routes/NewPost";
import RootLayout from "./routes/RootLayout";
import Posts, { loader as postsLoader } from "./routes/Posts";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route path="/" element={<Posts />} loader={postsLoader}>
      <Route path="/create-post" element={<NewPost />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
