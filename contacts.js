const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const chalk = require('chalk');

const contactsPath = path.join(__dirname, '/db/contacts.json');

const readContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(result);

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

async function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const contactIdFilter = contacts.filter(
    contact => String(contact.id) === contactId,
  );

  return contactIdFilter;
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();

    const contactIdFilter = contacts.filter(
      contact => String(contact.id) !== contactId,
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactIdFilter));

    return contactIdFilter;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
