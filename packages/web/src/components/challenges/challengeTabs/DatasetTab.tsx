import React from 'react';


import text from '../../../textChallenge/en.json';
import Uploader from '../Uploader';

import { IChallenge } from '../../../types';


import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const DatasetTab = ({ challenge }: Props) => {

  const { name, id }: IChallenge = challenge;
  return (
    <div>
      <h2>
        Dataset for {name}{' '}
      </h2>
      <p>{text[id].datasetText}</p>
      <Uploader/>
    </div>
  );
};

export default DatasetTab;
