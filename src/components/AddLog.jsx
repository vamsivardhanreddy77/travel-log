import { useState } from "react";

const AddLog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addLog = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      window.location.reload(); 
    } else {
      console.error("❌ Error adding log");
    }
  };

  return (
    <form onSubmit={addLog}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Log</button>
    </form>
  );
};

export default AddLog;
