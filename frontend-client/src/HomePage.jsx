import React, { useState, useEffect } from "react";
import axios from "axios";

async function fetchValues() {
  const res = await axios.get("/api/values/current");
  return res.data;
}

async function fetchSeenIndexes() {
  const res = await axios.get("/api/values/all");
  return res.data;
}

async function createValue(value) {
  await axios.post("/api/values", { index: value });
}

function renderCalculatedValues(values) {
  const result = [];

  for (let key in values) {
    result.push(
      <div key={key}>
        <p>
          For index {key} I calculated {values[key]}
        </p>
      </div>
    );
  }

  return result;
}

function renderSeenIndexes(seenIndexes) {
  return seenIndexes.map(({ number }) => number).join(", ");
}

export function HomePage() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    async function fetchData() {
      setValues(await fetchValues());
      setSeenIndexes(await fetchSeenIndexes());
    }

    fetchData();
  }, []);

  const handleSubmit = async () => {
    await createValue(index);
    setIndex("");
  };

  return (
    <div>
      <div>
        <label>Enter your index:</label>
        <input
          type="text"
          onChange={(event) => setIndex(event.target.value)}
          value={index}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <h3>Indexes I have seen:</h3>
      <div>{renderSeenIndexes(seenIndexes)}</div>
      <h3>Calculated values:</h3>
      <div>{renderCalculatedValues(values)}</div>
    </div>
  );
}
