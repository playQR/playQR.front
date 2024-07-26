import * as Sentry from "@sentry/react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainScreen from './main/mainscreen';
import NotFound from './NotFound';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ticket from './ticket/ticketmain';
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
import ViewReservation from './ticket/components/viewreservation';



Sentry.init({
  dsn: `${process.env.REACT_APP_SENTRY_DSN}`,
  environment: "production",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.captureConsoleIntegration(),
    Sentry.contextLinesIntegration()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
            element : <ProtectedRoute element={<PromotionCreate/>} />
          },{
            path:":id/purchase",
            element : <ProtectedRoute element={<Ticketing/>} /> 
          },{
            path:":id/edit",
            element : <ProtectedRoute element={<PromotionEdit/>} />
          },{
            path:":id/manage",
            element : <ProtectedRoute element={<Manage/>} /> 
          }]
        },
        {
          path:"ticket",
          children : [{
            path: "",
            element: <ProtectedRoute element={<Ticket/>} />
          
          },
          {
            path: "confirm/:uuid",
            element: <ConfimationRoute element={<TicketLogin/>}/>
          },
          {
            path : ":pid/reservation/:gid",
            element : <ProtectedRoute element = {<ViewReservation/>}/>
          }
          ]
        },
        {
          path:"mypage",
          children : [{
              path: "",
              element: <ProtectedRoute element={<MyPage/>} /> 
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
