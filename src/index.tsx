import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainScreen from './main/mainscreen';
import LoginScreen from './login/loginscreen';
import NotFound from './NotFound';
import Register from './register/registerscreen';
import reportWebVitals from './reportWebVitals';
import CreateTicket from './ticket/createticket';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ticket from './ticket/ticketmain';
import RedirectPage from './redirect/ticketredirectpage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  [
    { 
      path: '/', 
      element: <App />,
      errorElement : <NotFound/>,
      children : [
        {
          index : true,
          path : "",
          element : <MainScreen/>
        },
        {
          path:"login",
          element : <LoginScreen/>
        },
        {
          path:"register",
          element: <Register/>
        },
        
        {
          path:"ticket",
          children : [{
            path: "",
            element: <Ticket/>
          
          },{
            path: "create",
            element: <CreateTicket/>
          
          },
          {
            path:"redirect",
            element: <RedirectPage/>
          }
          ]
        }
      ]
    },
  ]

)

root.render(
  <React.StrictMode>
      <RouterProvider router = {router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
