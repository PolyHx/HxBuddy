import React from 'react';

import { Challenge } from '../../../views/Challenges/ChallengesDashboard';

import text from '../../../textChallenge/en.json';

type Props = { challenge: Challenge };

const DatasetTab = ({ challenge }: Props) => {
  const { name, id }: Challenge = challenge;
  return <div>Dataset for {name} </div>;
};

export default DatasetTab;
