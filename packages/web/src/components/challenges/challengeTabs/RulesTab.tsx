import React from 'react';

type Props = { challenge: any };

const RulesTab = ({ challenge }: Props) => {
  const { name, id } = challenge;
  return <div>RulesTab for {name}</div>;
};

export default RulesTab;
