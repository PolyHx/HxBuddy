import React from 'react';

type Props = { challenge: any };

const DatasetTab = ({ challenge }: Props) => {
  const { name, id } = challenge;

  return <div>Dataset for {name}</div>;
};

export default DatasetTab;
