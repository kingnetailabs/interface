import styles from "./styles.module.scss"; // 引入 CSS 文件

const Title = ({ title }) => {
  return (
    <div className={styles["title-wrap"]}>
      <div className={`${styles.border} wow animate__slideInLeft`}></div>
      <div className={`${styles.title} wow animate__bounce`}>{title}</div>
      <div className={`${styles.border} wow animate__slideInRight`}></div>
    </div>
  );
};

export default Title;
