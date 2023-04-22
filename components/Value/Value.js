import React from "react";
import styles from "./Value.module.css";
import Flexible from "./icons/Flexible";
import Holidays from "./icons/Holidays";
import Medical from "./icons/Medical";
import Patient from "./icons/Patient";
import Salary from "./icons/Salary";
import Growth from "./icons/Growth";
import { list } from "./list";

function ValuesList() {
  return (
    <div className={styles.container}>
      {list.map((item) => (
        <Value
          key={item.header}
          Icon={item.icon}
          header={item.header}
          description={item.description}
        />
      ))}
      ;
    </div>
  );
}

export function Value({ Icon, header, description }) {
  const SvgIconsNames = {
    Salary: Salary,
    Patient: Patient,
    Medical: Medical,
    Holidays: Holidays,
    Growth: Growth,
    Flexible: Flexible,
  };
  const SvgIcon = SvgIconsNames[Icon];
  return (
    <div className={styles.valueContainer}>
      <SvgIcon />
      <h4 className={styles.valueHeader}>{header}</h4>
      <p className={styles.valueDescription}>{description}</p>
    </div>
  );
}

export default ValuesList;
