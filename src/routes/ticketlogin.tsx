import logo from '../common/components/img/logo.png'
import kakao_login from '../login/img/kakao_login_button.png'
import store from '../store/store'
type Props = {}

const TicketLogin = (props: Props) => {

    const {useUriStore} = store;
    const {setPrevUri} = useUriStore();
    

    const onClick = () => {
        setPrevUri({uri: window.location.pathname,params: {}})
        window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorize/kakao`
    }

  return (
    <div className='w-full bg-system-background flex flex-col justify-center items-center h-svh text-system-white p-10'>
      <img src={logo} className='h-100px mb-10 object-cover' style={{ objectFit: 'cover' }}/>
      <div className='text-plg text-center mb-10'>티켓을 확인하려면 로그인이 필요합니다</div>
      <img src={kakao_login} onClick={onClick} className='h-45px w-full max-w-sm object-cover rounded-md' style={{ objectFit: 'cover' }}/>
  </div>

  )
}

export default TicketLogin