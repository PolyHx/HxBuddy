import {
  CardContent,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Background } from '../components/Background';
import { FormHeader } from './Register/FormHeader';
import { RegisterForm } from './Register/RegisterForm';

export const Register = () => {
  return (
    <Background>
      <Container>
        <Paper elevation={5} sx={{ marginTop: 8 }}>
          <FormHeader />
          <Divider />
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Paper>
      </Container>
    </Background>
  );
};
