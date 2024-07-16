import React from 'react'
import like_icon_true from './img/like_icon_true.png';
import like_icon_false from './img/like_icon_false.png';
type Props = {
    like : boolean,
    like_num : number
    onClick :  (id:number, value:boolean) => void;
    id : number;
}
{/* 10px가 안되는 부분 */}
const LikeButton = (props: Props) => {
    
    const { like,like_num,onClick,id } = props;
    const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick(id,like);
    };
    return (
        
            <button className="absolute top-2 right-2 bg-white rounded-full w-60px h-30px p-1 shadow-md border-primary"
                style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.01)',
                borderRadius: '16px',
                border: '1px solid rgba(30, 218, 0)'
                    
                }}
                onClick={handleLikeClick}
                >
            <div className='flex flex-row items-center justify-center' >
                { like ? <img src={like_icon_true} alt="like" className="mr-1 w-18px h-4" /> :
                <img src={like_icon_false} alt="like" className="mr-1 w-18px h-4" />}
            <span className="text-xs text-green-600">{like_num}</span>
            </div>
            </button>
    )
}

export default LikeButton