import Modal from 'react-modal';
type Props = {
    commentId: number;
    deleteComment: () => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    closeModal: () => void;
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


const DeleteModal = (props: Props) => {
    const {deleteComment,isOpen, closeModal} = props;
    const onClick = () => {
        deleteComment();
        closeModal();
    }
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => closeModal()}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={true}
      >
        <div className="flex flex-col bg-gray-4 items-center justify-center w-full h-full px-4">
          <div className='text-plg text-system-white mb-30px'>
            댓글을 삭제하시겠어요?
          </div>
          <div className="bg-primary text-center text-400 text-white text-plg w-full py-3 rounded-lg mb-10px" onClick={onClick}>
            삭제하기
          </div>
          <div className='text-center text-psm text-gray-2 mt-10px underline' onClick={()=>closeModal()}>
            취소하기
          </div>
          
        </div>
      </Modal>)
}

export default DeleteModal