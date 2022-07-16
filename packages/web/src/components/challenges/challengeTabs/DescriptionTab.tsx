import React from 'react';

import text from '../../../textChallenge/en.json';

type Props = { challenge: any };

type Challenge = {
  name: string;
  id: keyof typeof text;
};

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
