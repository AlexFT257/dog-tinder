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
import axios from "axios";
import dogNames from "dog-names";
import uniqid from "uniqid";
import PetsIcon from "@mui/icons-material/Pets";
import { createTheme } from '@mui/material/styles';
import imageLoading from './assets/loading.gif';
import archivoFrases from './assets/frases.txt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import { useQueryImagenes } from "./Queries/queryImagenes";
import CircularProgress from '@mui/material/CircularProgress';
import { margin } from "@mui/system";


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
    description: "",
  });
  const [buscador, setBuscador] = useState("");
  const [frases, setFrases] = useState([]);
  const [params, setParams] = useState({});


  // * Frases

  function leerArchivo() {
    fetch(archivoFrases)
      .then((respuesta) => respuesta.text())
      .then((contenido) => {
        const lineas = contenido.split("\n");
        setFrases(lineas);
      });
  }

  // * Funciones

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
    leerArchivo();
    setPerroActual({
      index: 0,
      tags: generateTags(),
    });
    buscarImagenPerro();
  }, []);

  // use effect para filtrar los perros por nombre y tags
  useEffect(() => {
    if (buscador.trim() !== "") {
      setListaAcepAux(
        listaAceptados.filter(
          (item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(buscador.toString().toLowerCase().trim()) ||
            item.tags
              .toString()
              .toLowerCase()
              .includes(buscador.toString().toLowerCase().trim())
        )
      );
      setListaRechaAux(
        listaRechazados.filter(
          (item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(buscador.toString().toLowerCase().trim()) ||
            item.tags
              .toString()
              .toLowerCase()
              .includes(buscador.toString().toLowerCase().trim())
        )
      );
    } else {
      setListaRechaAux(listaRechazados);
      setListaAcepAux(listaAceptados);
    }
  }, [buscador]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBuscador(value);
  };

  const {
    data: imgPerro,
    isFetching: loading,
    isError: error,
    isSuccess: success,
  } = useQueryImagenes(params);

  const respone = useQueryImagenes(params);

  console.log("respone", respone?.data?.message);

  console.log("rq", imgPerro?.message);

  const buscarImagenPerro = () => {
    setPerroActual({
      index: perroActual.index + 1,
      name: dogNames.allRandom(),
      image: imgPerro?.message,
      tags: generateTags(),
      description: getFrase(),
    });
    setBuscador("");
  };

  const getFrase = () => {
    const temp = frases[getRandomInt(0, frases.length)];
    if (temp === undefined) return ""
    return temp.replace(/\${perroActual.name}/g, perroActual.name);
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
            backgroundColor: "#5a3f28",
            color: "#dca899",
            margin: 0.5,
            "&:hover": {
              backgroundColor: "#dca899",
              color: "#5a3f28",
            },
          }}
        />
      );
    }
  };

  //paleta de colores:
  //#523e27 texto
  //#ce6857 Fondo
  //#e8cfc1 secundario
  //#A87008 fondo secundario
  //#E8CFC1 texto secundario
  //#F2BD99 texto secundario 2

  const theme = createTheme({
    palette: {
      primary: {
        main: "#e8cfc1",
      },
    },
  });

  return (
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          display: "flex",
          margin: 0,
          maxHeight: "100vh",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        {/* header / buscador */}
        <Grid item xs={12} sx={{ padding: 2, backgroundColor: "#ce6857" }}>
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
              Dog Line
            </Typography>
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
        {/* perro actual */}
        <Grid
          item
          xs={8}
          md={4}
          direction="column"
          sx={{
            maxWidth: 500,
            marginTop: 2,
            marginBottom: 2,
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
                backgroundColor: "#ae5c4c",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  maxHeight: 250,
                  objectFit: "cover",
                }}
                image={loading ? imageLoading : perroActual.image}
                alt="Contemplative Reptile"
              />
              {loading ? (
                <CircularProgress sx={{margin: 7}}/>
              ) : (
                <><CardContent>

                  <Typography gutterBottom variant="h5">{perroActual.name}</Typography>

                  {/* tags */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {perroActual.tags.map((tag) => tagRender(tag))}
                  </Box>
                  <Typography>{perroActual.description}</Typography>
                </CardContent><CardActions sx={{ justifyContent: "space-around" }}>
                    <Tooltip title="Rechazar">
                      <Button
                        onClick={() => rechazarPerro()}
                        size="small"
                        disabled={loading}
                        color="primary"
                        sx={{
                          backgroundColor: "#ac4147",
                          color: "#e8cfc1",
                          ":hover": {
                            backgroundColor: "#e8cfc1",
                            color: "#ac4147",
                          }
                        }}
                      >
                        <HeartBrokenIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Aceptar">
                      <Button
                        onClick={() => aceptarPerro()}
                        size="small"
                        color="primary"
                        disabled={loading}
                        sx={{
                          backgroundColor: "#79b5ac",
                          color: "#e8cfc1",
                          ":hover": {
                            backgroundColor: "#e8cfc1",
                            color: "#79b5ac",
                          }
                        }}
                      >
                        <FavoriteIcon />
                      </Button>
                    </Tooltip>
                  </CardActions></>
              )}
            </Card>
          </Box>
        </Grid>
        {/* Lista aceptados */}
        <Grid
          item
          xs={6}
          md={4}
          direction="row"
          sx={{
            maxWidth: 500,
            maxHeight: "100vh",
            overflow: "auto",
            scrollbarWidth: "none",
            transition: "all 0.5s ease",
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
                  sx={{ width: 500, backgroundColor: "#79b5ac", }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      maxHeight: 250,
                      objectFit: "cover",
                    }}
                    image={item.image}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ color: "#2BD99" }} >
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {item.tags.map((tag) => tagRender(tag))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        direction: "row",
                        gap: 1,
                      }}
                    >
                      <Grid md={9}>
                        <Accordion
                          sx={{
                            backgroundColor: "#e8cfc1",
                            color: "black",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Typography>Descripción</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              {item.description}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                      <Grid md={3} sx={{ display: "flex", justifyContent: "end"}} >
                        <Tooltip title="Cambiar a rechazados">
                          <Button onClick={() => cambiarEstado(item)} sx={{
                            backgroundColor: "#ac4147",
                            color: "#e8cfc1",
                            ":hover": {
                              backgroundColor: "#e8cfc1",
                              color: "#ac4147",
                            }
                          }} >
                            <ArrowForwardIosIcon />
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
        {/* Lista rechazados */}
        <Grid
          item
          xs={6}
          md={4}
          direction="column"
          sx={{
            maxWidth: 500,
            maxHeight: "100vh",
            overflow: "auto",
            scrollbarWidth: "none",
            backgroundColor: "#e8cfc1",
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
            {listaRechaAux.map((item) => (
              <ListItem key={item.index}
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
                  sx={{ width: 500, backgroundColor: "#ac4147", }}
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
                    <Typography sx={{ color: "#E8CFC1" }} variant="h5" component="div">
                      {item.name}
                      {/* chips de tags */}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {item.tags.map((tag) => tagRender(tag))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        direction: "row",
                        gap: 1,
                      }}
                    >
                      <Grid item xs={3} sx={{ display: "flex", justifyContent: "start"}}>
                        <Tooltip title="Cambiar a aceptados" sx={{}}>
                          <Button
                            onClick={() => cambiarEstado(item)}
                            sx={{
                              backgroundColor: "#79b5ac",
                              color: "#e8cfc1",
                              ":hover": {
                                backgroundColor: "#e8cfc1",
                                color: "#79b5ac",
                              },
                            }}
                          >
                            <ArrowBackIosIcon />
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={9} sx={{ display: "flex", justifyContent: "end"}}>
                        <Accordion sx={{ backgroundColor: "#e8cfc1", color: "black" }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography>Descripción</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{item.description}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Box>
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
