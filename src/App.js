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
  console.log(currentUser);
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
        <ProtectedRoute isAllowed={currentUser.role === 'admin'}>
          <BusinessHomePage />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/allEvents',
          element: <BusinessAllEvents />,
        },
        {
          path: '/profile/:id',
          element: <ProfilePage />,
        },
      ],
    },
    {
      index: true,
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
