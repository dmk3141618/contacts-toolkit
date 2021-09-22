import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import styles from '~/pages/ContactsPage/ContactsPage.module.scss';
import Button from '~/common/component/Button';
import Icon from '~/common/component/Icon';

type Props = RouteComponentProps;
function ContactsPage({}: Props) {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.appBlock}>
        <div className={styles.titleWrap}>
          <div className={styles.title}>Contacts</div>
        </div>
        <div className={styles.controlsWrap}>
          <div className={styles.controlInfosWrap}>
            <div className={styles.controlTotal}>
              <label>Total</label>
              <span>1124</span>
            </div>
            <div className={styles.controlSortBy}>
              <label>Sort By</label>
              <span>created</span>
            </div>
            <div className={styles.controlFavorites}>
              <div className={styles.iconWrap}>
                <Icon className={styles.icon} icon={'heartBlank'} />
              </div>
              <div className={styles.text}>Show Only Favorites</div>
            </div>
          </div>
          <div className={styles.controlBtnsWrap}>
            <Button size={'medium'}>Add Contact</Button>
          </div>
        </div>
        <div className={styles.addFormWrap}>
          <div className={styles.addForm}>addForm</div>
        </div>
        <div className={styles.listWrap}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.listItemContent}>
                <div className={styles.listItemContentFieldsWrap}>
                  <div className={styles.listItemContentField}>
                    <label>name</label>
                    <span>Hong Gil Dong</span>
                  </div>
                  <div className={styles.listItemContentField}>
                    <label>phone</label>
                    <span>01012340987</span>
                  </div>
                  <div className={styles.listItemContentField}>
                    <label>email</label>
                    <span>test@gmail.com</span>
                  </div>
                </div>
                <div className={styles.listItemBtnsWrap}>
                  <Button size={'small'} outline={true}>
                    Edit
                  </Button>
                  <Button size={'small'} outline={true}>
                    Delete
                  </Button>
                  <div>
                    <Icon icon={'heartFill'} />
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.listItem}>
              <div className={styles.listItemContent}>
                <div className={styles.listItemContentFieldsWrap}>
                  <div className={styles.listItemContentField}>
                    <label>name</label>
                    <span>Hong Gil Dong</span>
                  </div>
                  <div className={styles.listItemContentField}>
                    <label>phone</label>
                    <span>01012340987</span>
                  </div>
                  <div className={styles.listItemContentField}>
                    <label>email</label>
                    <span>test@gmail.com</span>
                  </div>
                </div>
                <div className={styles.listItemBtnsWrap}>
                  <Button size={'small'} outline={true}>
                    Edit
                  </Button>
                  <Button size={'small'} outline={true}>
                    Delete
                  </Button>
                  <div>
                    <Icon icon={'heartFill'} />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ContactsPage);
