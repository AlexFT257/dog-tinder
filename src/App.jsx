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
  IconButton,
  Chip,
  ImageList,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import PetsIcon from "@mui/icons-material/Pets";
import axios from "axios";
import dogNames from "dog-names";
import uniqid from "uniqid";

function App() {
  const [listaRechazados, setListaRechazados] = useState([]);
  const [listaAceptados, setListaAceptados] = useState([]);
  const [listaRechaAux, setListaRechaAux] = useState([]);
  const [listaAcepAux, setListaAcepAux] = useState([]);
  const [perroActual, setPerroActual] = useState({
    index: {},
    name: "",
    image: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [buscador, setBuscador] = useState("");


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateTags() {
    // tags de prueba para el perro
    var tags = [
      "lindo",
      "adorable",
      "cariñoso",
      "jugueton",
      "amigable",
      "fiel",
      "inteligente",
      "tranquilo",
      "curioso",
      "independiente",
      "sociable",
      "amoroso",
      "protector",
      "cariñoso",
      "jugueton",
      "fiel",
    ];
    // numero de tags aleatorio
    var tagNumber = getRandomInt(1, 5);
    // variable para guardar los tags
    var tagsAux = [];
    for (var i = 0; i < tagNumber; i++) {
      tagsAux.push(tags[getRandomInt(0, tags.length + 1)]);
    }
    // comprobamos que no haya tags repetidos
    // si hay repetidos, se eliminan
    tagsAux = tagsAux.filter((item, index) => tagsAux.indexOf(item) === index);
    // retornamos los tags
    return tagsAux;
  }

  useEffect(() => {
    setPerroActual({
      index: 0,
      tags: generateTags(),
    });
    buscarImagenPerro();
  }, []);

  useEffect(() => {
    if (buscador.trim() !== "") {
      let resultAcept = listaAceptados.filter((item) =>
        item.name
          .toString()
          .toLowerCase()
          .includes(buscador.toString().toLowerCase().trim())
      );
      let resultRecha = listaRechazados.filter((item) =>
        item.name
          .toString()
          .toLowerCase()
          .includes(buscador.toString().toLowerCase().trim())
      );
      setListaRechaAux(resultRecha);
      setListaAcepAux(resultAcept);
    } else {
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
        tags: generateTags(),
      });
      setBuscador("");
      setLoading(false);
    });
  };

  const cambiarEstado = (item) => {
    if (listaAceptados.includes(item)) {
      setAmbosRechazados(item);
      eliminarAmbosAceptados(item);
    } else if (listaRechazados.includes(item)) {
      setAmbosAceptados(item);
      eliminarAmbosRechazados(item);
    }
  };

  const eliminarAmbosAceptados = (item) => {
    setListaAceptados(listaAceptados.filter((perro) => perro !== item));
    setListaAcepAux(listaAcepAux.filter((perro) => perro !== item));
  };

  const eliminarAmbosRechazados = (item) => {
    setListaRechazados(listaRechazados.filter((perro) => perro !== item));
    setListaRechaAux(listaRechaAux.filter((perro) => perro !== item));
  };

  const setAmbosAceptados = (item) => {
    setListaAceptados((listaAceptados) => [item, ...listaAceptados]);
    setListaAcepAux((listaAcepAux) => [item, ...listaAcepAux]);
  };

  const setAmbosRechazados = (item) => {
    setListaRechazados([item, ...listaRechazados]);
    setListaRechaAux([item, ...listaRechaAux]);
  };

  const aceptarPerro = () => {
    setAmbosAceptados(perroActual);
    buscarImagenPerro();
  };

  const rechazarPerro = () => {
    setAmbosRechazados(perroActual);
    buscarImagenPerro();
  };

  const tagRender = (tag) => {
    if (typeof tag === "string") {
      return (
        <Chip
          key={uniqid()}
          label={tag}
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#000",
            margin: 0.5,
            "&:hover": {
              backgroundColor: "#f5f5f5",
              color: "#000",
            },
          }}
        />
      );
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        display: "flex",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* header / buscador */}
      <Grid item xs={12} sx={{ padding: 2, backgroundColor: "white" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <PetsIcon sx={{ fontSize: 40 }} />
            Dog Tinder
          </Typography>

          <TextField
            sx={{ width: "50%" }}
            id="outlined-basic"
            label="Buscar"
            variant="outlined"
            value={buscador}
            onChange={()=>handleInputChange}
          />
        </Box>
      </Grid>
      {/* lista rechazados */}
      <Grid
        item
        xs={4}
        direction="column"
        sx={{
          minWidth: 500,
          minHeight: 350,
          maxHeight: "100vh",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <List
          sx={{
            overflow: "auto",
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
            margin: "auto",
            marginBottom: "100px",
          }}
        >
          {listaRechazados.map((item) => (
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                width: "100%",
              }}
            >
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
      {/* perro actual */}
      <Grid
        item
        xs={4}
        direction="column"
        sx={{
          minWidth: 500,
          minHeight: 350,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            width: "100%",
            maxHeight: "100vh",
          }}
        >
          <Card
            sx={{
              width: 500,
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
              {/* tags */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {perroActual.tags.map((tag) => tagRender(tag))}
              </Box>
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
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        direction="row"
        sx={{
          minWidth: 500,
          minHeight: 350,
          maxHeight: "100vh",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <List
          sx={{
            overflow: "auto",
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
            margin: "auto",
            marginBottom: "100px",
          }}
        >
          {listaAcepAux.map((item) => (
            <ListItem
              key={item.index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
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
