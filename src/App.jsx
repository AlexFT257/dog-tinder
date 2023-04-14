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
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
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
    <Grid container spacing={2} sx={{justifyContent:"center"}} direction="row">
      {/* header / buscador */}
      <Grid item xs={12} sx={{ padding: 2, backgroundColor: "white" }}>
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
        sx={{ minWidth: 500, minHeight: 350, backgroundColor: "grey" }}
      >
        <List sx={{
          padding: 0,
          margin: 0,
          overflow: "auto",
          scrollbarWidth: "none",
        }}>
          {listaRechazados.map((item) => (
            <ListItem>
              <Card
                direction="column"
                key={item.name}
                sx={{ width: 500, height: 350 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
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
      {/* perro actual */}
      <Grid
        item
        xs={4}
        direction="column"
        sx={{ minWidth: 500, minHeight: 350, backgroundColor: "white" }}
      >
        <Card
          sx={{
            maxWidth: 500,
            height: 375,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxHeight: "250px",
              objectFit: "cover",
            }}
            image={perroActual.image}
            alt="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
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
      <Grid item xs={4} direction="row" sx={{ minWidth: 500, minHeight: 350,backgroundColor:"red"}}>
        <List sx={{
          overflow: "auto",
          scrollbarWidth: "none",
        }}>
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
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
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
