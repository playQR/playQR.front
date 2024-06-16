// import React from 'react'
// import store from '../store/store'
// import { useNavigate } from 'react-router-dom'

// type Props = {}

// const LoginScreen = (props: Props) => {

//   const { useAuthStore } = store;
//   const {setToken} = useAuthStore(state => state);
//   const navigate = useNavigate();

//   const onClick = () => {
//     setToken('login');
//     navigate('/');
//   }
//   return (
//     <div className='flex flex-col min-w-screen min-h-screen items-center justify-center bg-black'>
//         <h1 className='text-white text-3xl pb-16'>Login to PlayBarcode</h1>
//         <button onClick = {onClick}>
//           <img src={'kakao/kakao_login_medium_narrow.png'}/>
//         </button>
//     </div>
//   )
// }

// export default LoginScreen

import React from 'react'

type Props = {}

const loginscreen = (props: Props) => {
  return (
    <div>loginscreen</div>
  )
}

export default loginscreen