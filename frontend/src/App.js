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
import AuthenticationPage from "./pages/Authentication";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
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
        />
      </Route>
      <Route
        path="new"
        element={<NewEventPage />}
        action={manipulateEventAction}
      />
    </Route>
    <Route path="auth" element={<AuthenticationPage />} />
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
