import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react' 
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { MDBBtn } from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function History({workouts}) {
  
  const [workoutHistory, setWorkoutHistory] = useState([])

  async function displayHistory() {
    let request = await axios.get('workout_history/')
    console.log('display history request.data: ', request.data)
    setWorkoutHistory(request.data.workout_info)
    // console.log(request.data)
  }
  

  useEffect(() => {
    displayHistory();
  },[])

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
  
  
  
  return (
    <div>
      <div style={{display:'flex', justifyContent: 'center'}}>
      {workoutHistory.map(workout =>(
    <div>

    <Col className="d-flex">
    <Card className="flex-fill" style={{ width: '20rem' }}>
    <Card.Body>
        <Card.Title>{workout.workout.workout_title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Completed On: {workout.workout.date_completed}</Card.Subtitle> 
        <Card.Text>
        <ListGroup>
        {/* {console.log(workout.exercises_list)} */}
        {workout.exercises_list.map(exercise =>
         <ListGroup.Item>   {titleCase(exercise.exercise.name)}
         {exercise.sets.map (set =>
          <h6>Sets: {set.sets}, Reps: {set.reps}, Weight: {set.weight}</h6>
         )} 
          
         
         </ListGroup.Item>
        )}
    
        </ListGroup>
  
        </Card.Text>
        <MDBBtn onClick={() => deleteWorkout(workout.id)} color='danger'>Delete Workout</MDBBtn> <br/><br/>
    </Card.Body>
    </Card>
        </Col>
    
</div>
))}
</div>



    </div>
    
  )
}

export default History

