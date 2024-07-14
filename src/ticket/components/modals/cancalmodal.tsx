import Modal from 'react-modal';
import store from '../../../store/store';
type Props = {
    isOpen: boolean;
    cancelPromotion: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "240px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      backgroundColor: "rgba(42,42,42)",
      borderColor: "rgba(42,42,42)",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      justifyContent: "center",
      overflow: "auto",
    },
  };


const CancelModal = (props: Props) => {
    const {cancelPromotion,isOpen, setIsOpen} = props;
    const onClick = () => {
        cancelPromotion();
        setIsOpen(false);
    }
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={true}
      >
        <div className="flex flex-col bg-gray-4 items-center justify-center w-full h-full px-4">
          <div className='text-plg text-system-white'>
            예매자 정보와 공연 정보가 삭제됩니다.
          </div>
           <div className='text-plg text-system-white mb-30px'>정말로 공연을 삭제하시겠어요?</div>
          <div className="bg-system-error text-center text-400 text-white text-plg w-full py-3 rounded-lg mb-10px" onClick={onClick}>
            삭제하기
          </div>
          <div className='text-center text-psm text-gray-2 mt-10px underline' onClick={()=>setIsOpen(false)}>
            취소하기
          </div>
          
        </div>
      </Modal>)
}

export default CancelModal