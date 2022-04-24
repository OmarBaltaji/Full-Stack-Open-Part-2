import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import FormPerson from './components/FormPerson';
import axios from 'axios';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterText, setFilterText] = useState('');
 
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data);
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
    if(foundPerson) {
      alert(`${newName} is already added to phonebook`);
      return null;
    }
    axios.post('http://localhost:3001/persons', newPersonObject).then(res => {
      setPersons(persons.concat(res.data));

      const newPersonNameWithNumber = res.data.name.toLowerCase() + ' ' + res.data.number;

      if(filterText && newPersonNameWithNumber.includes(filterText)) {
        setFilteredPersons(filteredPersons.concat(res.data));
      }
    }); 
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
      </div>)
    : persons.map(person => 
      <div key={person.id}>
        {person.name} {person.number}
      </div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} onChange={handleSearchOnChange} />
      <h2>Add a new</h2>
      <FormPerson onSubmit={handleOnSubmit} newName={newName} newNumber={newNumber} onChange={handleOnChange} />
      <h2>Numbers</h2>
      <Persons persons={showAllOrFiltered()} />
    </div>
  );
}

export default App;
