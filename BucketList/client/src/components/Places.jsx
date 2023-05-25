import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

const Places = () => {
    const [placeList, setPlaceList] = useState([]);
    // const [deleteToggle, setDeleteToggle] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/place')
            .then((res) => {
                console.log(res.data)
                setPlaceList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
 
    return (
        <div>
            <div>
            {/* <button className='btn btn-primary'><Link to={`/createplace`}>Add Place</Link></button> */}
            <h2>What's In My Bucket</h2>  
            {/* <button className='btn btn-dark'><Link to={`/createplace`}>Add Place</Link></button> */}
            </div>
            
                        {
                            placeList.map((place, i) => {
                                return (
                                      <Card key={i} style={{ width:"40rem", boxShadow: '0px 0px 4px 4px silver', margin:"auto", marginBottom:'20px'}}>
                                        <Card.Img variant="top" src={place.selectedFile} style={{height:"200px"}}/>
                                        <Card.Body className="card-body d-flex flex-column">
                                          <Card.Title>{place.placeName}</Card.Title>
                                          <Card.Text>
                                            {place.placeLocation}
                                          </Card.Text>
                                        </Card.Body>
                                        <Button variant="dark" style={{width:"20rem", margin:"auto"}}><Link to={`/details/places/${place._id}`} style={{color:"whitesmoke", textDecoration:"none"}}>Details</Link></Button> <br />
                                      </Card>
                                   
                                )
                            })
                        }
                        <Card style={{ width:"20rem", boxShadow: '0px 0px 4px 4px silver', margin:"auto", marginBottom:"20px"}}>
                                        
                                        <Button variant="dark"><Link to={`/createplace`} style={{color:"whitesmoke", textDecoration:"none"}}>Add More!</Link></Button> 
                                      </Card>
        </div>
    )
}
export default Places