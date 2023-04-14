import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  ImageList,
} from "@mui/material";
import axios from "axios";
import dogNames from "dog-names";

function App() {
  const [listaRechazados, setListaRechazados] = useState([]);
  const [listaAceptados, setListaAceptados] = useState([]);
  const [perroActual, setPerroActual] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarImagenPerro();
  }, []);

  const buscarImagenPerro = () => {
    setLoading(true);
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      setPerroActual({
        name: dogNames.allRandom(),
        image: response.data.message,
      });
      setLoading(false);
    });
  };

  const aceptarPerro = (perroActual) => {
    setListaAceptados((listaAceptados) => [perroActual,...listaAceptados]);
    buscarImagenPerro();
  };


  const rechazarPerro = (perroActual) => {
    console.log("rechazado");
    setListaRechazados([perroActual,...listaRechazados]);
    buscarImagenPerro();
  };

  return (
    <Grid container spacing={2} justifyContent="center" direction="row">
      {/* lista rechazados */}
      <Grid
        item
        xs={4}
        direction="column"
        sx={{ minWidth: 500, minHeight: 350 }}
      >
        <List>
          {listaRechazados.map((item) => (
            <ListItem sx={{ alignItems: "center" }} key={item.name}>
              <Card
                direction="column"
                key={item.name}
                sx={{ width: 500, height: 350 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: "500px",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                  image={item.image}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid
        item
        xs={4}
        direction="column"
        sx={{ width: 500, weight: 375, marginTop: 2, justifyContent: "center" }}
      >
        <Card>
          <CardMedia
            component="img"
            sx={{
              maxWidth: "500px",
              maxHeight: "250px",
              objectFit: "cover",
              objectPosition: "center",
            }}
            image={perroActual.image}
            alt="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {perroActual.name}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-around" }}>
            <Button
              onClick={() => rechazarPerro(perroActual)}
              size="small"
              color="primary"
              disabled={loading}
            >
            </Button>
            <Button
              onClick={() => aceptarPerro(perroActual)}
              size="small"
              color="primary"
              disabled={loading}
            >
              Aceptar
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4} direction="row" sx={{ minWidth: 500, minHeight: 350 }}>
        <List>
          {listaAceptados.map((item) => (
            <ListItem key={item.name}>
              <Card
                direction="column"
                key={item.name}
                sx={{ width: 500, height: 350 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: "500px",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                  image={item.image}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default App;
