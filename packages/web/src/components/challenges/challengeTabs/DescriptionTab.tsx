import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const DescriptionTab = ({ challenge }: Props) => {
  const { name, id }: IChallenge = challenge;

  return (
    <div>
      <h2>
        {text[id].headline} ({name}){' '}
      </h2>
      <p>{text[id].description}</p>
    </div>
  );
};

export default DescriptionTab;
