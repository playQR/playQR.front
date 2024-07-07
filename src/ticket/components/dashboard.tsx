import React from 'react'
import CreateButton from './buttons/createbutton';
import Line from '../../common/components/line/line';

type Props = {}

const Dashboard = (props: Props) => {
    const [isLeft, setIsLeft] = React.useState<boolean>(true);
    const onLeftClick = () => {
        setIsLeft(true);
    };

    const onRightClick = () => {
        setIsLeft(false);
    };
    return (
        <div>
            <div className="flex flex-row w-full mt-5 h-10">
                <div onClick={onLeftClick} className="flex flex-col w-1/2 items-center justify-center">
                    <div className="text-white text-pmd">나의 Ticket</div>
                    <div className={`${isLeft?'bg-primary border-primary':'bg-system-background border-system-background'} border-1px w-full mt-10px transition-colors duration-500`}></div>
                </div>
                <div onClick={onRightClick} className="flex flex-col w-1/2 items-center justify-center">
                    <div className="text-white text-pmd">내 공연</div>
                    <div className={`${!isLeft?'bg-primary border-primary':'bg-system-background border-system-background'} border-1px w-full mt-10px transition-colors duration-500`}></div>
                </div>
            </div>
            {
                isLeft? <div>왼쪽</div>:
                <div className="w-full ">
                    <CreateButton/>
                    <Line/>
                </div>
            }
        </div>
    )
}

export default Dashboard