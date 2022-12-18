import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { Box } from './App.styled';
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

  handlePhonebook = data => {
    const newContact = { id: nanoid(), ...data };

    this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(`${data.name} is already in contacts.`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilter = evt => {
    this.setState({ filter: evt.target.value })
  };

  handleFilter = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    
  }

  render() {
    return (
      <Box>
        <h1>Phonebook</h1>
        <Phonebook onSubmit={this.handlePhonebook} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onFilter} />
        <Contacts
          contactList={this.handleFilter()}
          onDelete={this.handleDelete}
        />
      </Box>
    );
  }
}

