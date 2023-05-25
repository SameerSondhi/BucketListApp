import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PlaceUpdate = () => {
  const [placeName, setPlaceName] = useState(""); 
  const [placeLocation, setPlaceLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState("")

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

useEffect(()=>{
    axios.get('http://localhost:8000/api/place/' + id) 
        .then(res=>{
            setPlaceName(res.data.placeName)
            setPlaceLocation(res.data.placeLocation)
            setSelectedFile(res.data.selectedFile)
        })
  },[id])
    
  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault();
    //make a post request to create a new product
    axios.put('http://localhost:8000/api/place/' + id, {
        placeName,
        placeLocation,
        selectedFile
  })
  .then(res=>navigate(`/`))
  .catch(err=>{
    const errorResponse = err.response.data.errors;
    const errArr = []
    for(const key of Object.keys(errorResponse)) {
      errArr.push(errorResponse[key].message)
    }
    setErrors(errArr);
  })
}
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const base64 = await getBase64(file);
  console.log(base64)
  setSelectedFile(base64);
};
const getBase64 = (file) => new Promise(function (resolve, reject) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject('Error: ', error);
})

  return (
    <div>
      <h2>Got An Update?</h2>
      <button className='btn btn-dark'><Link to={`/`}>Back to Home</Link></button> 
        <form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => <p key={index}>{err}</p>)}
            <p>
                <label>Place Name</label><br/>
                <input type="text" onChange={(e)=>setPlaceName(e.target.value)} value={placeName}/>
            </p>
            <p>
                <label>Location</label><br/>
                <input type="text" onChange={(e)=>setPlaceLocation(e.target.value)} value={placeLocation}/>
            </p>
            <input type="file" accept='.jpg, .jpeg, .png' onChange={(e) => {handleFileUpload(e)}} className='form-control' />            
            <input className="btn btn-dark" type="submit"/>
            </form>
    </div>
  )
}

export default PlaceUpdate