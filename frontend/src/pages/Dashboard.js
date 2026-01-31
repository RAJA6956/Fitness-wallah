
import { useEffect, useState } from "react";
import API from "../services/api";
import GymMap from "../components/GymMap";

function Dashboard() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    API.get("/progress")
      .then(res => setProgress(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      
      {/* GYM MAP SECTION */}
      <div style={{ width: "100%", marginBottom: "40px" }}>
        <h2>Nearby Gyms</h2>
        <div style={{ width: "100%", height: "400px" }}>
          <GymMap />
        </div>
      </div>

      {/* PROGRESS SECTION */}
      <div>
        <h2>Your Fitness Progress</h2>

        {progress.length === 0 && <p>No progress recorded yet.</p>}

        {progress.map(p => (
          <div
            key={p._id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px"
            }}
          >
            <p><strong>Pull-ups:</strong> {p.pullUps}</p>
            <p><strong>Push-ups:</strong> {p.pushUps}</p>
            <p><strong>Weight:</strong> {p.weightLifted} kg</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
