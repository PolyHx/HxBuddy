
import Dropzone from 'react-dropzone';
import '../../App.css';
import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';

const FILE_SIZE = 2**10 //max file size
const SUPPORTED_FORMATS = [".py", ".java", ".csv", ".c"] //file types allowed
let nbSubmit = 0
let nbSubMax = 50

const validationSchema = yup.object({
    attachment: yup.mixed()
    .nullable()
    .notRequired()


    .test("FILE_SIZE", "Uploaded file is too big.", 
        value => !value || (value && value.size <= FILE_SIZE))

    .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
        value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))        
        
    .test("nbSubMax", "Too many attempts were submitted.",  //If there were too many attempts
        value => !value || (value && nbSubmit <= nbSubMax)),

  });
  





const RegisterForm = async () => { //finish it to make it for files
  const url = 'http://localhost:3000/uploadFile';

  const formik = useFormik({
    initialValues: {
      file: '',
    },

    validationSchema,
    onSubmit: async (values) => {
      //const { file } = values;
      const response = await axios.post(url, values);
      console.log(response);          
    },
  });

return (
<form onSubmit={formik.handleSubmit} encType="multipart/form-data"> 
  <Dropzone onDrop={files => console.log(files)}>

    {({getRootProps, getInputProps}) => (
      <div className="container">
          <input {...getInputProps()}  onChange={formik.handleChange}/>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}

  </Dropzone>
</form>

   );
     };

export default RegisterForm;      