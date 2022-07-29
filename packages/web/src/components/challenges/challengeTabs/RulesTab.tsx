import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const RulesTab = ({ challenge }: Props) => {
<<<<<<< HEAD
  const { name, id }: IChallenge = challenge;
  return (
    <div>
      <h2>
        Rules for {name}{' '}
      </h2>
      <p>{text[id].rules}</p>
    </div>
  );
=======
  const { name, id } = challenge;
  return <div>RulesTab for {name}</div>;
>>>>>>> master
};

export default RulesTab;
