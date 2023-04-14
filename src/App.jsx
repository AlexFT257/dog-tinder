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
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import axios from "axios";
import dogNames from "dog-names";

function App() {
  const [listaRechazados, setListaRechazados] = useState([]);
  const [listaAceptados, setListaAceptados] = useState([]);
  const [perroActual, setPerroActual] = useState({ name: "", image: "" });

  useEffect(() => {
    buscarImagenPerro();
  }, []);

  const buscarImagenPerro = () => {
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      setPerroActual({
        name: dogNames.allRandom(),
        image: response.data.message,
      });
    });
  };

  const aceptarPerro = (perroActual) => {
    setListaAceptados((listaAceptados) => [perroActual, ...listaAceptados]);
    buscarImagenPerro();
  };

  const rechazarPerro = (perroActual) => {
    console.log("rechazado");
    setListaRechazados([perroActual, ...listaRechazados]);
    buscarImagenPerro();
  };

  return (
    <Grid container spacing={2} justifyContent="center" direction="row">
      {/* header / buscador */}
      <Grid item xs={12} sx={{}}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            sx={{ width: "50%" }}
            id="outlined-basic"
            label="Buscar"
            variant="outlined"
          />
        </Box>
      </Grid>
      {/* lista rechazados */}
      <Grid
        item
        xs={4}
        direction="column"
        sx={{ minWidth: 500, minHeight: 350 }}
      >
        <List>
          {listaRechazados.map((item) => (
            <ListItem sx={{ alignItems: "center" }}>
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
              objectFit: "contain",
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
            >
              <HeartBrokenIcon />
            </Button>
            <Button
              onClick={() => aceptarPerro(perroActual)}
              size="small"
              color="primary"
            >
              <FavoriteIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4} direction="row" sx={{ minWidth: 500, minHeight: 350 }}>
        <List>
          {listaAceptados.map((item) => (
            <ListItem>
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

  return (
    <>
      <Grid container direction="row" justifyContent={""} spacing={12}>
        {/* lista de rechazados */}
        <Grid item style={{ backgroundColor: "white" }} xs={3}>
          <List>
            {listaRechazados.map((item) => {
              return (
                <ListItem>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.foto}
                        alt="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.nombre}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        {/* perro actual */}
        <Grid item md={6} xs={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={perroActual.foto}
                alt="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {perroActual.nombre}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={rechazarPerro} size="small" color="primary">
                Rechazar
              </Button>
              <Button onClick={randomDogs} size="small" color="primary">
                Aceptar
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={3} xs={3}></Grid>
      </Grid>
    </>
  );
}

export default App;
