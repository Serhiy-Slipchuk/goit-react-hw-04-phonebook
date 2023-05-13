import css from './ContactsList.module.scss';
import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';

const ContactsList = function ({ contactsFiltered, contactToDelete }) {
  return (
    <>
      <ul className={css.contactsList}>
        {contactsFiltered().map(({ id, name, number }) => {
          return (
            <ContactItem
              key={id}
              name={name}
              number={number}
              id={id}
              contactToDelete={contactToDelete}
            />
          );
        })}
      </ul>
    </>
  );
};

ContactsList.propTypes = {
  contactsFiltered: PropTypes.func.isRequired,
  contactToDelete: PropTypes.func.isRequired,
};

export default ContactsList;
