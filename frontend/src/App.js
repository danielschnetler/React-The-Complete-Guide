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
} from "./pages/EventsDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./Root";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
    <Route index="true" element={<HomePage />} />
    <Route path="events" element={<EventsRootLayout />}>
      <Route index="true" element={<EventsPage />} loader={eventLoader} />
      <Route path=":eventId" id="event-detail" loader={eventDetailsLoader}>
        <Route index="true" element={<EventsDetailPage />} />
        <Route path="edit" element={<EditEventPage />} />
      </Route>
      <Route path="new" element={<NewEventPage />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
