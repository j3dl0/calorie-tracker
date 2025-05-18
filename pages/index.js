import { useState, useEffect } from 'react';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFood, setEditFood] = useState('');
  const [editCalories, setEditCalories] = useState('');

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

async function updateEntry(id) {
  try {
    const res = await fetch(`/api/entries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food: editFood, calories: parseInt(editCalories) }),
    });

    const result = await res.json();
    console.log('Update result:', result);

    if (!res.ok) {
      alert(`Failed to update: ${result.error}`);
      return;
    }

    setEditingId(null);
    fetchEntries();
  } catch (err) {
    console.error('Update request failed:', err);
  }
}


  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  return (
    <main style={{ padding: 20 }}>
      <h1>🥗 Calorie Tracker</h1>
      <form onSubmit={addEntry}>
        <input value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food" required />
        <input value={calories} onChange={(e) => setCalories(e.target.value)} type="number" placeholder="Calories" required />
        <button type="submit">Add</button>
      </form>

      <h2>Total Calories: {totalCalories}</h2>

      <ul>
        {entries.map((e) => (
          <li key={e._id}>
            {editingId === e._id ? (
              <>
                <input value={editFood} onChange={(e) => setEditFood(e.target.value)} />
                <input type="number" value={editCalories} onChange={(e) => setEditCalories(e.target.value)} />
                <button onClick={() => updateEntry(e._id)}>✅</button>
                <button onClick={() => setEditingId(null)}>❌</button>
              </>
            ) : (
              <>
                {e.food} - {e.calories} cal
                <button onClick={() => {
                  setEditingId(e._id);
                  setEditFood(e.food);
                  setEditCalories(e.calories);
                }}>✏️</button>
                <button onClick={() => deleteEntry(e._id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
