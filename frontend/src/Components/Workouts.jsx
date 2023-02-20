import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sets from "./Sets";
import Workout from "./Workout";
import MyWorkouts from "./MyWorkouts";

function Workouts({ addClicked, setAddClicked, workouts, setWorkOuts, ex }) {
  const [setList, setSetList] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [listOfSets, setListOfSets] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  async function getExercises() {
    let response = await axios.get("new_exercise");
    let listExercises = response.data.exercises;
    console.log("response.data getExercises", response.data);
    setExercise(listExercises);
    setSetList(response.data.set_list);
  }

  useEffect(() => {
    getExercises();
    getWorkout();
  }, []);

  useEffect(() => {
    console.log("use Effect setList", setList);
  }, [setList]);

  async function saveWorkout(e) {
    let name = document.getElementById("workoutTitle").value;
    console.log(name);
    let response = await axios.post("save_workout/", { name: name });
    console.log(response);
    window.location.reload();
  }

  async function getWorkout() {
    let response = await axios.get("save_workout/");
    console.log(response.data);
    setWorkOuts(response.data.all_workouts);
  }

  const deleteWorkout = async (id) => {
    let response = await axios.delete(`delete_workout/${id}`);
    console.log("from deleteWorkout", response);
    window.location.reload();
  };

  const addSet = async () => {
    let response = await axios.post("save_set/", {
      id: ex.id,
      sets: 0,
      reps: 0,
      weight: "",
    });
    console.log("reponse addSet()", response);
    getExercises();
  };

  const deleteExercise = async (id) => {
    let response = await axios.delete(`delete_exercise/${id}`);
    console.log("from deleteSet", response);
    window.location.reload();
  };

  const createExercise = async (e) => {
    console.log(e);
    let response = await axios.post("new_exercise/", { name: e });
    console.log(response);

    getExercises();
  };

  return (
    <div className="workouts">
      <h1>Create a Workout</h1>
      <br />
      <br />
      <div>
        <input
          className="workouts"
          type="text"
          placeholder="Workout Name"
          id="workoutTitle"
        ></input>
      </div>
      <br />
      <br />
      {exercise.map((ex, idx) => (
        <Workout
          getExercises={getExercises}
          ex={ex}
          idx={idx}
          setList={setList}
        />
      ))}
      {isClicked ? (
        <div>
          <h5>
            Movement:{" "}
            <input
              type="text"
              placeholder="Movement Name"
              id="name"
              onChange={(event) => setExerciseName(event.target.value)}
            ></input>
            <MDBBtn
              onClick={() => setIsClicked(false)}
              className="me-1"
              color="danger"
            >
              Delete Exercise
            </MDBBtn>
            <MDBBtn
              onClick={() => [
                createExercise(exerciseName),
                setIsCreated(true),
                setIsClicked(false),
              ]}
              className="me-1"
              style={{ backgroundColor: "#25d366" }}
            >
              Create Exercise
            </MDBBtn>
          </h5>
          {listOfSets.map((set) => (
            <Sets set={set} ex={ex} />
          ))}
          <br />
          {isCreated ? (
            <MDBBtn onClick={addSet} className="mx-2" color="secondary">
              Add Set
            </MDBBtn>
          ) : null}{" "}
          <br />
          <br />
        </div>
      ) : null}

      <div className="workouts">
        <Link to="/exercises">
          <MDBBtn style={{ backgroundColor: "#25d366" }}>Add Exercises</MDBBtn>
        </Link>{" "}
        <br />
        <MDBBtn
          onClick={() => setIsClicked(true)}
          style={{ backgroundColor: "#ff0852" }}
        >
          Manually Add Exercises
        </MDBBtn>{" "}
        <br />
        <MDBBtn
          onClick={(event) => saveWorkout(event.target.value)}
          style={{ backgroundColor: "#0e56f0" }}
        >
          Save Workout
        </MDBBtn>
      </div>

      <MyWorkouts workouts={workouts} deleteWorkout={deleteWorkout} />
    </div>
  );
}

export default Workouts;
