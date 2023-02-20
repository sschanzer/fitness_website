import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import axios from "axios";
import Exercises from "./Exercises";

function Sets({ ex, set, getExercises }) {
  console.log("set from Sets", set);

  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState("0");
  const [visSets, setVisSets] = useState(false);
  const [visReps, setVisReps] = useState(false);
  const [visWeight, setVisWeight] = useState(false);

  const saveSet = async (e) => {
    console.log(sets, reps, weight);
    let response = await axios.put("save_set/", {
      id: set.id,
      sets: sets,
      reps: reps,
      weight: weight,
    });
    console.log(response);
    setVisSets(true);
    setVisReps(true);
    setVisWeight(true);
  };
  useEffect(() => {
    if (set != null) {
      setSets(set.sets);
      setReps(set.reps);
      setWeight(set.weight);
    }
  }, []);

  const deleteSet = async (id) => {
    let response = await axios.delete(`delete_set/${id}`);
    console.log("from deleteSet", response);
    getExercises();
  };

  return (
    <div>
      <div>
        <br />
        <br />
        <input
          type="number"
          disabled={visSets}
          value={sets == 0 ? null : sets}
          onChange={(event) => setSets(event.target.value)}
          placeholder="sets"
          id="sets"
        ></input>
        <input
          type="number"
          disabled={visReps}
          value={reps == 0 ? null : reps}
          onChange={(event) => setReps(event.target.value)}
          placeholder="reps"
          id="reps"
        ></input>
        <input
          type="text"
          disabled={visWeight}
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          placeholder="weight"
          id="weight"
        ></input>
        <MDBBtn
          onClick={() => deleteSet(set.id)}
          className="me-1"
          color="danger"
        >
          X
        </MDBBtn>
        <MDBBtn
          onClick={saveSet}
          className="me-1"
          style={{ backgroundColor: "#25d366" }}
        >
          {" "}
          +{" "}
        </MDBBtn>
      </div>
    </div>
  );
}

export default Sets;
