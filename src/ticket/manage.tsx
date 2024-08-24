import React from "react";
import Nav from "../common/components/nav/nav";
import Guest from "./components/guest/guest";
import BackButton from "./components/guest/backbutton";
import TicketNumInfo from "./components/guest/ticketnuminfo";
import QrCard from "./components/qr/qrcard";
import Download from "./components/img/download.svg";
import { axiosSecureAPI } from "../axios";
import { useParams } from "react-router-dom";

type Props = {};

const Title = () => {
  const { id } = useParams();

  const [isDownloading, setIsDownloading] = React.useState(false);

  const downloadList = async () => {
    setIsDownloading(true);
    try {
      const response = await axiosSecureAPI.get(
        `/excel/guests/${id}/download`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "download.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      alert("다운로드에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="font-bold text-left text-ptitle text-system-white mb-30px">
        예매자 관리하기
      </div>
      <button
        onClick={downloadList}
        className="flex flex-row items-center px-1 py-1 mb-30px border-primary border-1px rounded-xl"
      >
        <div className="ml-2 text-md font-normal text-center text-primary">
          {isDownloading ? `다운로드 중` : `예매자 명단`}
        </div>
        <img src={Download} alt="download" className="w-6 h-6 mx-1" />
      </button>
    </div>
  );
};

const Manage = (props: Props) => {
  return (
    <div className="flex flex-col justify-start min-h-screen p-4 bg-system-background">
      <Nav />
      <BackButton />
      <Title />
      <QrCard />
      <TicketNumInfo />
      <Guest />
    </div>
  );
};

export default Manage;
