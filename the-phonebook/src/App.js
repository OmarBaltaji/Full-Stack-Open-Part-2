import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPersonObject = {
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

  return (
    <div>
      <h2>Phonebook</h2>
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

      <div>{persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
    </div>
  );
}

export default App;
