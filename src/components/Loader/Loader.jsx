import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Oval height={50} width={50} color="blue" />
    </div>
  );
};

export default Loader;
