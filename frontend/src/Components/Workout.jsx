import React from 'react'
import Sets from './Sets'
import { MDBBtn } from 'mdb-react-ui-kit';
import {useState, useEffect} from 'react'
import axios from 'axios'


function Workout({getExercises, setList, ex, idx}) {
    
    const [listOfSets, setListOfSets] = useState(setList[idx])

    const addSet = async () => {
        let response = await axios.post('save_set/', {id:ex.id, sets:0, reps:0, weight:''})
        console.log('reponse addSet()', response)
        getExercises()
        // window.location.reload()
    }

    const deleteExercise = async (id) => {
        let response = await axios.delete(`delete_exercise/${id}`)
        console.log('from deleteSet', response)
        // window.location.reload()
        getExercises() 
    }
                                 


    useEffect(() => {
        setListOfSets(setList[idx])
    }, [setList[idx]])

    useEffect(() => {
        console.log('use Effect listOfSets', listOfSets)
    }, [listOfSets])

  return (
    <div>
        
    <div>
    
    <h5 style={{display:'flex', justifyContent:'space-between'}}> <p>Movement: {ex.name}</p> <MDBBtn onClick={() => deleteExercise(ex.id)} className='me-1' color='danger'>Delete Exercise</MDBBtn></h5>
     
    {listOfSets.map ((set)=>(
        <Sets getExercises={getExercises} set={set} ex={ex}/>
)) } 
<br/>
<MDBBtn onClick={addSet} className='mx-2' color='secondary'>Add Set</MDBBtn> <br/><br/>
    </div>
    </div>

  )
}

export default Workout