import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newName
    };

    setNewName('');

    const foundPerson = persons.find(person => person.name === newName);
    if(foundPerson) {
      alert(`${newName} is already added to phonebook`);
      return null;
    }

    setPersons(persons.concat(newPersonObject));
  }

  const handleOnChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>{persons.map(person => <div key={person.name}>{person.name}</div>)}</div>
    </div>
  );
}

export default App;
