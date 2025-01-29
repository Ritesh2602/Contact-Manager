import React, { useState, useEffect } from "react";
import { Header } from "./Components/Header";
import { ContactList } from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Components/App.css";
import "semantic-ui-css/semantic.min.css";
import { ContactDetails } from "./Components/ContactDetails";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);

  // Adding new contact handler
  const addContactHandler = (contact) => {
    const newContacts = [...contacts, { id: uuid(), ...contact }];
    setContacts(newContacts);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // Retrieving contacts from localStorage on initial load
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(retriveContacts); // Check if data is retrieved
    if (retriveContacts) setContacts(retriveContacts);
  }, []); // Empty dependency array, only runs once on mount

  // Saving contacts to localStorage whenever contacts change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]); // Runs whenever contacts array changes

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            Component={() => (
              <ContactList
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          ></Route>
          <Route
            path="/add"
            Component={() => (
              <AddContact addContactHandler={addContactHandler} />
            )}
          ></Route>

          <Route
            path="/contact/:id"
            Component={ContactDetails}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

{
  /* <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */
}
