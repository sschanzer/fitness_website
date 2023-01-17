import React from 'react'
import axios from 'axios'
import { MDBBtn } from 'mdb-react-ui-kit';
import {Navigate} from 'react-router-dom'
import { MDBContainer } from "mdb-react-ui-kit";
import CardProfile from './ProfilePic';
import {useState, useEffect} from 'react'


function Profile({user, setUser}) {


  const [quote, setQuote] = useState('')

const signOut = async (eventClick) => {
    let response = await axios.post('sign_out/')
    if (response.data["signout"] == true)
    console.log(response.data, user)
    window.location.reload()
    // return <Navigate to=''/>
    }

    
async function getQuote() {
    let response = await axios.get('get_quote/')
    setQuote(response.data.response) 
    
  }
  console.log(quote)
    
  return (
    <div className='profile'>
    <h1>Profile</h1> <br/>
    {user ?
    <div>
    
    <CardProfile user={user} setUser={setUser}/>
    <h4>Name: {user.first_name} {user.last_name}</h4>
    <h4>Email: {user.email}</h4>
    <h4>Date Created: {user.date_created}</h4>
    
    <MDBBtn onClick={getQuote} className='me-1' style={{ backgroundColor: '#25d366' }}>Motivation</MDBBtn>
    <MDBBtn onClick={signOut} className='me-1' color='danger'> Log Out </MDBBtn>
    <br/>
    <br/>
    <div>
    <p>{quote}</p>
    </div>
    </div>
    :
    <Navigate to='/' />
    }

    {/* {!user && <Navigate to='/'/>} */}

    </div>

  )
}

export default Profile


