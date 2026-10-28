import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const DisplayVotes = ({ votes }) => <div>has: {votes || 0} votes</div>;

const Anecdote = ({ title, anecdote, selected, votes }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{anecdote}</p>
      <DisplayVotes votes={votes[selected]} />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const handleVote = () => {
    if (votes[selected]) {
      setVotes({ ...votes, [selected]: votes[selected] + 1 });
    } else {
      setVotes({ ...votes, [selected]: 1 });
    }
  };

  const topAnecdoteIndex = Object.keys(votes).reduce(
    (a, b) => (votes[a] > votes[b] ? a : b),
    0,
  );

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        selected={selected}
        votes={votes}
      />
      <Button onClick={handleVote} text="vote" />
      <Button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
        text="next anecdote"
      />

      <Anecdote
        title="Anecdote with most votes"
        anecdote={anecdotes[topAnecdoteIndex]}
        selected={topAnecdoteIndex}
        votes={votes}
      />
    </div>
  );
};

export default App;
