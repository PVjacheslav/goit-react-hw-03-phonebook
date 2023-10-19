import { Item, List, Button } from "./ContactList.styled";

export const ContactList = ({ contacts, onCleaningContact }) => (
    <List>{contacts.map(contact => (
        <Item key={contact.id}>
            {contact.name + ':' + contact.number}
            {<Button
                type="button"
                name="delete"
                onClick={() => onCleaningContact(contact.id)}>
                delete</Button>}
        </Item>
    ))}
    </List>
);
