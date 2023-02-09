import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventsDetailPage from "./pages/EventsDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./Root";
import EventsRootLayout from "./pages/EventsRoot";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index="true" element={<HomePage />} />
    <Route path="events" element={<EventsRootLayout />}>
      <Route
        index="true"
        element={<EventsPage />}
        loader={async () => {
          const response = await fetch("http://localhost:8080/events");

          if (!response.ok) {
            //setError("Fetching events failed.");
          } else {
            const resData = await response.json();
            return resData.events;
          }
        }}
      />
      <Route path=":eventId" element={<EventsDetailPage />} />
      <Route path="new" element={<NewEventPage />} />
      <Route path=":eventId/edit" element={<EditEventPage />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
