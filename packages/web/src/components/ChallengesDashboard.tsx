import React, { Fragment, useState } from 'react';

import {
  Paper,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

import SelectChallenges from './SelectChallenges';
import ChallengeTabs from './ChallengeTabs';

const ChallengesDashboard = () => {
  const [challenge, setChallenges] = useState('');

  return (
    <Container>
      <Paper elevation={4} sx={{ marginTop: 12, padding: 1 }}>
        <Grid container>
          <Grid item xs={8} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ marginTop: 3 }}>
              Challenges overview
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <SelectChallenges
              challenge={challenge}
              setChallenges={setChallenges}
            />
          </Grid>
        </Grid>
        <Card sx={{ margin: 2 }}>
          <CardContent>
            <ChallengeTabs />
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default ChallengesDashboard;
