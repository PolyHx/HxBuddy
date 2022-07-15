import React from 'react';

type Props = { challenge: any };

const DescriptionTab = ({ challenge }: Props) => {
  const { name, id } = challenge;

  return <div>DescriptionTab for {name}</div>;
};

export default DescriptionTab;
