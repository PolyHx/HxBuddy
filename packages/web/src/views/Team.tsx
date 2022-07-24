import { Container, Paper } from '@mui/material';
import { useState } from 'react';
import { ITeam } from '../types';
import { TeamDisplay } from './Team/TeamDisplay';
import { TeamPicker } from './Team/TeamPicker';

export const Team = () => {
  const [team, setTeam] = useState<ITeam | null>(null);

  return (
    <Container>
      <Paper elevation={4} sx={{ marginTop: 12, padding: 1 }}>
        {team ? (
          <TeamDisplay team={team} setTeam={setTeam} />
        ) : (
          <TeamPicker setTeam={setTeam} />
        )}
      </Paper>
    </Container>
  );
};
