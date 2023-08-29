
import './App.css';
import Landing from './pages/landing/Landing';
import Navbar from './components/navbar/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Alert from './components/Alert';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  }
]);

const App = () => {
  return (
    <div className="App">
      <Alert />
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
