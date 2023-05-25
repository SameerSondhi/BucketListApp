import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
import FileBase from 'react-file-base64';

const AddPlace = () => {
  const [placeName, setPlaceName] = useState(""); 
  const [placeLocation, setPlaceLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState("")

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault();
    //make a post request to create a new product
    axios.post(`http://localhost:8000/api/place/`, {
        placeName,
        placeLocation,
        selectedFile
  })
    .then(res=>navigate(`/places`))
    // .catch(err=>console.log(err))
    .catch(err=>{
      const errorResponse = err.response.data.errors; // Get the errors from err.response.data
      const errorArr = []; // Define a temp error array to push the messages in
      for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message)
      }
      // Set Errors
      setErrors(errorArr);
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
      <h2>Add to Your Bucket!</h2>
      <button className='btn btn-dark'><Link to={`/`}>Back to Home</Link></button> 
        <form onSubmit={onSubmitHandler}>
          {errors.map((err, index) => <p key={index}>{err}</p>)}
                <label>Place Name</label><br/>
                <input type="text" onChange={(e)=>setPlaceName(e.target.value)} value={placeName} className='form-control'/>
          
                <label>Location</label><br/>
                <input type="text" onChange={(e)=>setPlaceLocation(e.target.value)} value={placeLocation} className='form-control'/>

                <label>Add an Image</label><br/>
                <input type="file" accept='.jpg, .jpeg, .png' onChange={(e) => {handleFileUpload(e)}} className='form-control' />            
                <input className="btn btn-dark" type="submit"/>
          </form>
    </div>
  )
}

export default AddPlace