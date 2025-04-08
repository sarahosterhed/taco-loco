import { createBrowserRouter } from "react-router";
import { AdminPage } from "./pages/AdminPage";
import { BookingPage } from "./pages/BookingPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/booking",
                element: <BookingPage />
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
        ]

    }
])