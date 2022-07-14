import React from 'react'
import styles from './InputElement.module.css'

type InputElementProps = {
    label: string;
    name: string;
}

const InputElement = ({label, name, ...rest}: InputElementProps) => {
  return (
    <div className={styles["inputWrapper"]}>
      <input className={styles["formInput"]} id={name} type="text" {...rest} />
      <label className={styles["formLabel"]} htmlFor={name}>
        Amount
      </label>
    </div>
  );
}

export default InputElement