import { useState, useEffect } from 'react';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const res = await fetch('/api/entries');
    const data = await res.json();
    setEntries(data);
  }

  async function addEntry(e) {
    e.preventDefault();
    await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food, calories: parseInt(calories) }),
    });
    setFood('');
    setCalories('');
    fetchEntries();
  }

  async function deleteEntry(id) {
    await fetch(`/api/entries/${id}`, { method: 'DELETE' });
    fetchEntries();
  }

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  return (
    <main style={{ padding: 20 }}>
      <h1>Calorie Tracker</h1>
      <form onSubmit={addEntry}>
        <input value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food" required />
        <input value={calories} onChange={(e) => setCalories(e.target.value)} type="number" placeholder="Calories" required />
        <button type="submit">Add</button>
      </form>

      <h2>Total Calories: {totalCalories}</h2>

      <ul>
        {entries.map((e) => (
          <li key={e._id}>
            {e.food} - {e.calories} cal
            <button onClick={() => deleteEntry(e._id)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
