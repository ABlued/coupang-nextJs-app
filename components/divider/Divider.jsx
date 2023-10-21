import React from 'react';
import styles from './Divider.module.scss';

function Divider({ space = 22, color = '#ccc', ...restProps }) {
  const style = {
    maringTop: space,
    marginBottom: space,
    background: color,
  };
  return (
    <div className={styles.line} {...restProps} style={style}>
      Divider
    </div>
  );
}

export default Divider;
