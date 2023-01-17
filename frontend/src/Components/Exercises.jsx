import React from 'react'
import { useState, useEffect } from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import { MDBInputGroup, MDBInput, MDBIcon } from 'mdb-react-ui-kit';



function Exercises() {

 const [targetMuscle, setTargetMuscle] = useState([
"abductors",
"abs",
"adductors",
"biceps",
"calves",
"cardiovascular system",
"delts",
"forearms",
"glutes",
"hamstrings",
"lats",
"levator scapulae",
"pectorals",
"quads",
"serratus anterior",
"spine",
"traps",
"triceps",
"upper back"
 ])
 const [selectedGroup, setSelectedGroup] = useState([])
 const [searchExercises, setSearchExercises] = useState([])


async function handleClick(event) {
  console.log(event.target.innerText);
  const response = await axios.get(`exercise_db/${event.target.innerText}`)
  setSelectedGroup(response.data.response); 
}
console.log('selected Group:', selectedGroup);


async function handleSearch(event) {
  console.log('event.target.innnertext: ', event.target.value);
  const response = await axios.get(`search_exercise_db/${event.target.value}`)
  setSearchExercises(response.data.response)
  
}
console.log('searched exercises:', searchExercises);



  function getTargetMuscle() {
    if (targetMuscle != null){
    return targetMuscle.map((target) => {
      return <MDBDropdownItem onClick={handleClick}>{target}</MDBDropdownItem>
    
  })}
    
  }

  async function handleSelected(name) {
        console.log('e.target.dataset.name', name);
        let response = await axios.post('new_exercise/', {name:name})
        console.log(response.data.success);
  }
  
  function getSelectedMuscle() {
      return(<div>
      {selectedGroup.map((target) => (
        <div className='selection'> 

      <h1 className='selection'>{target.name} </h1>
      <MDBBtn onClick={() => handleSelected(target.name)} color='dark'>
        Select Exercise
      </MDBBtn>
      <br/>
      <img className='selection' src= {target.gifUrl}></img>
      </div>
      ))}
      </div>)
  }
 


  function getSearchedMuscle() {
    if (searchExercises != null){
      return searchExercises.map((target) => {
        return(<div className='selection'> 
        <h1 className='selection'>{target.name} </h1>
        <MDBBtn onClick={() => handleSelected(target.name)} color='dark'>
          Select Exercise
        </MDBBtn>
        <br/>
        <img className='selection' src= {target.gifUrl}></img>
        </div>)
      });
    }
    }

    useEffect (()=>{
      getSearchedMuscle()
    },[searchExercises])

  return (
    <div>
    <h1 className='search'>Exercises</h1>
    <br/>
    <MDBInputGroup className='search'>
      <MDBInput onChange={handleSearch} label='Search All Exercises' />
      <MDBBtn rippleColor='dark'>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
    {getSearchedMuscle()}
    <br/>
    <div className='searchbar'>
    <MDBDropdown group >
        <MDBDropdownToggle color='dark'>Select Target Muscle</MDBDropdownToggle>
        <MDBDropdownMenu>
          {getTargetMuscle()}
        </MDBDropdownMenu>
      </MDBDropdown>
      </div>
      <br/>
      {getSelectedMuscle()}
    
    </div>
  )
}

export default Exercises