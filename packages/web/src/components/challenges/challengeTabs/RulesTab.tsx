import React from 'react';

import text from '../../../textChallenge/en.json';

type Props = { challenge: any };

type Challenge = {
  name: string;
  id: keyof typeof text;
};

const RulesTab = ({ challenge }: Props) => {
  const { name, id }: Challenge = challenge;
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
