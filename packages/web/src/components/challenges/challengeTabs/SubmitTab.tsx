import React from 'react';

import { IChallenge } from '../../../types';

import text from '../../../textChallenge/en.json';
import NewerUploader from '../NewerUploader';
import NewUploader from '../NewUploader';
import Markdown from 'markdown-to-jsx';

type Props = { challenge: IChallenge };

const SubmitTab = ({ challenge }: Props) => {
  const { name, id }: IChallenge = challenge;
  return (
    <div>
      <h2>
        Submission folder for {name}{' '}
      </h2>
      <Markdown options={{forceBlock: true}}>
        {text[id].rules}
      </Markdown>
      <NewUploader/>

    

    </div>
  );
};

export default SubmitTab;
