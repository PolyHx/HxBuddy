import React from 'react';

type Props = { challenge: any };

const SubmitTab = ({ challenge }: Props) => {
  const { name, id } = challenge;
  return <div>SubmitTab for {name}</div>;
};

export default SubmitTab;
