import React, { useState } from 'react';
import styles from './page.module.css';
import cn from 'classnames';

import Loader from '../loader';

const Page = ({ children, loaded, header }) => {
  const [scrolled, setScrolled] = useState(false);

  const headerContent = header ? (
    <div className={cn({[styles.header]: true, [styles.scrolled]: scrolled})}>{header}</div>
  ) : null;
  const onScrollHandler = (event) => {
    setScrolled(!!event.target.scrollTop);
  };

  const content = loaded ? (
    <div className={styles.content}>
      {headerContent}
      {children}
    </div>
  ) : (
    <Loader />
  );


  return (
    <div
      onScroll={onScrollHandler}
      className={cn({
        [styles.container]: loaded,
        [styles.loadedContainer]: !loaded,
      })}
    >
      {content}
    </div>
  );
};

export default Page;
