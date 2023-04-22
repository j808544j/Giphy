import ValuesList from "../Value/Value";
import styles from "./Careers.module.css";
import Image from "next/image";

const Careers = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Careers</h2>
      <p className={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed urna
        eget mauris ultricies finibus.
      </p>
      <button className={styles.button}>Browse Openings</button>
      <div className={styles.imgContainer}>
        <Image
          className={styles.img}
          src="/Image.png"
          alt="People there"
          width={481}
          height={501}
        />
        <Image
          className={styles.img}
          src="/Photo.jpg"
          alt="Careers photo"
          width={481}
          height={501}
        />
      </div>
      <button className={styles.buttonValues}>Values</button>
      <p className={styles.valueText}>Values that define us.</p>
      <ValuesList />
    </div>
  );
};

export default Careers;
