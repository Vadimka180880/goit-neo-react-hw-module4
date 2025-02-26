import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && (
        <div>
          <img src={image.urls.regular} alt={image.alt_description} />
          <p>Author: {image.user.name}</p>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
