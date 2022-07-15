import React, { useState, SyntheticEvent } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

import DescriptionTab from './DescriptionTab';
import SubmitTab from './SubmitTab';
import DatasetTab from './DatasetTab';
import RulesTab from './RulesTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
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

const ChallengeTabs = ({ challenge }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
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
      <TabPanel value={value} index={0}>
        <DescriptionTab challenge={challenge} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubmitTab challenge={challenge} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DatasetTab challenge={challenge} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RulesTab challenge={challenge} />
      </TabPanel>
    </Box>
  );
};

export default ChallengeTabs;
