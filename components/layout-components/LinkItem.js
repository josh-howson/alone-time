import styles from './LinkItem.module.scss';
import Link from 'next/link';

/**
 * You put LinkItems in a LinkList
 * @param {*} props 
 */
const LinkItem = (props) => {
  const className = [
    styles.list,
    props.className
  ].filter(i => !!i).join(' ');

  return (
    <li className={styles.item}>
      <Link href={props.href}>
        <a>
          {props.children}
        </a>
      </Link>
    </li>
  )
}

LinkItem.defaultProps = {
}

export default LinkItem;



