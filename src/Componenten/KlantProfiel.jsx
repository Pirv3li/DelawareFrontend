import { useState, useEffect } from "react";
import { Box, Center, Image, Text, VStack, Stack } from "@chakra-ui/react";
import { useAuth } from "./contexts/Auth.contexts";

export const KlantProfiel = () => {
  const { getKlant } = useAuth();
  const [klant, setKlant] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKlantData();
  }, []);

 

  async function fetchKlantData() {
    try {
      const data = await getKlant();
      if (data.length > 0) {
        setKlant(data[0]);
      } else {
        console.error('No data returned from getLeverancier');
      }
      setLoading(false);
      console.log("data: " + data);
    } catch (error) {
      console.error(error);
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        boxShadow={"2xl"}
        borderWidth={1}
        borderRadius={"lg"}
        overflow={"hidden"}
         
      >
        
        <Image
          mt={6}
          h={"120px"}
          w={"full"}
          src={klant.klant.bedrijf.logo}
          objectFit={"contain"}
        />
        <VStack p={6} spacing={2} align={"start"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {klant.klant.gebruikersnaam}
          </Text>
          <Text fontStyle={"italic"} fontSize={"x-small"} color={"gray.500"}>
            {klant.klant.bedrijf.sector}
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            {klant.klant.bedrijf.adres.straat}{" "}
            {klant.klant.bedrijf.adres.nummer} <br />
            {klant.klant.bedrijf.adres.postcode}{" "}
            {klant.klant.bedrijf.adres.stad}
          </Text>

          <Stack spacing={0}>
            <Text fontSize={"sm"}>Email: {klant.klant.email}</Text>
            <Text fontSize={"sm"}>
              Tel: {klant.klant.bedrijf.telefoonnummer}
            </Text>
          </Stack>
          <Stack spacing={1}>
            <Text fontSize={"sm"}>Account Type: Klant</Text>
            <Text fontSize={"sm"}>Klantnummer: {klant.klant.klantNummer}</Text>
          </Stack>
          <Text fontSize={"x-small"} color={"gray.500"}>
            Klant sinds:{" "}
            {new Date(klant.klant.bedrijf.gebruikerSinds).toLocaleDateString(
              "en-GB"
            )}
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};
