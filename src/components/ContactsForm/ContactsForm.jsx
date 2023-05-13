import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactsForm.module.scss';
import PropTypes from 'prop-types';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handlerInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlerSubmitForm = event => {
    event.preventDefault();
    if (!this.props.existNames().includes(this.state.name)) {
      const newContact = {
        id: nanoid(5),
        name: this.state.name,
        number: this.state.number,
      };
      this.setState({ name: '', number: '' });
      this.props.addContact(newContact);
    } else {
      window.alert(`${this.state.name} is already in contacts.`);
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handlerSubmitForm}>
        <label>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handlerInputChange}
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
            onChange={this.handlerInputChange}
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
  }
}

ContactsForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  existNames: PropTypes.func.isRequired,
};

export default ContactsForm;
