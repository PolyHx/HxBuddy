import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const SubmitTab = ({ challenge }: Props) => {
  const { name, id }: IChallenge = challenge;
  return <div>SubmitTab for {name}</div>;
};

export default SubmitTab;
