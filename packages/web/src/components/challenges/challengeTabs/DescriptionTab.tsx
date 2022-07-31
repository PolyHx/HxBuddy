import React from 'react';

import { IChallenge } from '../../../types';

import Markdown from 'markdown-to-jsx';

import text from '../../../textChallenge/en.json';

type Props = { challenge: IChallenge };

const DescriptionTab = ({ challenge }: Props) => {
  const { name, id } = challenge;

  const md = `# Sample blog post`;  

  return (
    <div>
      <h2>
        {text[id].headline} ({name}){' '}
      </h2>
      <Markdown options={{forceBlock: true}}>
        {text[id].description}
      </Markdown>
    </div>
  );
};

export default DescriptionTab;
