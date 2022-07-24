import { Button, Card, CardContent, Typography } from '@mui/material';
import { ITeam } from '../../types';

export const TeamDisplay = ({
  team,
  setTeam,
}: {
  team: ITeam;
  setTeam: React.Dispatch<React.SetStateAction<ITeam | null>>;
}) => {
  const handleQuit = () => {
    setTeam(null);
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
            <Typography variant="body1">{participant.name}</Typography>
          ))}
        </CardContent>
      </Card>
      <Button color="error" sx={{ margin: 2 }} onClick={handleQuit}>
        Quit Team
      </Button>
    </>
  );
};
