import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';

type Props = {}

const TicketRedirectPage = (props: Props) => {
    const queryParams = new URLSearchParams(window.location.search);
    const key = queryParams.get('key');
    useEffect(() => {
        // const fetchData = async () => {
        //     const response = await fetch('https://api.example.com/data');
        //     const data = await response.json();
        // };
        // fetchData();
        alert('key : ' +  key)
    }, []);


    return (
        <div>
            <h1>Redirecting...</h1>
            {/* 로딩 스피너나 추가적인 UI 컴포넌트를 표시할 수 있음 */}
        </div>
    )
}

export default TicketRedirectPage