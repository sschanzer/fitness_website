import React from 'react'
import {useState} from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

function CardInfo({workout}) {
  
  const [clicked, setClicked] = useState(false)
//   const [workoutID, setWorkoutID] = useState('')
  
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }


 function startWorkout() {
    setClicked(!clicked)

 }
 async function finishWorkout(id){
    let request = await axios.put(`display_workout_history/${id}/`)
    console.log(request)
 }

 const deleteWorkout = async (id) => {
    let response = await axios.delete(`delete_workout/${id}`)
    console.log('from deleteWorkout', response)
    window.location.reload() 
}
  
    return (
    <div>
    <div>

<Col className="d-flex">
<Card className="flex-fill" style={{ width: '20rem' }}>
<Card.Body>
    <Card.Title id={workout.id} >{workout.workout}</Card.Title>
    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
    <Card.Text>
    <ListGroup>
    {workout.exercises.map(exercise =>
     <ListGroup.Item>   {titleCase(exercise.exercise)} 
     <h6>Sets: {exercise.sets[0].sets}, Reps: {exercise.sets[0].reps}, Weight: {exercise.sets[0].weight}</h6> 
     
     </ListGroup.Item>
    )}

    </ListGroup>

    
    {/* <br/>
    Sets: {workout.exercises[0]}
    <br/> */}
    </Card.Text>
    <MDBBtn onClick={() => deleteWorkout(workout.id)} color='danger'>Delete Workout</MDBBtn> <br/><br/>
    { clicked ? null : <MDBBtn onClick={() => {startWorkout(workout.id)} } style={{ backgroundColor: '#0e56f0' }}>Start Workout</MDBBtn> }
    { clicked ? <MDBBtn onClick={() => finishWorkout(workout.id)} style={{ backgroundColor: '#030782' }}>Finish Workout</MDBBtn> : null}
    {/* <Card.Link href="#">Card Link</Card.Link> */}
    {/* <Card.Link href="#">Another Link</Card.Link> */}
</Card.Body>
</Card>
</Col>

</div>
    
    </div>
  )
}

export default CardInfo