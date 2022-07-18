import React from 'react';

import text from '../../../textChallenge/en.json';
import Uploader from '../Uploader';

type Props = { challenge: any };

type Challenge = {
  name: string;
  id: keyof typeof text;
};

const DatasetTab = ({ challenge }: Props) => {
  const { name, id }: Challenge = challenge;
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
