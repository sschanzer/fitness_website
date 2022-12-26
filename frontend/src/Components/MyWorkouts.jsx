import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { MDBBtn } from 'mdb-react-ui-kit';
import {useState} from 'react'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardInfo from './CardInfo';

function MyWorkouts({workouts}) {

    const [clicked, setClicked] = useState(false)
    

   
     function startWorkout() {
        setClicked(!clicked)
    
     }
    

   

  return (
    
    <div>
    <br/>
    <div style={{display:'flex', justifyContent: 'center'}}>
    {workouts.map(workout =>(
        <div>

       <CardInfo workout={workout} />
        
  </div>
    ))}
    </div>
    </div>
    )}

export default MyWorkouts