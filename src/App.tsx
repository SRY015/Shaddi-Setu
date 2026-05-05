import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Customer/Login";
import RegisterUser from "./Pages/Auth/Customer/RegisterUser";
import ArtistOnboarding from "./Pages/ArtistOnboarding";
import ProfileCompletion from "./Pages/ArtistOnboarding/ProfileCompletion";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ArtistProfile from "./Pages/Artist/ArtistProfile";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard/index";
import ArtistRegistration from "./Pages/Auth/Artist/ArtistRegistration";
import ArtistDashboard from "./Pages/Artist/ArtistDashboard";
import RoleProtectedRoute from "./Components/RoleProtectedRoute";

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
        path: "artist-registration",
        element: <ArtistRegistration />,
      },
      {
        path: "profile-created",
        element: <ProfileCompletion />,
      },
      {
        path: "artist-profile/:artistId",
        element: <ArtistProfile />,
      },
      {
        path: "customer-dashboard",
        element: (
          <RoleProtectedRoute allowedRoles={["customer"]}>
            <CustomerDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "artist-dashboard",
        element: (
          <RoleProtectedRoute allowedRoles={["Photographer", "Makeup Artist"]}>
            <ArtistDashboard />
          </RoleProtectedRoute>
        ),
      },
    ],
  },
]);

export default appRouter;
