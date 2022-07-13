import React, { Fragment, useState } from 'react';

import { Paper, Container, Typography } from '@mui/material';

import SelectChallenges from './SelectChallenges';
import ChallengeTabs from './ChallengeTabs';

type Props = {};

const ChallengesDashboard = (props: Props) => {
  const [challenge, setChallenges] = useState('');

  return (
    <Container>
      <Paper elevation={3} sx={{ marginTop: 12 }}>
        <div style={{ textAlign: 'right' }}>
          <Typography variant="h6">Search</Typography>
          <SelectChallenges
            challenge={challenge}
            setChallenges={setChallenges}
          />
        </div>
        <ChallengeTabs />
      </Paper>
    </Container>
  );
};

export default ChallengesDashboard;
