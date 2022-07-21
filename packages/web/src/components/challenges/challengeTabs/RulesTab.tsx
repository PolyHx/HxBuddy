import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const RulesTab = ({ challenge }: Props) => {
  const { name, id } = challenge;
  return <div>RulesTab for {name}</div>;
};

export default RulesTab;
