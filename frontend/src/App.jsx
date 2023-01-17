import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from './Components/Home';
import Profile from './Components/Profile';
import History from './Components/History';
import Workouts from './Components/Workouts';
import Exercises from './Components/Exercises';
import MyWorkouts from './Components/MyWorkouts';


// export default {
// 	plugins: [
// 		vitePluginRequire({
// 			// @fileRegex RegExp
// 			// optional：default file processing rules are as follows
// 			// fileRegex:/(.jsx?|.tsx?|.vue)$/

//             // Conversion mode. The default mode is import
//             // importMetaUrl | import
//             // importMetaUrl see https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url 
//             // translateType: "importMetaUrl" | "import";
// 		}),
// 	],
// };

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
       for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common["X-CSRFToken"]=csrftoken


function App() {

  const [user, setUser] = useState(null)
  const [addClicked, setAddClicked] = useState(0)
  const [workouts, setWorkOuts] = useState([])

  const curr_user = async (eventClick) => {
    let myResponse = await axios.get('current_user/')
    let user = myResponse.data && myResponse.data[0] && myResponse.data[0].fields
    setUser(user)
  }

  useEffect(() => {
    curr_user()
  }, [])


  return (
    <div className="App">
      <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/profile">Profile</Nav.Link>
            <Nav.Link href="#/history">History</Nav.Link>
            <Nav.Link href="#/workouts"> Create Workout</Nav.Link>
            <Nav.Link href="#/exercises">Exercises</Nav.Link>
            <Nav.Link href="#/myWorkouts">My Workouts</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
          
          <Routes>
            <Route path='' exact element={<Home user={user} setUser={setUser}/>} />
            <Route path='profile/' element={<Profile user={user} setUser={setUser}/>} />
            <Route path='history/' element={<History workouts={workouts} setWorkouts={setWorkOuts}/>}/>
            <Route path='workouts/' element={<Workouts addClicked={addClicked} setAddClicked={setAddClicked} workouts={workouts} setWorkOuts={setWorkOuts} />}/>
            <Route path='exercises/' element={<Exercises/>}/>
            <Route path='myWorkouts/' element={<MyWorkouts workouts={workouts} setWorkouts={setWorkOuts}/>}/>

          </Routes>
        </Router>

    </div>
  )
}

export default App
