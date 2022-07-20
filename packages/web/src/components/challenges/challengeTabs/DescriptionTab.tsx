import React from 'react';

import { Challenge } from '../../../views/Challenges/ChallengesDashboard';

import text from '../../../textChallenge/en.json';

type Props = { challenge: Challenge };

const DescriptionTab = ({ challenge }: Props) => {
  const { name, id }: Challenge = challenge;

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
