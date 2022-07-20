import { Card, CardContent, Container, Divider, Paper } from '@mui/material';
import { Background } from '../components/Background';
import { LoginForm } from './Login/LoginForm';
import { FormHeader } from './Login/FormHeader';

export const Login = () => {
  return (
    <Background>
      <Container>
        <Paper elevation={5} sx={{ marginTop: 8 }}>
          <FormHeader />
          <Divider />
          <Card>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </Background>
  );
};
