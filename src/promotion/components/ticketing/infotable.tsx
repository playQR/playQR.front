import { InfoType } from "../../types/info";


type InfoProps = {
  info : InfoType;
}

export const InfoTable = (props:InfoProps) => {
    const {bankName, entranceFee, account, accountHolder} = props.info
    return(
        <table className='border-separate border-spacing-2 text-system-white text-pmd mt-5 w-full'
        >
            <tr>
                <td width={'30%'}>티켓 가격</td>
                <td width={'70%'}>{entranceFee}</td>
            </tr>
            <tr>
                <td>입금 계좌</td>
                <td>{account}</td>
            </tr>
            <tr>
                <td>은행</td>
                <td>{bankName}</td>
            </tr>
            <tr>
                <td>예금주</td>
                <td>{accountHolder}</td>
            </tr>
        </table>)
}