import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Component/Login/Login.jsx";
import Register from "./Component/Register/Register.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import Forgetpassword from './Component/ForgetPassword/ForgetPassword.jsx';
import ResetCode from './Component/ResetCode/ResetCode.jsx';
import ResetPassword from './Component/ResetPassword/ResetPassword.jsx';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { index:true, element: <Register /> },
      { path:'forgetpassword', element: <Forgetpassword /> },
      { path:'resetCode', element: <ResetCode /> },
      { path:'resetPassword', element: <ResetPassword /> },
    ],
  },
]);

function App() {
  return (
    <>
     <div className="background">
      <RouterProvider router={routers}></RouterProvider>
      </div>
    </>
  );
}

export default App;
