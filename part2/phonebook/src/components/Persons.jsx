const Persons = ({ persons, onDelete }) =>
  persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id)}>delete</button>
    </div>
  ));

export default Persons;
