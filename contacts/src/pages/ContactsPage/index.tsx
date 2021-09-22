import React, {useCallback, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import styles from '~/pages/ContactsPage/ContactsPage.module.scss';
import Button from '~/common/component/Button';
import Icon from '~/common/component/Icon';
import Dialog from '~/common/component/Dialog';
import DialogFull from '~/common/component/DialogFull';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface ContactFormValuesType {
  name: string;
  email: string;
  phone: string;
}

type Props = RouteComponentProps;
function ContactsPage({}: Props) {
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false);
  const onClickDeleteConfirm = useCallback(() => {
    setShowDeleteConfirmDialog(true);
  }, []);
  const onConfirmDeleteConfirm = useCallback(() => {
    setShowDeleteConfirmDialog(false);
  }, []);
  const onCancelDeleteConfirm = useCallback(() => {
    setShowDeleteConfirmDialog(false);
  }, []);

  const contactForm = useRef<HTMLFormElement>(null);
  const [showContactFormDialog, setShowContactFormDialog] = useState<boolean>(false);
  const onClickContactForm = useCallback(() => {
    setShowContactFormDialog(true);
  }, []);
  const onConfirmContactForm = useCallback(() => {
    contactForm.current?.requestSubmit();
  }, []);
  const onCancelContactForm = useCallback(() => {
    setShowContactFormDialog(false);
  }, []);
  const contactFormValidation = yup.object().shape({
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    phone: yup.lazy(value =>
      value === ''
        ? yup.string()
        : yup
            .number()
            .typeError('Numbers only')
            .test('len', 'At least 10 digit', val => !val || val.toString().length >= 10)
            .test('len', 'Max 20 digit', val => !val || val.toString().length <= 20),
    ),
  });
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<ContactFormValuesType>({
    resolver: yupResolver(contactFormValidation),
    mode: 'onBlur',
  });
  const onSubmitContactForm = handleSubmit((data: ContactFormValuesType) => {
    console.log(data);
  });

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
            {/*<div className={styles.controlSortBy}>*/}
            {/*  <label>Sort By</label>*/}
            {/*  <span>created</span>*/}
            {/*</div>*/}
            <div className={styles.controlFavorites}>
              <div className={styles.iconWrap}>
                <Icon className={styles.icon} icon={'heartBlank'} />
              </div>
              <div className={styles.text}>Show Only Favorites</div>
            </div>
          </div>
          <div className={styles.controlBtnsWrap}>
            <Button size={'medium'} onClick={onClickContactForm}>
              Add Contact
            </Button>
          </div>
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
                    <label>email</label>
                    <span>test@gmail.com</span>
                  </div>
                  <div className={styles.listItemContentField}>
                    <label>phone</label>
                    <span>01012340987</span>
                  </div>
                </div>
                <div className={styles.listItemBtnsWrap}>
                  <Button size={'small'} outline={true}>
                    Edit
                  </Button>
                  <Button size={'small'} outline={true} onClick={onClickDeleteConfirm}>
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
                    <label>email</label>
                    <span>test@gmail.com</span>
                  </div>
                  <div className={styles.listItemContentField}>
                    <label>phone</label>
                    <span>01012340987</span>
                  </div>
                </div>
                <div className={styles.listItemBtnsWrap}>
                  <Button size={'small'} outline={true}>
                    Edit
                  </Button>
                  <Button size={'small'} outline={true} onClick={onClickDeleteConfirm}>
                    Delete
                  </Button>
                  <div>
                    <Icon icon={'heartFill'} />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className={styles.emptyWrap}>
            <div className={styles.emptyTitle}>No Contact</div>
            <div className={styles.emptyText}>Will you add a new contact?</div>
          </div>
        </div>
      </div>
      <Dialog
        title="Delete"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={onConfirmDeleteConfirm}
        onCancel={onCancelDeleteConfirm}
        visible={showDeleteConfirmDialog}
      >
        Are you sure to delete?
      </Dialog>
      <DialogFull
        title="Add new contact"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={onConfirmContactForm}
        onCancel={onCancelContactForm}
        visible={showContactFormDialog}
      >
        <div className={styles.contactFormWrap}>
          <div className={styles.contactForm}>
            <form ref={contactForm} onSubmit={onSubmitContactForm}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name')} autoComplete="off" />
                <div className={styles.error}>{errors.name?.message}</div>
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" {...register('email')} autoComplete="off" />
                <div className={styles.error}>{errors.email?.message}</div>
              </div>
              <div className={styles.field}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" {...register('phone')} autoComplete="off" />
                <div className={styles.error}>{errors.phone?.message}</div>
              </div>
            </form>
          </div>
        </div>
      </DialogFull>
    </div>
  );
}

export default React.memo(ContactsPage);
