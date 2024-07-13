import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainScreen from './main/mainscreen';
import NotFound from './NotFound';
import reportWebVitals from './reportWebVitals';
import CreateQR from './ticket/createqr';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ticket from './ticket/ticketmain';
import RedirectPage from './redirect/ticketredirectpage';
import PromotionView from './promotion/promotionmain';
import PromotionCreate from './promotion/promotionscreate';
import AuthRedirect from './redirect/authredirectpage';
import Ticketing from './promotion/ticketing';
import "react-loading-skeleton/dist/skeleton.css";
import PromotionEdit from './promotion/promotionedit';
import ProtectedRoute from './routes/protectedroute';
import AccessDeniedPage from './routes/accessdenied';
import Manage from './ticket/manage';
import MyPage from './mypage/mypage';
import Promotions from './mypage/promotions';
import Comments from './mypage/comments';
import TicketLogin from './routes/ticketlogin';
import ConfimationRoute from './routes/confirmationroute';
declare global {
  interface Window {
    Kakao: any;
  }
}


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
          path:"auth",
          element : <AuthRedirect/>
        },
        {
            path:"accessdenied",
            element: <AccessDeniedPage /> // 접근 제한 페이지
        } ,
        {
          path:"promotion",
          children : [{
            path:":id", 
            element: <PromotionView/>
          },
          
          {
            path : "create",
            element : <ProtectedRoute element={<PromotionCreate/>} /> // 접근 제한
          },{
            path:":id/purchase",
            element : <ProtectedRoute element={<Ticketing/>} /> // 접근 제한
          },{
            path:":id/edit",
            element : <ProtectedRoute element={<PromotionEdit/>} /> // 접근 제한
          },{
            path:":id/manage",
            element : <ProtectedRoute element={<Manage/>} /> // 접근 제한
          }]
        },
        {
          path:"ticket",
          children : [{
            path: "",
            element: <ProtectedRoute element={<Ticket/>} /> // 접근 제한
          
          },{
            path: "createqr",
            element: <ProtectedRoute element={<CreateQR/>} /> // 접근 제한
          
          },
          {
            path:"redirect",
            element: <RedirectPage/>
          },
          {
            path: "confirm/:uuid",
            element: <ConfimationRoute element={<TicketLogin/>}/>
          }
          ]
        },
        {
          path:"mypage",
          children : [{
              path: "",
              element: <ProtectedRoute element={<MyPage/>} /> // 접근 제한
            },
            {
              path: "like/promotions",
              element: <ProtectedRoute element={<Promotions/>} /> 
            },
            {
              path:"comments",
              element: <ProtectedRoute element={<Comments/>} /> 

            }
          ]
        }
      ]
    },
  ]

)

root.render(
  
      <RouterProvider router = {router}/>
);

reportWebVitals();
