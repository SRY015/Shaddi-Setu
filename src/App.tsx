import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/User/Login";
import RegisterUser from "./Pages/Auth/User/RegisterUser";
import ArtistOnboarding from "./Pages/ArtistOnboarding";
import ProfileCompletion from "./Pages/ArtistOnboarding/ProfileCompletion";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ArtistProfile from "./Pages/Artist/ArtistProfile";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "search-artist",
        element: <SearchResultsPage />,
      },
      {
        path: "user-login",
        element: <Login />,
      },
      {
        path: "user-registration",
        element: <RegisterUser />,
      },
      {
        path: "artist-onboarding",
        element: <ArtistOnboarding />,
      },
      {
        path: "profile-created",
        element: <ProfileCompletion />,
      },
      {
        path: "artist-profile",
        element: <ArtistProfile />,
      },
      {
        path: "customer-dashboard",
        element: <CustomerDashboard />,
      },
    ],
  },
]);

export default appRouter;
