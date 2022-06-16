import {
  CardContent,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Background } from '../components/Background';
import { RegisterForm } from './Register/RegisterForm';

export const Register = () => {
  return (
    <Background>
      <Container>
        <Paper sx={{ marginTop: 8 }}>
          <Typography variant="h4" color={'white'} sx={{ padding: 2 }}>
            Register
          </Typography>
          <Divider />
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Paper>
      </Container>
    </Background>
  );
};
