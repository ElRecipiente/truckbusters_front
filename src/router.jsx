import { createBrowserRouter } from "react-router-dom";
import PageError from "./pages/PageError";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import CreateForm from "./pages/CreateForm";
import Confirmation from "./pages/Confirmation";
import Error404 from "./pages/Error404";
import RouterLayout from "./RouterLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RouterLayout />,
        errorElement: <PageError />,
        loader: () => fetch('http://localhost:3333/api/v1/info'),
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'appointment',
                element: <Appointment />
            }, {
                path: 'create-form/:date',
                element: <CreateForm />
            }, {
                path: 'confirmation',
                element: <Confirmation />
            }, {
                path: '*',
                element: <Error404 />
            }
        ]
    }
])

export default router;