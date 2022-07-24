import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { ITeam } from '../../types';

export const TeamPicker = ({
  setTeam,
}: {
  setTeam: React.Dispatch<React.SetStateAction<ITeam | null>>;
}) => {
  const [teamField, setTeamField] = React.useState<string>('');

  const handleSubmit = () => {
    setTeam({
      name: teamField,
      id: '1',
      participants: [
        {
          name: 'John Doe',
        },
      ],
    });
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: 2 }}>
        Choose a team
      </Typography>
      <Card sx={{ margin: 2 }}>
        <CardContent>
          {/* enter the name */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                id="teamName"
                name="teamName"
                label="Team Name"
                value={teamField}
                onChange={(e) => setTeamField(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} mt={1}>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
