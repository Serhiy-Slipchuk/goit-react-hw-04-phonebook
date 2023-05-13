import css from './ContactItem.module.scss';
import PropTypes from 'prop-types';

const ContactItem = function ({ name, number, id, contactToDelete }) {
  return (
    <li className={css.contactItem}>
      <p className={css.contactText}>
        {name}
        <span className={css.phoneText}>{number}</span>
      </p>
      <button
        className={css.button}
        type="button"
        id={id}
        onClick={() => {
          contactToDelete(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  contactToDelete: PropTypes.func.isRequired,
};

export default ContactItem;
