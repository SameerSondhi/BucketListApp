import React , {useEffect, useState} from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom'
import '../App.css';

const PlaceDetail = () => {
    const [place, setPlace] = useState({});
    const {id} = useParams()
    const [deleteToggle, setDeleteToggle] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/place/${id}`)
        .then((res) => {
            setPlace(res.data)
        })
        .catch((err) => {
            console.log("This is our details page, " + err)})
        },[id, deleteToggle])
        
        const handleDelete = (e, id) => {
            axios.delete('http://localhost:8000/api/place/' + id)
                .then(res => {
                    setDeleteToggle(!deleteToggle)
                    navigate("/")
                })
                .catch(err => console.error(err));
                
        }

        return (
            <div>
            <div className="d-flex flex-column">
                        <div className="row ">
                            <h1>{place.placeName}</h1>
                            <div className='image'>
                                <img src={place.selectedFile} alt="board place" height="400px" style={{ class: "shadow-inner" }} />
                            </div>
                            <div>
                                <h3>{place.placeLocation}</h3>
                            </div>
                            <div>
                        <button className='btn btn-dark'><Link to={`/places`} style={{textDecoration:"none", color:"white"}}>Back to Bucket</Link></button>   <button className='btn btn-dark'><Link to={`/update/places/${place._id}`} style={{textDecoration:"none", color:"white"}}>Update</Link></button>    <button className='btn btn-dark' onClick={(e)=>{handleDelete(e, place._id)}}>Remove Place</button> 

                            </div>
                            

                            
                        </div>
                    </div>
            </div>
            
        )
}

export default PlaceDetail