import css from './App.module.scss';
import React from 'react';
import { Component } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if(localContacts) {
      this.setState({contacts: localContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {contacts} = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  deleteContact = id => {
    this.setState(prevState => ({ contacts: prevState.contacts.filter(contact => contact.id !== id)}));
  };

  handlerInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getExistNames = () => {
    return this.state.contacts.map(({ name }) => name);
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <div className={css.phonebookThumb}>
          <h1 className={css.title}>Phonebook</h1>

          <ContactsForm
            addContact={this.addContact}
            existNames={this.getExistNames}
          />

          <h2 className={css.heading}>Contacts</h2>

          <Filter
            filter={this.state.filter}
            onChangeFilter={this.handlerInputChange}
          />

          <ContactsList
            contactsFiltered={this.getFilteredContacts}
            contactToDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
