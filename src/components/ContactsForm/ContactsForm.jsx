import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactsForm.module.scss';
import PropTypes from 'prop-types';

const ContactsForm = function ({ addContact, existNames }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerInputChange = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    if (event.target.name === 'number') {
      setNumber(event.target.value);
    }
  };

  const handlerSubmitForm = event => {
    event.preventDefault();
    if (!existNames().includes(name)) {
      const newContact = {
        id: nanoid(5),
        name,
        number,
      };
      setName('');
      setNumber('');
      addContact(newContact);
    } else {
      window.alert(`${name} is already in contacts.`);
    }
  };

  return (
    <form className={css.form} onSubmit={handlerSubmitForm}>
      <label>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handlerInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Phone number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handlerInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactsForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  existNames: PropTypes.func.isRequired,
};

export default ContactsForm;
