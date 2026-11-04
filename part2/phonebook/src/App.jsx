import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const isExist = persons.find((p) => p.name === newName);
    if (isExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService.update(isExist.id, nameObject).then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id === isExist.id ? updatedPerson : p)),
          );
          resetForm();
          showNotification(`Updated ${nameObject.name}`, "success");
        });
      }
      return;
    }
    personService.create(nameObject).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      resetForm();
    });
    showNotification(`Added ${nameObject.name}`, "success");
  };

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      const currentPerson = persons.find((person) => person.id === id);
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          showNotification(
            `Information of ${currentPerson.name} has already been removed from server`,
            "error",
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Filter filter={searchTerm} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>

      <Persons persons={filteredPersons} onDelete={onDelete} />
    </div>
  );
};

export default App;
