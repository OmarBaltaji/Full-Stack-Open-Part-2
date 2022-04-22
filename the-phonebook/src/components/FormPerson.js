const FormPerson = (props) =>  (
    <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.newName} onChange={(event) => props.onChange(event, 'name')} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={(event) => props.onChange(event, 'number')} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default FormPerson;