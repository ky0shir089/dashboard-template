import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

const Route = () => {
  const App = lazy(() => import("../App"));
  const ErrorPage = lazy(() => import("../pages/ErrorPage"));
  const Login = lazy(() => import("../pages/Login"));
  const Home = lazy(() => import("../pages/Home"));
  const Profile = lazy(() => import("../pages/Profile"));

  const Module = lazy(() =>
    import("../pages/setupAplikasi/setupModule/Module")
  );
  const NewModule = lazy(() =>
    import("../pages/setupAplikasi/setupModule/NewModule")
  );
  const EditModule = lazy(() =>
    import("../pages/setupAplikasi/setupModule/EditModule")
  );

  const IndexMenu = lazy(() =>
    import("../pages/setupAplikasi/setupMenu/IndexMenu")
  );
  const NewMenu = lazy(() =>
    import("../pages/setupAplikasi/setupMenu/NewMenu")
  );
  const EditMenu = lazy(() =>
    import("../pages/setupAplikasi/setupMenu/EditMenu")
  );

  const Role = lazy(() => import("../pages/setupAplikasi/setupRole/Role"));
  const NewRole = lazy(() =>
    import("../pages/setupAplikasi/setupRole/NewRole")
  );
  const EditRole = lazy(() =>
    import("../pages/setupAplikasi/setupRole/EditRole")
  );

  const RoleMenu = lazy(() =>
    import("../pages/setupAplikasi/setupRoleMenu/RoleMenu")
  );
  const NewRoleMenu = lazy(() =>
    import("../pages/setupAplikasi/setupRoleMenu/NewRoleMenu")
  );

  const User = lazy(() => import("../pages/setupAplikasi/setupUser/User"));
  const NewUser = lazy(() =>
    import("../pages/setupAplikasi/setupUser/NewUser")
  );
  const EditUser = lazy(() =>
    import("../pages/setupAplikasi/setupUser/EditUser")
  );

  const router = createBrowserRouter([
    {
      element: <PrivateRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
            {
              path: "/setup-aplikasi/setup-module",
              element: <Module />,
            },
            {
              path: "/setup-aplikasi/setup-module/new",
              element: <NewModule />,
            },
            {
              path: "/setup-aplikasi/setup-module/:id/edit",
              element: <EditModule />,
            },
            {
              path: "/setup-aplikasi/setup-menu",
              element: <IndexMenu />,
            },
            {
              path: "/setup-aplikasi/setup-menu/new",
              element: <NewMenu />,
            },
            {
              path: "/setup-aplikasi/setup-menu/:id/edit",
              element: <EditMenu />,
            },
            {
              path: "/setup-aplikasi/setup-role",
              element: <Role />,
            },
            {
              path: "/setup-aplikasi/setup-role/new",
              element: <NewRole />,
            },
            {
              path: "/setup-aplikasi/setup-role/:id/edit",
              element: <EditRole />,
            },
            {
              path: "/setup-aplikasi/setup-role-menu",
              element: <RoleMenu />,
            },
            {
              path: "/setup-aplikasi/setup-role-menu/new",
              element: <NewRoleMenu />,
            },
            {
              path: "/setup-aplikasi/setup-user",
              element: <User />,
            },
            {
              path: "/setup-aplikasi/setup-user/new",
              element: <NewUser />,
            },
            {
              path: "/setup-aplikasi/setup-user/:id/edit",
              element: <EditUser />,
            },
          ],
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return { router };
};

export default Route;
