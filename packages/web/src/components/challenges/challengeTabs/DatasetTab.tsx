import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';
import {Button} from '@mui/material';
import Markdown from 'markdown-to-jsx';

type Props = { challenge: IChallenge };

const DatasetTab = ({ challenge }: Props) => {
  const { name, id }: IChallenge = challenge;
  return (
    <div>
      <h2>
        Dataset for {name}{' '}
      </h2>
      <Markdown options={{forceBlock: true}}>
        {text[id].datasetText}
      </Markdown>

      <Button variant="contained" href= {text[id].datasetFiles} target="_blank">Dataset for {name}</Button>
    </div>
  );
};

export default DatasetTab;
