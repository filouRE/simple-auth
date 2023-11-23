import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckLogin from "./components/checkLogin.jsx";
import App from "./App.jsx";
import Home from "./Home.jsx";
import "./index.css";
import Test from "./Test.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signin",
        element: <App signin={true} />,
    },
    {
        path: "/signup",
        element: <App signup={true} />,
    },
    {
        path: "/home",
        element: <CheckLogin component={<Home />} />,
    },
    {
        path: "/test",
        element: <CheckLogin component={<Test />} />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
