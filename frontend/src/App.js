import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventLoader } from "./pages/Events";
import EventsDetailPage, {
  loader as eventDetailsLoader,
  action as deleteEventAction,
} from "./pages/EventsDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./Root";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { loader as tokenLoader, checkAuthLoader } from "./util/auth";

const routeDefinitions = createRoutesFromElements(
  <Route
    path="/"
    element={<RootLayout />}
    errorElement={<ErrorPage />}
    id="root"
    loader={tokenLoader}
  >
    <Route index="true" element={<HomePage />} />
    <Route path="events" element={<EventsRootLayout />}>
      <Route index="true" element={<EventsPage />} loader={eventLoader} />
      <Route path=":eventId" id="event-detail" loader={eventDetailsLoader}>
        <Route
          index="true"
          element={<EventsDetailPage />}
          action={deleteEventAction}
        />
        <Route
          path="edit"
          element={<EditEventPage />}
          action={manipulateEventAction}
          loader={checkAuthLoader}
        />
      </Route>
      <Route
        path="new"
        element={<NewEventPage />}
        action={manipulateEventAction}
        loader={checkAuthLoader}
      />
    </Route>
    <Route path="auth" element={<AuthenticationPage />} action={authAction} />
    <Route path="logout" action={logoutAction} />
    <Route
      path="newsletter"
      element={<NewsletterPage />}
      action={newsletterAction}
    />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
