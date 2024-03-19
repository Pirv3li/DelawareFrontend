import { useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Flex, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import LabelInput from '../Componenten/LabelInput';
import { useAuth } from './contexts/Auth.contexts';
import Error from '../Componenten/Error';
import { Kbd } from '@chakra-ui/react'
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const methods = useForm({
    defaultValues: {
      gebruikersnaam: '',
      password: '',
    },
  });
  const { handleSubmit } = methods;

  const handleLogin = useCallback(
    async ({ gebruikersnaam, password }) => {
      try {
        const response = await login(gebruikersnaam, password);
        console.log(response);
        if (response) {
          navigate({
            pathname: '/',
            replace: true,
          });
        }
        else {
          setShowAlert(true);
        }
      } catch (error) {
        setShowAlert(true);
      }
    },
    [login, navigate]
  );

  return (
    <Flex
      align="center"
      justify="center"
      minH="60vh"
      bgImage="url('https://images.adsttc.com/media/images/53c1/7d26/c07a/80aa/8900/0038/large_jpg/00portada.jpg?1405189390')"
      bgPos="center"
      bgSize="cover"
    >
      <FormProvider {...methods}>
        {showAlert && (
          <Alert status="error">
            <AlertIcon />
            Foute login gegevens
          </Alert>
        )}
        <Box width="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
          <Heading mb={4}
            align="center"
            justify="center">Log in</Heading>

          <Error error={error} />
          <form onSubmit={handleSubmit(handleLogin)}> {/* Add this line */}
            <FormControl mb={4}>
              <FormLabel>gebruikersnaam:</FormLabel>
              <Input
                type="text"
                name="gebruikersnaam"
                placeholder=""
                data-cy='gebruikersnaam_input'
                borderColor="lightblue"
                borderWidth="2px"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>wachtwoord:</FormLabel>
              <Input
                type="password"
                name="password"
                data-cy='password_input'
                borderColor="lightblue"
                borderWidth="2px"
              />
            </FormControl>

            <Flex mt={4}
              alignItems="center"
              justifyContent="center">
            </Flex>
            <Flex mt={4} alignItems="center" justifyContent="center">
              <Button
                type="submit"
                isLoading={loading}
                onClick={handleSubmit(handleLogin)}
                data-cy='submit_btn'
              >
                Log in
              </Button>
              {/* <Link to="/register">
              <Button ml={4} colorScheme="teal">
                Register
              </Button>
            </Link> */}
            </Flex>
          </form>
        </Box>
      </FormProvider>
    </Flex>
  );
}