import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [exercise, setExercise] = useState("");
  const [musclegroup, setmusclegroup] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [newExercise, setNewExercise] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setExerciseList(response.data);
    });
  });

  const submitExercise = () => {
    Axios.post("http://localhost:3001/api/insert", {
      exercise: exercise,
      musclegroup: musclegroup,
      repetitions: repetitions,
    });

    setExerciseList([
      ...exerciseList,
      {
        exercise: exercise,
        musclegroup: musclegroup,
        repetitions: repetitions,
      },
    ]);
  };

  const deleteExercise = (exercise) => {
    Axios.delete(`http://localhost:3001/api/delete/${exercise}`);
  };

  const updateExercise = (ex) => {
    Axios.put("http://localhost:3001/api/update", {
      exercise: ex,
      musclegroup: newExercise,
    });
    setNewExercise("");
  };

  return (
    <div className="App">
      <h1>Workout Schema</h1>
      <div className="form">
        <label>Exercise Name:</label>
        <input
          type="text"
          name="exercise"
          onChange={(e) => {
            setExercise(e.target.value);
          }}
        />
        <label>Muscle groups:</label>
        <input
          type="text"
          name="musclegroup"
          onChange={(e) => {
            setmusclegroup(e.target.value);
          }}
        />
        <label>Number of repetitions:</label>
        <input
          type="text"
          name="repetitions"
          onChange={(e) => {
            setRepetitions(e.target.value);
          }}
        />
        <button className="addExBtn" onClick={submitExercise}>
          Submit
        </button>

        {exerciseList.map((val) => {
          return (
            <div className="card">
              <h1>{val.exercise}</h1> <p>{val.musclegroup}</p>{" "}
              <p>reps: {val.repetitions}</p>
              <button
                onClick={() => {
                  deleteExercise(val.exercise);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewExercise(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateExercise(val.exercise);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
