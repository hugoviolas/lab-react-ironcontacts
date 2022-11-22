import "./App.css";
import { useState } from "react";
import allContacts from "./contacts.json";

function App() {
  const arr = allContacts.slice(5, 10);
  const [contacts, setContacts] = useState(arr);
  const handleAddContact = () => {
    const newContactsArray = [...contacts];
    newContactsArray.push(
      allContacts[Math.floor(Math.random() * allContacts.length)]
    );
    setContacts(newContactsArray);
  };
  const handleSortByName = () => {
    const sortedByName = [...contacts];
    sortedByName.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sortedByName);
  };
  const handleSortByRate = () => {
    const sortedByRate = [...contacts];
    sortedByRate.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return 1;
      } else if (a.popularity < b.popularity) {
        return -1;
      } else {
        return 0;
      }
    });
    setContacts(sortedByRate);
  };
  const handleDelete = (id) => {
    const copy = [...contacts];
    setContacts(
      copy.filter((contact) => {
        return contact.id !== id;
      })
    );
  };
  return (
    <div className="App">
      <button onClick={handleAddContact}>Add contact</button>
      <button onClick={handleSortByName}>Sort by name</button>
      <button onClick={handleSortByRate}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.name}>
                <td className="tablePicture">
                  <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                {contact.wonOscar && <td>🏆</td>}
                {contact.wonEmmy && <td>🏆</td>}
                <button
                  onClick={() => {
                    handleDelete(contact.id);
                  }}
                >
                  Delete
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
