import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';
import Markdown from 'markdown-to-jsx';

type Props = { challenge: IChallenge };




const RulesTab = ({ challenge }: Props) => {
  const { name, id }: IChallenge = challenge;


 
  return (
    <div>
      <h2>
        Rules for {name}{' '}
      </h2>
      <Markdown options={{forceBlock: true}}>
        {text[id].rules}
      </Markdown>
    </div>
    
  );
};

export default RulesTab;
