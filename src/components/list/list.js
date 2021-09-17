import React from 'react';
import styles from './list.module.css';

import cn from 'classnames';

/**
 * Компонент списка
 */
const List = ({ items, itemTemplate, headerContent, keyProp, className }) => {
  if (!items?.length) {
    return <div className={styles.emptyView}>Нет данных :(</div>;
  }

  const rows = items.map((data) => (
    <div key={data[keyProp]} className={styles.item}>
      {itemTemplate({ data })}
    </div>
  ));

  const header = headerContent ? (<div className={styles.header}>{headerContent()}</div>) : null;

  return (
    <div className={cn(styles.container, className)}>
      {header}
      <div className={styles.itemsContainer}>{rows}</div>
    </div>
  );
};

export default List;
