import React from 'react';

import {
  LoginPage,
  RegisterPage,
  PageLayout,
  MusicianMyEventsPage,
  ProfilePage,
  ChangePassword,
  ForgetPassword,
  BusinessAllEvents,
  BusinessHomePage,
  BusinessReportPage,
  MusicianHomePage,
} from './pages/exportPages.js';
import { ThemeProvider } from '@material-tailwind/react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/context/authContext';
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children, isAdmin = false }) => {
    if (currentUser && isAdmin) {
      return <Navigate to="/admin" />;
    }
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    // if (currentUser && !isAdmin) {
    //   return <Navigate to="/" />;
    // }

    return children;
  };
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: (
        <ProtectedRoute isAllowed={currentUser?.role === 'admin'}>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/admin',
          element: <BusinessHomePage />,
        },
        {
          path: '/admin/events',
          element: <BusinessAllEvents />,
        },
        {
          path: '/admin/profile/:id',
          element: <ProfilePage />,
        },
        {
          path: '/admin/reports',
          element: <BusinessReportPage />,
        },
      ],
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <MusicianHomePage />,
        },
        {
          path: '/profile/:id',
          element: <ProfilePage />,
        },
        {
          path: '/myEvents',
          element: <MusicianMyEventsPage />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/forgetpassword',
      element: <ForgetPassword />,
    },
    {
      path: '/changepassword',
      element: <ChangePassword />,
    },
  ]);
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
