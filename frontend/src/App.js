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

// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/events/:eventId" element={<EventsDetailPage />} />
    <Route path="/events/new" element={<NewEventPage />} />
    <Route path="/events/:eventId/edit" element={<EditEventPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
