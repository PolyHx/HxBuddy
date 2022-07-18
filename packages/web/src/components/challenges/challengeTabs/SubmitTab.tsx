import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const SubmitTab = ({ challenge }: Props) => {

  const { name, id }: IChallenge = challenge;
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
