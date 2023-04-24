import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Auth from "../../pages/Auth/Auth";
import Report from "../../pages/Report/Report";
import Reports from "../../pages/Reports/Reports";
import Details from "../../pages/Details/Details";
import Officers from "../../pages/Officers/Officers";
import OfficersForm from "../../pages/OfficersForm/OfficersForm";
import NotFound from "../../pages/NotFound/NotFound";

const routes = [
    { path: '/', element: <Home /> },
    { path: '/registration', element: <Auth type="registration"/> },
    { path: '/login', element: <Auth type="login"/> },
    { path: '/report', element: <Report /> },
    { path: '/reports', element: <Reports /> },
    { path: '/reports/:id', element: <Details type="reports"/> },
    { path: '/officers', element: <Officers /> },
    { path: '/officers/:id', element: <Details type="officers"/> },
    { path: '/officers/create', element: <OfficersForm /> },
    { path: '/officers/edit/:id', element: <OfficersForm /> },
    { path: '/reports/edit/:id', element: <Report /> },
    { path: '*', element: <NotFound /> },
];

export const router = createBrowserRouter(routes);