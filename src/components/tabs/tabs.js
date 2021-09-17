import { NavLink } from 'react-router-dom';

import styles from './tabs.module.css';

const Tabs = ({ items, displayProp }) => {
  if (!items.length) {
    return null;
  }

  const tabsItems = items.map((item) => (
    <NavLink
      to={item.route}
      key={item[displayProp]}
      title={item[displayProp]}
      className={styles.tab}
      activeClassName={styles.active}
    >
      <div className={styles.tab_text}>{item[displayProp]}</div>
    </NavLink>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.tab_container}>{tabsItems}</div>
    </div>
  );
};

export default Tabs;
