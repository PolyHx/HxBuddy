import '../../App.css';
import React, {useState} from 'react';
import axios from 'axios';

const Uploader = () => {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Choose file:');

  const handleChange = e => {
    setFile(e.target.files[0]);
    setFile(e.target.files[0].name);
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
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