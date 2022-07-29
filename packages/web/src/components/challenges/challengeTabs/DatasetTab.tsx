import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';
import {Button} from '@mui/material';

type Props = { challenge: IChallenge };

const DatasetTab = ({ challenge }: Props) => {
<<<<<<< HEAD
  const { name, id }: IChallenge = challenge;
  return (
    <div>
      <h2>
        Dataset for {name}{' '}
      </h2>
      <p>{text[id].datasetText}</p>

      <Button variant="contained" href= {text[id].datasetFiles} target="_blank">Dataset for {name}</Button>
    </div>
  );
=======
  const { name, id } = challenge;
  return <div>Dataset for {name} </div>;
>>>>>>> master
};

export default DatasetTab;
