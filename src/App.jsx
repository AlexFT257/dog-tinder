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
  const [listaRechaAux, setListaRechaAux] = useState([]);
  const [listaAcepAux, setListaAcepAux] = useState([]);
  const [perroActual, setPerroActual] = useState({ index:{} ,name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [buscador, setBuscador] = useState("");

  useEffect(() => {
    setPerroActual({
      index: 0
    });
    buscarImagenPerro();
  }, []);

  useEffect(() => {
    if (buscador.trim() !== "") {
      let resultAcept = listaAceptados.filter((item) =>
        item.name.toString().includes(buscador.toString().trim())
      );
      let resultRecha = listaRechazados.filter((item) =>
        item.name.toString().includes(buscador.toString().trim())
      );
      setListaRechaAux(resultRecha);
      setListaAcepAux(resultAcept);
    }else{
      setListaRechaAux(listaRechazados);
      setListaAcepAux(listaAceptados);
    }
  }, [buscador]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBuscador(value);
  };

  const buscarImagenPerro = () => {
    setLoading(true);
      axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      setPerroActual({
        index: perroActual.index + 1,
        name: dogNames.allRandom(),
        image: response.data.message,
      })
      setBuscador("");
      setLoading(false);
    })
  };

  const cambiarEstado = (item) => {
    if(listaAceptados.includes(item)){
      setAmbosRechazados(item);
      eliminarAmbosAceptados(item)
    }else if(listaRechazados.includes(item)){
      setAmbosAceptados(item);
      eliminarAmbosRechazados(item)
    }
  }

  const eliminarAmbosAceptados = (item) => {
    setListaAceptados(listaAceptados.filter((perro) => perro !== item));
    setListaAcepAux(listaAcepAux.filter((perro) => perro !== item));
  }

  const eliminarAmbosRechazados = (item) => {
    setListaRechazados(listaRechazados.filter((perro) => perro !== item));
    setListaRechaAux(listaRechaAux.filter((perro) => perro !== item));
  }

  const setAmbosAceptados = (item) => {
    setListaAceptados((listaAceptados) => [item, ...listaAceptados]);
    setListaAcepAux((listaAcepAux) => [item, ...listaAcepAux]);
  }

  const setAmbosRechazados = (item) => {
    setListaRechazados([item, ...listaRechazados]);
    setListaRechaAux([item, ...listaRechaAux]);
  }

  const aceptarPerro = () => {
    setAmbosAceptados(perroActual)
    buscarImagenPerro();
  };

  const rechazarPerro = () => {
    setAmbosRechazados(perroActual)
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
            value={buscador}
            onChange={handleInputChange}
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
        <List
        sx={{
          padding: 0,
          margin: 0,
          maxHeight: '750px',
          overflow: 'auto',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
        }}>
          {listaRechaAux.map((item) => (
            <ListItem key={item.index}>
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
                  <Button onClick={() => cambiarEstado(item)} >Cambiar</Button>
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
              onClick={() => rechazarPerro()}
              size="small"
              color="primary"
              disabled={loading}
            >
              <HeartBrokenIcon />
            </Button>
            <Button
              onClick={() => aceptarPerro()}
              size="small"
              color="primary"
              disabled={loading}
            >
              <FavoriteIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4} direction="row" sx={{ minWidth: 500, minHeight: 350,backgroundColor:"red"}}>
        <List sx={{
          maxHeight: '750px',
          overflow: 'auto',
          scrollbarWidth: 'none',
          scrollBehavior: 'smooth',
        }}>
          {listaAcepAux.map((item) => (
            <ListItem key={item.index}>
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
                  <Button onClick={() => cambiarEstado(item)}>Cambiar</Button>
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
