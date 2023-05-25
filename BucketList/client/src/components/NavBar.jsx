import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import bucketListIcon from './../static/bucketIcon.png';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
  const [user, setUser] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/getUser', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log('This is our get one function: ' + err))
  }, [])

 
  const logoutHandler = ()=>{
    axios.get(`http://localhost:8000/api/logout`, {withCredentials: true})
        .then(res=>{navigate("/")
        window.location.reload();
        })
        .catch()
       
}
  return (
    <div>
    <Navbar bg="dark" variant="dark" >
      <Container>
      <Navbar.Brand href='/places'>
  <img
    alt=""
    src={bucketListIcon}
    width="30"
    height="30"
    className="d-inline-block align-top"
  />{' '}
  BucketList
</Navbar.Brand>
     
      {user ?
              <Link onClick={logoutHandler} className="btn btn-outline-danger">Logout</Link>
              :
          
              
              <Link to={"/"} className="btn btn-outline-primary">Log In</Link>
            } 
               </Container>
    </Navbar>
    </div>
  )
}

export default NavBar
