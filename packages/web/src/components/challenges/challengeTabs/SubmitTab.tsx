import React from 'react';

import text from '../../../textChallenge/en.json';

type Props = { challenge: any };

type Challenge = {
  name: string;
  id: keyof typeof text;
};

const SubmitTab = ({ challenge }: Props) => {
  const { name, id }: Challenge = challenge;
  return (
    <div>
      <h2>
        Submission folder for {name}{' '}
      </h2>
      <p>{text[id].sumbitText}</p>
    </div>
  );
};

export default SubmitTab;
