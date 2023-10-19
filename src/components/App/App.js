import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container, SubTitle, Title } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

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

  // Збереження контактів в LokalStorage
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (contacts !== null) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      // Порівнюємо наявні контакти з попереднім обєктом контактів
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // Якщо контакти змінились зберігаємо в localStorage
    }
  }

  // Додавання нового контакта до списку контактів
  addContact = contact => {
    const onIsContact = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (onIsContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  // Зміна значення фільтра
  changeFilter = evt => {
    this.setState({ filter: evt.target.value.trim() });
  };

  // Отримання відфільтрованих контактів
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const renewedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(renewedFilter)
    );
  };

  // Видалення контакту зі списку
  cleaningContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm onAdd={this.addContact} />

        <SubTitle>Contacts</SubTitle>
        {this.state.contacts.length > 0 ? (
          // Фільтр для відмальовування контактів
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        ) : (
          <div>Your phonebook is empty. Add first contact!</div>
        )}
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onCleaningContact={this.cleaningContact}
          />
        )}
      </Container>
    );
  }
}
