import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import FormPerson from './components/FormPerson';
import personsService from './services/persons';
import './index.css'
import Feedback from './components/Feedback';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [feedbackType, setFeedbackType] = useState('');
 
  useEffect(() => {
    personsService.getAll().then(personsList => {
      setPersons(personsList);
    });
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPersonObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    if(newName) {
      setNewName('');
    }
    if(newNumber) {
      setNewNumber('');
    }

    const foundPerson = persons.find(person => person.name === newName);
    const newPersonNameWithNumber = newPersonObject.name.toLowerCase() + ' ' + newPersonObject.number;

    if(foundPerson) {
      if(window.confirm(`${foundPerson.name} is already added to phonebook, replace old number with a new one?`)) {
        personsService.update(foundPerson.id, newPersonObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson));
      
          if(filterText && newPersonNameWithNumber.includes(filterText)) {
            setFilteredPersons(filteredPersons.map(person => person.id !== foundPerson.id ? person : returnedPerson));
          }

          setFeedbackMessage(`Updated the number of ${foundPerson.name}`);
          setFeedbackType('success');
          setTimeout(() => setFeedbackMessage(null), 5000);
        }).catch(error => {
          setFeedbackMessage(`Information of ${foundPerson.name} has already been removed from server`);
          setFeedbackType('error');
          setTimeout(() => setFeedbackMessage(null), 5000);
        });
      }
    } else {
      personsService.create(newPersonObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
    
        if(filterText && newPersonNameWithNumber.includes(filterText)) {
          setFilteredPersons(filteredPersons.concat(returnedPerson));
        }

        setFeedbackMessage(`Added ${returnedPerson.name}`);
        setFeedbackType('success');
        setTimeout(() => setFeedbackMessage(null), 5000);
      });
    } 
  }

  const handleOnChange = (event, source) => {
    switch(source) {
      case 'name':
        setNewName(event.target.value);
        break;
      case 'number':
        setNewNumber(event.target.value);
        break;
      default:
        break;
    }
  }

  const handleSearchOnChange = (event) => {
    const filterTextToLowerCase = event.target.value.toLowerCase(); 
    console.log(filterTextToLowerCase);
    setFilterText(filterTextToLowerCase);
    const filteredArray = persons.filter(person => {
      let personName = person.name.toLowerCase();
      let personNameWithNumber = personName + ' ' + person.number;
      return personNameWithNumber.includes(filterTextToLowerCase);
    });
    setFilteredPersons(filteredArray);
  }

  const showAllOrFiltered = () => {
    return filterText ? filteredPersons.map(person => 
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onDeleteHandler(person)}>delete</button>
      </div>)
    : persons.map(person => 
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onDeleteHandler(person)}>delete</button>
      </div>)
  }

  const onDeleteHandler = (selectedPerson) => {
    if(window.confirm(`Delete ${selectedPerson.name}`)) {
      personsService.deletePerson(selectedPerson.id).then(status => {
        if(status === 200) {
          setFilteredPersons(filteredPersons.filter(person => person.id !== selectedPerson.id));
          setPersons(persons.filter(person => person.id !== selectedPerson.id));
        }
      });
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Feedback type={feedbackType} message={feedbackMessage} />
      <Filter filterText={filterText} onChange={handleSearchOnChange} />
      <h2>Add a new</h2>
      <FormPerson onSubmit={handleOnSubmit} newName={newName} newNumber={newNumber} onChange={handleOnChange} />
      <h2>Numbers</h2>
      <Persons persons={showAllOrFiltered()} />
    </div>
  );
}

export default App;
