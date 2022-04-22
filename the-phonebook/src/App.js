import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterText, setFilterText] = useState('');
 
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

    setPersons(persons.concat(newPersonObject));

    const newPersonNameWithNumber = newPersonObject.name.toLowerCase() + ' ' + newPersonObject.number;

    if(filterText && newPersonNameWithNumber.includes(filterText)) {
      setFilteredPersons(filteredPersons.concat(newPersonObject));
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
      <div>
        <span>filter shown with </span>
        <input value={filterText} onChange={handleSearchOnChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input value={newName} onChange={(event) => handleOnChange(event, 'name')} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => handleOnChange(event, 'number')} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>
        {showAllOrFiltered()}
      </div>
    </div>
  );
}

export default App;
