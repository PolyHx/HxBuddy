import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const RulesTab = ({ challenge }: Props) => {
  const { name, id }: IChallenge = challenge;
  return (
    <div>
      <h2>
        Rules for {name}{' '}
      </h2>
      <p>{text[id].rules}</p>
    </div>
  );
};

export default RulesTab;
