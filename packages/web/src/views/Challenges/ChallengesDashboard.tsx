import React, { Fragment, useState } from 'react';

import {
  Paper,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

import text from '../../textChallenge/en.json';

import SelectChallenges from '../../components/challenges/SelectChallenges';
import ChallengeTabs from '../../components/challenges/challengeTabs/ChallengeTabs';

export interface Challenge {
  name: string;
  id: keyof typeof text;
  value: number;
}

const ChallengesDashboard = () => {
  const [challenge, setChallenges] = useState<Challenge>({
    name: 'Challenge 1',
    id: 'challenge1',
    value: 10,
  });

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
            <ChallengeTabs challenge={challenge} />
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default ChallengesDashboard;
