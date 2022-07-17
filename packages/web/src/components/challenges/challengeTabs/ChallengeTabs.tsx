import React, { useState, SyntheticEvent } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

import DescriptionTab from './DescriptionTab';
import SubmitTab from './SubmitTab';
import DatasetTab from './DatasetTab';
import RulesTab from './RulesTab';

import { Challenge } from '../../../views/Challenges/ChallengesDashboard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  selectedChallengeIndex: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, selectedChallengeIndex, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedChallengeIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {selectedChallengeIndex === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type Props = { challenge: Challenge };

const ChallengeTabs = ({ challenge }: Props) => {
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0);

  const handleChange = (event: SyntheticEvent, challengeIndex: number) => {
    setSelectedChallengeIndex(challengeIndex);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedChallengeIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Submit" {...a11yProps(1)} />
          <Tab label="Datasets" {...a11yProps(2)} />
          <Tab label="Rules" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel selectedChallengeIndex={selectedChallengeIndex} index={0}>
        <DescriptionTab challenge={challenge} />
      </TabPanel>
      <TabPanel selectedChallengeIndex={selectedChallengeIndex} index={1}>
        <SubmitTab challenge={challenge} />
      </TabPanel>
      <TabPanel selectedChallengeIndex={selectedChallengeIndex} index={2}>
        <DatasetTab challenge={challenge} />
      </TabPanel>
      <TabPanel selectedChallengeIndex={selectedChallengeIndex} index={3}>
        <RulesTab challenge={challenge} />
      </TabPanel>
    </Box>
  );
};

export default ChallengeTabs;
