import { Component } from 'react';
import { nanoid } from 'nanoid';

import MyContactsForm from './MyContactsForm/MyContactsForm';
import MyContactList from './MyContactsList/MyContactsList';
import MyContactsFind from './MyContactsFind/MyContactsFind';

import css from './MyContacts.module.css';

class MyContacts extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      //the same as contacts && contacts.length
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      alert(`${name} is already exist`);
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  handleFind = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFind = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFind);
    });

    return result;
  }

  render() {
    const { addContact, removeContact, handleFind } = this;
    const peoples = this.getFilteredContacts();
    const isContacts = Boolean(peoples.length);

    return (
      <div className={css.wrapper}>
        <div className={css.block}>
          <h3 className={css.title}>Phonebook</h3>
          <MyContactsForm onSubmit={addContact} />
        </div>

        <div className={css.block}>
          <h3 className={css.title}>Contacts</h3>
          <MyContactsFind handleChange={handleFind} />
          {isContacts && (
            <MyContactList removeContact={removeContact} contacts={peoples} />
          )}
          {!isContacts && <p>No contacts in the list</p>}
          <MyContactList removeContact={removeContact} />
        </div>
      </div>
    );
  }
}

export default MyContacts;
