import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={image.urls.small} 
        alt={image.description || "Unsplash image"}
      />
    </div>
  );
};

export default ImageCard;