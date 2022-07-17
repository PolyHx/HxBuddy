import React from 'react';

import { Challenge } from '../../../views/Challenges/ChallengesDashboard';

import text from '../../../textChallenge/en.json';

type Props = { challenge: Challenge };

const SubmitTab = ({ challenge }: Props) => {
  const { name, id }: Challenge = challenge;
  return <div>SubmitTab for {name}</div>;
};

export default SubmitTab;
