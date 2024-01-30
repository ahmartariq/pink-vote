import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './Screens/App';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { GlobalProvider } from './Screens/GlobalContext';
import Dashboad from './Screens/Dashboad';
import CoinDetails from './Screens/CoinDetails';
import AddCoin from './Screens/AddCoin';
import Profile from './Screens/Profile';
import MyCoins from './Screens/MyCoins';
import MyOrders from './Screens/MyOrders';
import AccountSettings from './Screens/AccountSettings';
import ChangePassword from './Screens/ChangePassword';
import Advertise from './Screens/Advertise';
import MyFavs from './Screens/MyFavs';
import Airdrops from './Screens/Airdrops';
import AddAirdrop from './Screens/AddAirdrop';
import Partners from './Screens/Partners';
import AirdropDetails from './Screens/AirdropDetails';
import AddPartner from './Screens/AddPartner';
import Disclaimer from './Screens/Disclaimer';
import TermsOfUse from './Screens/TermsOfUse';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import TermsConditions from './Screens/TermsConditions';
import Mobile from './Screens/Mobile';
import Contact from './Screens/Contact';
import ForgetPassword from './Screens/ForgetPassword';
import Token from "./Screens/Token";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/login",
        element : <Login />,
      },
      {
        path: "/register",
        element : <Register />
      },
      {
        path: "/",
        element : <Dashboad />
      },
      {
        path: "coin/:name",
        element : <CoinDetails />
      },
      {
        path: "add-coin",
        element : <AddCoin />
      },
      {
        path: "profile/:name",
        element : <Profile />
      },
      {
        path: "my-fav",
        element : <MyFavs />
      },
      {
        path: "my-coins",
        element : <MyCoins />
      },
      {
        path: "my-orders",
        element : <MyOrders />
      },
      {
        path: "account-settings",
        element : <AccountSettings />
      },
      {
        path: "password",
        element : <ChangePassword />
      },
      {
        path: "advertise",
        element : <Advertise />
      },
      {
        path: "airdrops",
        element : <Airdrops />
      },
      {
        path: "add-airdrop",
        element : <AddAirdrop />
      },
      {
        path: "airdrop/:name",
        element : <AirdropDetails />
      },
      {
        path: "add-partner",
        element : <AddPartner />
      },
      {
        path: "partner",
        element : <Partners />
      },
      {
        path:"token",
        element: <Token />
      },
      {
        path: "disclaimer",
        element : <Disclaimer />
      },
      {
        path: "terms",
        element : <TermsOfUse />
      },
      {
        path: "privacy",
        element : <PrivacyPolicy />
      },
      {
        path: "cgv",
        element : <TermsConditions />
      },
      {
        path: "mobile",
        element : <Mobile />
      },
      {
        path: "contact",
        element : <Contact />
      },
      {
        path: "forget-password",
        element : <ForgetPassword />
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <RouterProvider router={router} />
  </GlobalProvider>
)
