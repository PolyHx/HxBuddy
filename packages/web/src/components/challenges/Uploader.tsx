import '../../App.css';
import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';

//UNUSED CODE, CAN DELETE THIS FILE

const Uploader = () => {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Choose file:');

  const handleChange = e => {
    setFile(e.target.files[0].name);
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file); //myabe remove?
    formData.append('fileName', fileName);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const response = await[url, formData, config].then((response) => {
      console.log(response.data);
    });

  }

  return (
    <div className="Uploader">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default Uploader;