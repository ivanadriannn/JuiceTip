import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import ChatPage from "./views/ChatPage/ChatPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import JuiceTipPage from "./views/JuiceTipPage/JuiceTipPage";
import JuiceMartPage from "./views/JuiceMartPage/JuiceMartPage";
import JuiceTrackPage from "./views/JuiceTrack/JuiceTrackPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TopUpPage from "./views/TopUpPage/TopUpPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import PaymentPage from "./views/PaymentPage/PaymentPage";
import AddEditProductPage from "./views/AddEditProductPage/AddEditProductPage";
import MyProductsPage from "./views/MyProductsPage/MyProductsPage";
import ConfirmationPaymentPage from "./views/ConfirmationPaymentPage/ConfirmationPaymentPage";
import ComplaintPage from "./views/ComplaintPage/ComplaintPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/chat/:customerId",
    element: <ChatPage />,
  },
  {
    path: "/juice-tip",
    element: <JuiceTipPage />,
  },
  {
    path: "/juice-mart",
    element: <JuiceMartPage />,
  },
  {
    path: "/juice-track",
    element: <JuiceTrackPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/add-product",
    element: <AddEditProductPage />,
  },
  {
    path: "/top-up",
    element: <TopUpPage />,
  },
  {
    path: "/detail-product/:productId",
    element: <DetailProductPage />,
  },
  {
    path: "/edit-product/:id",
    element: <AddEditProductPage />,
  },
  {
    path: "/confirmation-payment",
    element: <ConfirmationPaymentPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/my-products",
    element: <MyProductsPage />,
  },
  {
    path: "/complaint",
    element: <ComplaintPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);
