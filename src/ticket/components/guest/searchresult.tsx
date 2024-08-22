import React from "react";
import { GuestCardType } from "../../types";
import GuestCard from "./guestcard";
import StatusButton from "../buttons/statusbutton";
import DeleteTicketModal from "../modals/deleteticketmodal";
import Loading from "../../../common/loading";

type Props = {
  results: GuestCardType[];
  handleConfirmation: (guestId: number) => void;
  handleCancel: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGid: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

const GuestResult: React.FC<Props> = (props: Props) => {
  const result: GuestCardType[] = props.results;

  const { isOpen, setIsOpen, isLoading } = props;

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-5">
      {isLoading ? (
        <Loading
          isLoading={isLoading}
          text="예매자 정보를 불러오는 중입니다."
        />
      ) : result.length !== 0 ? (
        result.map((r) => {
          return (
            <div className="w-full">
              <GuestCard result={r} />
              <StatusButton
                status={r.reservationStatus}
                handleConfirmation={props.handleConfirmation}
                guestId={r.guestId}
                setIsOpen={setIsOpen}
                setGid={props.setGid}
              />
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center w-full h-200px">
          <p className="text-gray-3">예매자가 없습니다.</p>
        </div>
      )}
      <DeleteTicketModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deleteGuest={props.handleCancel}
      />
    </div>
  );
};

export default GuestResult;
