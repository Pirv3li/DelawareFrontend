import React, { useEffect, useState } from "react";
import { getById, update } from "../../../api/index.js";
import { Box, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NotificatieInfoPagina() {
  const [notificatie, SetNotificatie] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    return () => {
      window.addEventListener("popstate", fetchData);
      window.removeEventListener("popstate", fetchData);
    };
  }, []);

  const fetchData = async () => {
    try {
      const idNotificatie = localStorage.getItem("idNotificatie");
      console.log(idNotificatie);
      const notificatie = await getById(`notificatie/${idNotificatie}`);
      SetNotificatie(notificatie);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAfgehandeld = async (idNotificatie) => {
    try {
      const updatedNotificatie = {
        idOrder: notificatie.idOrder,
        text: notificatie.text,
        onderwerp: notificatie.onderwerp,
        geopend: notificatie.geopend === 1,
        afgehandeld: "true",
        datum: notificatie.datum,
      };

      await update(`notificatie/${idNotificatie}`, updatedNotificatie);

      navigate(`/notificaties`);
    } catch (error) {
      console.error("Error updating notificatie:", error);
    }
  };

  return (
    <div>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text>
          Notificatie nummer: {notificatie && notificatie.idNotificatie}
        </Text>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text>Onderwerp: {notificatie && notificatie.onderwerp}</Text>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text>
          Datum:{" "}
          {notificatie &&
            new Date(notificatie.datum).toLocaleDateString("en-GB")}
        </Text>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text> {notificatie && notificatie.text}</Text>
      </Box>
    </div>
  );
}

export default NotificatieInfoPagina;
