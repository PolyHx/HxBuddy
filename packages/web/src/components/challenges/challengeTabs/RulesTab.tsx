import React from 'react';

import { Challenge } from '../../../views/Challenges/ChallengesDashboard';

import text from '../../../textChallenge/en.json';

type Props = { challenge: Challenge };

const RulesTab = ({ challenge }: Props) => {
  const { name, id }: Challenge = challenge;
  return <div>RulesTab for {name}</div>;
};

export default RulesTab;
