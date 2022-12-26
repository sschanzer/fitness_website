import React from 'react'
import axios from 'axios'
import { MDBBtn } from 'mdb-react-ui-kit';
import {Navigate} from 'react-router-dom'
import { MDBContainer } from "mdb-react-ui-kit";
import CardProfile from './ProfilePic';
import {useState} from 'react'
// require("dotenv").config();



function Profile({user, setUser}) {


  const [quote, setQuote] = useState('')

const signOut = async (eventClick) => {
    let response = await axios.post('sign_out/')
    if (response.data["signout"] == true)
    console.log(response.data, user)
    window.location.reload()
    // return <Navigate to=''/>
    }

function getQuote() {
    const options = {
      method: 'POST',
      url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key':  process.env.REACT_APP_key3,
        'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
      },
      data: '{"key1":"value","key2":"value"}'
    };
    

    axios.request(options).then(function (response) {
      console.log(response.data);
      setQuote(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

    // async function getQuote() {
    //   try {
    //     const response = await axios.get('/get_quote/')
    //     const data = response.data
    //     console.log(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  
    // async function getQuote() {
    //   await axios.get('/get_quote/')
    //     .then(response => {
    //       const quote = response.data.quote;
    //       const author = response.data.author;
    //       console.log(quote, author)
    //       return(quote, author)
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }
    
    // const getQuote = async () =>{
    //   let response = await axios.get('/quote/')
    //   console.log('from quote:', response.data)
    //   setQuote(response.data)
      
    //   // let response = await axios.get('https://api.goprogram.ai/inspiration')
    //   // console.log(response.data)
    // }

  return (
    <div className='profile'>
    <h1>Profile</h1> <br/>
    {user ?
    <div>
    
    <CardProfile user={user} setUser={setUser}/>
    
    {/* <MDBContainer className="my-5 d-flex flex-column justify-content-center align-items-center">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
        className="rounded-circle mb-3"
        style={{ width: "150px" }}
        alt="Avatar"
      />

      <h5 className="mb-2">
        <strong>{user.first_name} {user.last_name}</strong>
      </h5>
      <p className="text-muted">
        Web designer <span className="badge bg-primary">PRO</span>
      </p> 
    </MDBContainer>
     */}
    <h4>Name: {user.first_name} {user.last_name}</h4>
    <h4>Email: {user.email}</h4>
    <h4>Date Created: {user.date_created}</h4>
    
    <MDBBtn onClick={getQuote} className='me-1' style={{ backgroundColor: '#25d366' }}>Motivation</MDBBtn>
    <MDBBtn onClick={signOut} className='me-1' color='danger'>
        Log Out 
    </MDBBtn>
    <h4>{quote}</h4>
    </div>
    :
    <Navigate to='/' />
    }

    {/* {!user && <Navigate to='/'/>} */}

    </div>

  )
}

export default Profile