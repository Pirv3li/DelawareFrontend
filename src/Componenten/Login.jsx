import { useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Flex, Heading,Alert, AlertIcon  } from '@chakra-ui/react';
import LabelInput from '../Componenten/LabelInput';
import { useAuth } from './contexts/Auth.contexts';
import Error from '../Componenten/Error';

const validationRules = {
  gebruikersnaam: {
    required: 'Gebruikersnaam is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);


  const methods = useForm({
    defaultValues: {
      email: 'user1@example.com',
      password: '12345678',
    },
  });
  const { handleSubmit } = methods;



const handleLogin = useCallback(
  async ({ email, password }) => {
    try {
      const response = await login(email, password);

      if (response) {
        navigate({
          pathname: '',
          replace: true,
        });
      }
    } catch (error) {
     
      setShowAlert(true);
    }
  },
  [login, navigate]
);



  return (
    <FormProvider {...methods}>
      {showAlert && (
      <Alert status="error">
        <AlertIcon />
        Foute login gegevens
      </Alert>
      )}
      <Flex align="center" justify="center" minH="100vh">
        <Box width="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Heading mb={4}
            align="center"
            justify="center">Sign in</Heading>

          <Error error={error} />

          <LabelInput

            label="email: "
            type="text"
            name="email"
            placeholder="your@email.com"
            validationRules={validationRules.email}
            data-cy='email_input'
            mb={4} 

          />

          <LabelInput
            label="password: "
            type="password"
            name="password"
            validationRules={validationRules.password}
            mb={4} 
            data-cy='password_input'

          />

          <Flex mt={4}
            alignItems="center"
            justifyContent="center">
          </Flex>
          <Flex mt={4} alignItems="center" justifyContent="center">
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              onClick={handleSubmit(handleLogin)}
              data-cy='submit_btn'

            >
              Sign in
            </Button>
            <Link to="/register">
              <Button ml={4} colorScheme="teal">
                Register
              </Button>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </FormProvider>
  );
}
