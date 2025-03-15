import { useEffect, useState } from "react";

const LogList = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/logs") 
      .then((res) => res.json())
      .then((data) => {
        console.log("📌 Logs received:", data);
        setLogs(data);
      })
      .catch((err) => console.error("❌ Error fetching logs:", err));
  }, []);

  const deleteLog = async (id) => {
    await fetch(`http://localhost:5000/logs/${id}`, { method: "DELETE" });
    setLogs(logs.filter((log) => log._id !== id));
  };

  return (
    <div>
      <h2>Travel Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        logs.map((log) => (
          <div key={log._id} className="log-card">
            <h3>{log.title}</h3>
            <p>{log.description}</p>
            <p>{new Date(log.date).toDateString()}</p>
            <button onClick={() => deleteLog(log._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default LogList;
