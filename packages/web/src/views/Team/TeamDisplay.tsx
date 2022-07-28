import { Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { ITeam } from '../../types';

export const TeamDisplay = ({
  team,
  setTeam,
}: {
  team: ITeam;
  setTeam: React.Dispatch<React.SetStateAction<ITeam | null>>;
}) => {
  const handleLeave = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/team/${team._id}/leave/`
      );
      setTeam(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: 2 }}>
        Your Team: {team.name}
      </Typography>
      <Card sx={{ margin: 2 }}>
        <CardContent>
          <Typography variant="subtitle1">Participants:</Typography>
          {team.participants.map((participant) => (
            <Typography key={participant._id} variant="body1">
              {participant.name}
            </Typography>
          ))}
        </CardContent>
      </Card>
      <Button color="error" sx={{ margin: 2 }} onClick={handleLeave}>
        Leave Team
      </Button>
    </>
  );
};
