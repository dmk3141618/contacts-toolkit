import React, {useCallback, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Button from '~/common/component/Button';
import Icon from '~/common/component/Icon';
import Dialog from '~/common/component/Dialog';
import DialogFull from '~/common/component/DialogFull';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '~/common/store';
import {
  addOneContact,
  removeOneContact,
  selectAllOrFavoriteContacts,
  updateOneContact,
} from '~/common/state/contacts';
import {v1 as uuidv1} from 'uuid';
import {IContact} from '~/typings/db';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-height: 40rem;
  min-width: 420px;
`;

const AppBlock = styled.div`
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
  min-width: 400px;
`;

const Title = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .title {
    margin-left: 2rem;
    font-size: 2rem;
    font-weight: 500;
    color: ${props => props.theme.color.deepBlue};
  }
`;

const Controls = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .controlInfosWrap {
    height: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .controlTotal {
      margin-left: 1.5rem;
      font-size: 1.3rem;
      label {
        color: ${props => props.theme.color.grayBase};
      }
      span {
        margin-left: 5px;
      }
    }

    .controlSortBy {
      margin-left: 1.5rem;
      font-size: 1.3rem;
      label {
        color: ${props => props.theme.color.grayBase};
      }
      span {
        margin-left: 5px;
      }
    }

    .controlFavorites {
      margin-left: 1.5rem;
      font-size: 1.3rem;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      .iconWrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        .icon {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
      .text {
        margin-left: 5px;
        color: ${props => props.theme.color.grayLight};
      }
      &.active {
        .text {
          color: ${props => props.theme.color.grayBlack};
        }
      }
      &:hover {
        .text {
          color: ${props => props.theme.color.grayBase};
        }
      }
    }
  }

  .controlBtnsWrap {
    height: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    & > * {
      margin-right: 1rem;
    }
  }
`;

const ContactListWrap = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
const ContactList = styled.ul`
  width: 100%;
`;
const ContactListItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .listItemContent {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    .listItemContentFieldsWrap {
      height: 100%;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 5px;
      & > * + * {
        margin-left: 1.2rem;
      }

      ${props => props.theme.media.desktop} {
      }
      ${props => props.theme.media.tablet} {
      }
      ${props => props.theme.media.phone} {
        flex: 1 0 100%;
      }
      .listItemContentField {
        font-size: 1.5rem;
        > label {
          color: ${props => props.theme.color.grayBase};
        }
        > span {
          margin-left: 5px;
        }
      }
    }
    .listItemBtnsWrap {
      height: 100%;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 5px;
      & > * + * {
        margin-left: 0.5rem;
      }
      .favorite {
        cursor: pointer;
      }
    }
  }
`;
const ContactListEmpty = styled.div`
  width: 100%;
  padding: 2rem;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .emptyTitle {
    font-size: 2.5rem;
    color: ${props => props.theme.color.grayDark};
  }
  .emptyText {
    font-size: 2rem;
    margin-top: 2rem;
    color: ${props => props.theme.color.grayLight};
  }
`;

const ContactForm = styled.div`
  padding: 1rem;
  .field {
    padding: 1rem;
    label {
      display: block;
      color: ${props => props.theme.color.grayBase};
    }
    input {
      display: block;
      padding: 7px 10px;
      width: 100%;
      max-width: 700px;
      margin-top: 5px;
    }
    .error {
      color: ${props => props.theme.color.error};
      margin-top: 5px;
    }
  }
`;

interface ContactFormValuesType {
  name: string;
  email: string;
  phone?: string;
}

type Props = RouteComponentProps;
function ContactsPage({}: Props) {
  const dispatch = useAppDispatch();

  // contactForm title (add or edit)
  const [contactFormTitle, setContactFormTitle] = useState<string>('Add a new contact');

  // filter
  const [isShowOnlyFavorites, setIsShowOnlyFavorites] = useState<boolean>(false);
  const onShowOnlyFavoritesToggle = useCallback(() => {
    setIsShowOnlyFavorites(prev => !prev);
  }, []);

  // const contacts = useSelector((state: RootState) => selectAllContacts(state));
  // const contactsFavorite = useSelector((state: RootState) => selectFavoriteContacts(state));
  const contacts = useSelector((state: RootState) =>
    selectAllOrFavoriteContacts(state, isShowOnlyFavorites),
  );

  // delete
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false);
  const onClickDeleteConfirm = useCallback(
    (contact: IContact) => () => {
      setSelectedContact(contact);
      setShowDeleteConfirmDialog(true);
    },
    [],
  );
  const onConfirmDeleteConfirm = useCallback(() => {
    if (selectedContact) {
      dispatch(removeOneContact(selectedContact.id));
    }
    setSelectedContact(null);
    setShowDeleteConfirmDialog(false);
  }, [dispatch, selectedContact]);
  const onCancelDeleteConfirm = useCallback(() => {
    setSelectedContact(null);
    setShowDeleteConfirmDialog(false);
  }, []);

  // create
  const contactForm = useRef<HTMLFormElement>(null);
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
    reset: resetContactForm,
    setValue: setValueContactForm,
  } = useForm<ContactFormValuesType>({
    resolver: yupResolver(contactFormValidation),
    mode: 'onBlur',
  });
  const [showContactFormDialog, setShowContactFormDialog] = useState<boolean>(false);
  const onClickAddContactForm = useCallback(() => {
    setContactFormTitle('Add a new contact');
    setShowContactFormDialog(true);
  }, []);
  const onConfirmContactForm = useCallback(() => {
    contactForm.current?.requestSubmit();
  }, []);
  const onCancelContactForm = useCallback(() => {
    setShowContactFormDialog(false);
    setSelectedContact(null);
    resetContactForm();
  }, [resetContactForm]);
  const onSubmitContactForm = handleSubmit((data: ContactFormValuesType) => {
    if (selectedContact) {
      const contact: IContact = {
        id: selectedContact.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        isFavorite: selectedContact.isFavorite,
      };
      dispatch(updateOneContact(contact));
    } else {
      const contact: IContact = {
        id: uuidv1(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        isFavorite: false,
      };
      dispatch(addOneContact(contact));
    }
    setShowContactFormDialog(false);
    setSelectedContact(null);
    resetContactForm();
  });

  // edit
  const onClickEditContactForm = useCallback(
    (contact: IContact) => () => {
      setContactFormTitle('Edit a contact');
      setSelectedContact(contact);
      setValueContactForm('name', contact.name);
      setValueContactForm('email', contact.email);
      setValueContactForm('phone', contact.phone);
      setShowContactFormDialog(true);
    },
    [setValueContactForm],
  );

  // favorite
  const onContactFavoriteToggle = useCallback(
    (contact: IContact) => () => {
      dispatch(updateOneContact({...contact, isFavorite: !contact.isFavorite}));
    },
    [dispatch],
  );

  return (
    <PageWrap>
      <AppBlock>
        <Title>
          <div className="title">Contacts</div>
        </Title>
        <Controls>
          <div className="controlInfosWrap">
            <div className="controlTotal">
              <label>Total</label>
              <span>{contacts.length}</span>
            </div>
            {/*<div className="controlSortBy">*/}
            {/*  <label>Sort By</label>*/}
            {/*  <span>created</span>*/}
            {/*</div>*/}
            {!!isShowOnlyFavorites && (
              <div className="controlFavorites active" onClick={onShowOnlyFavoritesToggle}>
                <div className="iconWrap">
                  <Icon className="icon" icon={'heartFill'} />
                </div>
                <div className="text">Show Only Favorites</div>
              </div>
            )}
            {!isShowOnlyFavorites && (
              <div className="controlFavorites" onClick={onShowOnlyFavoritesToggle}>
                <div className="iconWrap">
                  <Icon className="icon" icon={'heartBlank'} />
                </div>
                <div className="text">Show Only Favorites</div>
              </div>
            )}
          </div>
          <div className="controlBtnsWrap">
            <Button size={'medium'} onClick={onClickAddContactForm}>
              Add Contact
            </Button>
          </div>
        </Controls>
        <ContactListWrap>
          {!!contacts.length && (
            <ContactList>
              {contacts.map(item => (
                <ContactListItem key={item.id}>
                  <div className="listItemContent">
                    <div className="listItemContentFieldsWrap">
                      <div className="listItemContentField">
                        <label>name</label>
                        <span>{item.name}</span>
                      </div>
                      <div className="listItemContentField">
                        <label>email</label>
                        <span>{item.email}</span>
                      </div>
                      {!!item?.phone && (
                        <div className="listItemContentField">
                          <label>phone</label>
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="listItemBtnsWrap">
                      <Button size={'small'} outline={true} onClick={onClickEditContactForm(item)}>
                        Edit
                      </Button>
                      <Button size={'small'} outline={true} onClick={onClickDeleteConfirm(item)}>
                        Delete
                      </Button>
                      <div className="favorite">
                        {item.isFavorite ? (
                          <Icon icon={'heartFill'} onClick={onContactFavoriteToggle(item)} />
                        ) : (
                          <Icon icon={'heartBlank'} onClick={onContactFavoriteToggle(item)} />
                        )}
                      </div>
                    </div>
                  </div>
                </ContactListItem>
              ))}
            </ContactList>
          )}
          {!contacts.length && (
            <ContactListEmpty>
              <div className="emptyTitle">No Contact</div>
              <div className="emptyText">Will you add a new contact?</div>
            </ContactListEmpty>
          )}
        </ContactListWrap>
      </AppBlock>
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
        title={contactFormTitle}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={onConfirmContactForm}
        onCancel={onCancelContactForm}
        visible={showContactFormDialog}
      >
        <ContactForm>
          <form ref={contactForm} onSubmit={onSubmitContactForm}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" {...register('name')} autoComplete="off" />
              <div className="error">{errors.name?.message}</div>
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" {...register('email')} autoComplete="off" />
              <div className="error">{errors.email?.message}</div>
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" {...register('phone')} autoComplete="off" />
              <div className="error">{errors.phone?.message}</div>
            </div>
          </form>
        </ContactForm>
      </DialogFull>
    </PageWrap>
  );
}

export default React.memo(ContactsPage);
