import styles from "./ChatRecord.module.scss";
import  Image from "./Image";
import Typewriter from './Typewriter'

export default function ChatRecord({ chatRecords = [], data = {} }) {
  return (
    <div className={styles["chat-content"]}>
      {chatRecords.map((item, index) => (
        <div
          className={
            item.role == "assistant" ? `${styles['item-left']} ${styles.item}` : `${styles['item-right']} ${styles.item}`
          }
          key={index}
        >
          {item.role == "assistant" && (
              <Image
                src={data.avatar || "ai/photo1.png"}
                className={styles.avatar} 
                style={{ borderRadius: "50%" }}
              />
          )}

          <div className={styles.bubble}>
            {!item.content && <div className={styles.loading}></div>}
            { item.role == "user" && <span>{item.content}</span> }
            { item.role == "assistant" && <Typewriter text={item.content} /> }
          </div>

          {item.role == "user" && (
              <Image className={styles.avatar} src={"ai/photo1.png"} />
          )}
        </div>
      ))}
    </div>
  );
}
