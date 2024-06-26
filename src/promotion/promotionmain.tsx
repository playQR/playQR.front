import Nav from '../common/components/nav/nav';
import KakaoModal from '../login/Modal';
import PromotionInfo from './components/promotionview/promotioninfo';
import BottomButton from './components/promotionview/bottombutton';
import {useParams} from 'react-router-dom';
import { SetListMusic,Comment,ViewPromotion, Billing } from './types';
type Props = {}

const mockSetList: SetListMusic[] = [
  {
    song: {
      id: 1,
      title: "Song One",
      artist: "Artist A",
      open: true
    },
    song_like: true,
    song_like_num: 10
  },
  {
    song: {
      id: 2,
      title: "Song Two",
      artist: "Artist B",
      open: false
    },
    song_like: false,
    song_like_num: 5
  },
  {
    song: {
      id: 3,
      title: "Song Three",
      artist: "Artist C",
      open: true
    },
    song_like: true,
    song_like_num: 8
  },
  {
    song: {
      id: 4,
      title: "Song Four",
      artist: "Artist D",
      open: true
    },
    song_like: false,
    song_like_num: 3
  },
  {
    song: {
      id: 5,
      title: "Song Five",
      artist: "Artist E",
      open: false
    },
    song_like: true,
    song_like_num: 15
  }
];
const example_comment_content: Comment[] = [
  {
    content: "공연이 정말 기대돼요!",
    created_at: "2024-07-04T14:47:27.422Z",
    member: {
      name: "김철수",
      nickname: "철수",
      profileImg: undefined
    }
  },
  {
    content: "이번 콘서트는 꼭 가야해요.",
    created_at: "2024-07-05T10:00:00.000Z",
    member: {
      name: "이영희",
      nickname: "영희",
      profileImg: undefined
    }
  },
  {
    content: "예매 성공했어요!",
    created_at: "2024-07-06T09:30:00.000Z",
    member: {
      name: "박민수",
      nickname: "민수",
      profileImg: undefined
    }
  },
  {
    content: "친구들이랑 같이 가기로 했어요.",
    created_at: "2024-07-07T12:45:00.000Z",
    member: {
      name: "최지은",
      nickname: "지은",
      profileImg: undefined
    }
  },
  {
    content: "기대 이상일 것 같아요!",
    created_at: "2024-07-08T15:15:00.000Z",
    member: {
      name: "홍길동",
      nickname: "길동",
      profileImg: undefined
    }
  }
];

const example_refund_info : Billing = {
    price: 32000,
    bankName: "국민은행",
    bankAccount: "123-456-789012",
    bankAccountHolder: "주식회사 플레이바코드",
    refundPolicy: "환불은 공연 7일 전까지 가능합니다. 이 기간 이후에는 환불이 불가합니다."
}
  const example_promotion_info: ViewPromotion[] = [
    {
      promotionId: 1,
      title: "Live in Concert",
      content: "Join us for an unforgettable night with The Rolling Stones. Experience the classics live!",
      team: "The Rolling Stones",
      musicList: mockSetList,
      imageList: undefined,
      location: "홍대, 프라자3층",
      date: "2024-07-04",
      startTime: "19:00",
      billing: example_refund_info,
      comment: example_comment_content
    }
  ];
const PromotionView = (props: Props) => {

    
    const { id } = useParams()
    // useEffect(() => {
    //     axiosAPI.get('/promotion', {
    //         params: {
    //             id: id
    //         }
    //     }).then((res) => {
    //         console.log(res.data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, [])

    return (
        <div className='w-full relative'>
            <div className='flex flex-col min-h-screen w-full bg-system-background p-4'>
                <KakaoModal/>
                <Nav/>
                <PromotionInfo promotion_info={example_promotion_info[Number(id)]}/>
            </div>
            <BottomButton/>
        </div>
    )
}

export default PromotionView