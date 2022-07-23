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
  

  export const RegisterForm = () => { //finish it to make it for files

    const formik = useFormik({
      initialValues: {
        file: '',
      },


      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        nbSubmit++; //COUNTS THE NUMBER OF SUBMISSIONS
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <div>
      <Button variant="contained" component="label">
          Upload Files
      <input hidden accept="file/*" multiple type="file" onChange={formik.handleChange}/>
      </Button>
      </div>

      <Button variant="contained" onChange={formik.handleChange}>Submit</Button>

    </form>
    );
  };

  export default RegisterForm; 