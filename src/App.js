import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageLayout from './layout/PageLayout';
import MusicianHomePage from './pages/MusicianHomePage';
import MusicianMyEventsPage from './pages/MusicianMyEventsPage';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
import { ThemeProvider } from '@material-tailwind/react';
import ForgetPassword from './pages/ForgetPassword';
import BusinessHomePage from './pages/BusinessHomePage';
import BusinessAllEvents from './pages/BusinessAllEvents';
import BusinessReportpage from './pages/BusinessReportpage';
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
  const ProtectedRoute = ({ children, isAllowed }) => {
    if (!isAllowed) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute isAllowed={currentUser?.role === 'admin'}>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <BusinessHomePage />,
        },
        {
          path: '/events',
          element: <BusinessAllEvents />,
        },
        {
          path: '/profile/:id',
          element: <ProfilePage />,
        },
        {
          path: '/reports',
          element: <BusinessReportpage />,
        },
      ],
    },
    {
      path: '/',
      element: (
        <ProtectedRoute isAllowed={currentUser?.role === 'user'}>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <MusicianHomePage />,
        },
        {
          path: 'profile/:id',
          element:<ProfilePage/>
        },
        {
          path:'myEvents',
          element:<MusicianMyEventsPage/>
        }
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
  ]);
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
