import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { ITeam } from '../../types';

export const TeamPicker = ({
  setTeam,
}: {
  setTeam: React.Dispatch<React.SetStateAction<ITeam | null>>;
}) => {
  const [teamField, setTeamField] = React.useState<string>('');

  const handleSubmit = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/team/name/${teamField}`
    );

    const team: ITeam | null = res.data ? res.data : null;

    if (team) {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/team/${team._id}/join/`
        );
        setTeam(res.data);
        return;
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/team/`, {
        name: teamField,
      });
      setTeam(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: 2 }}>
        Choose a team
      </Typography>
      <Card sx={{ margin: 2 }}>
        <CardContent>
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
