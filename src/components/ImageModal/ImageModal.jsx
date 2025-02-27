import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose, onNext, onPrev }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true} 
      shouldCloseOnEsc={true}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalWrapper} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
          <img src={image.urls.regular} alt={image.description || "Unsplash image"} className={styles.image}/>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
          <p>Description: {image.description || "No description"}</p>
          <div className={styles.navigationButtons}>
            <button onClick={onPrev} className={styles.navButton}>Назад</button>
            <button onClick={onNext} className={styles.navButton}>Далі</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
