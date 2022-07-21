import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const DatasetTab = ({ challenge }: Props) => {
  const { name, id } = challenge;
  return <div>Dataset for {name} </div>;
};

export default DatasetTab;
