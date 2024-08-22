import MusicLikeButton from '../../../common/components/buttons/like_button_music'
import { Music, SetListMusic } from '../../types/index';
import Footer from '../../../common/components/footer';
import lockIcon from '../../img/lock_icon.png'

type Props = {
    musicList : Music [],
    content : string,
    refundInfo : string,
    updateHeart : (id: any, value: boolean) => Promise<void>;
}
const ShowInfo = (props: Props) => {
    
    const { musicList, content, refundInfo,updateHeart } = props
    return (
        <div className='flex flex-col w-full mt-5 py-10px'>
            {musicList.length > 0 ? 
            <div className="w-full">
                    <div className='font-semibold text-primary text-pxl'>
                        {`SetList - ${musicList.length} Songs`}
                        <div style={{border:'0.8px'}} className='flex flex-col w-full font-normal bg-gray-4 border-gray-3 rounded-2xl my-10px py-10px'>
                        {musicList?.map((song, index) => {
                            return (
                                <div key={song.id} className='flex flex-col items-center justify-between w-full'>
                                <div className='flex flex-row items-center justify-between w-full'>
                                    <div className='flex flex-row items-center justify-between w-full px-14px'>
                                        {song.isOpen === false ? <div className='flex flex-row items-center my-2'>
                                            <img src={lockIcon} className='object-cover h-4 mr-2'/>
                                            <div className='text-white text-pmd'>공연에서 확인하세요</div>
                                        </div> :
                                        <div className='flex flex-col items-start'>
                                            <div className='text-white text-pmd'>{song.title}</div>
                                            <div className='text-white text-psm'>{song.artist}</div>
                                        </div>}
                                        <div className='flex flex-row items-center'>
                                            <MusicLikeButton updateHeart={updateHeart} id={musicList[index]?.id} like={musicList[index]?.musicLikeInfo.liked} like_num={musicList[index]?.musicLikeInfo.count}/>
                                        </div>
                                    </div>
                                </div>
                                    {index < musicList.length - 1 && (
                                        <div className='w-full h-0.5 bg-gray-3 mx-2 my-10px'></div>
                                    )}
                                </div>
                            )
                            
                        })}
                        </div>
                    </div>
                
            </div> :
            <div></div>}
            <div className='flex flex-col w-full mt-10px mb-100px'>
                <div className='font-semibold text-primary text-pxl'>
                    공연정보
                </div>
                <div className='flex flex-col -mx-4 break-all whitespace-pre-wrap bg-white rounded-xl p-22px mt-10px'>
                    {content}
                </div>
                <div className='pt-5 text-plg text-gray-2 pb-10px'>
                    환불정보
                </div>
                <div className='break-all text-plg text-gray-2'>
                    {refundInfo}
                </div>
            </div>
            <Footer/>
        </div>
        
        
    )
}

export default ShowInfo
