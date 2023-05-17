import css from './App.module.scss';
import React, { useEffect, useState } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

const App = function () {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const getFilteredContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handlerFilterInputChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getExistNames = () => {
    return contacts.map(name => name);
  };

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

        <ContactsForm addContact={addContact} existNames={getExistNames} />

        <h2 className={css.heading}>Contacts</h2>

        <Filter filter={filter} onChangeFilter={handlerFilterInputChange} />

        <ContactsList
          contactsFiltered={getFilteredContacts}
          contactToDelete={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
