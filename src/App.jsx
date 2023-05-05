import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import PetsIcon from "@mui/icons-material/Pets";
import imageLoading from './assets/loading.gif';
import uniqid from "uniqid";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import { useQueryImagenes } from "./Queries/queryImagenes";
import CircularProgress from '@mui/material/CircularProgress';
import { DisplaySettings } from "@mui/icons-material";
import { useMediaQuery } from '@mui/material';

function App() {
  const [listaRechazados, setListaRechazados] = useState([]);
  const [listaAceptados, setListaAceptados] = useState([]);
  const [listaRechaAux, setListaRechaAux] = useState([]);
  const [listaAcepAux, setListaAcepAux] = useState([]);
  const [buscador, setBuscador] = useState("");
  const isXsScreen = useMediaQuery('(max-width:600px)');//para saber si la pantalla es pequeña
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
      setListaAcepAux(listaAceptados);
      setListaRechaAux(listaRechazados);
    }
  }, [buscador]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBuscador(value);
  };

  const {
    data: PerroActual,
    isFetching: loading,
    isError: error,
    isSuccess: success,
    refetch: refetch,
  } = useQueryImagenes();

  console.log("PerroActual", PerroActual);

  const cambiarEstado = (item) => {
    if (listaAceptados.includes(item)) {
      // eliminar de la lista de aceptados
      setListaAcepAux(listaAcepAux.filter((perro) => perro !== item));
      setListaAceptados(listaAceptados.filter((perro) => perro !== item));

      // agregar a la lista de rechazados
      setListaRechazados([item, ...listaRechazados]);
      setListaRechaAux([item, ...listaRechaAux]);

    } else if (listaRechazados.includes(item)) {
      // eliminar de la lista de rechazados
      setListaRechazados(listaRechazados.filter((perro) => perro !== item));
      setListaRechaAux(listaRechaAux.filter((perro) => perro !== item));

      // agregar a la lista de aceptados
      setListaAceptados([item, ...listaAceptados]);
      setListaAcepAux([item, ...listaAcepAux]);
    }
  };

  const aceptarPerro = () => {
    setListaAceptados((listaAceptados) => [PerroActual, ...listaAceptados]);
    setListaAcepAux((listaAcepAux) => [PerroActual, ...listaAcepAux]);
    refetch();
  };

  const rechazarPerro = () => {
    setListaRechazados((listaRechazados) => [PerroActual, ...listaRechazados]);
    setListaRechaAux((listaRechaAux) => [PerroActual, ...listaRechaAux]);
    refetch();
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
        overflow: "auto",
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
        xs={12}
        md={4}
        direction="row"
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
                objectPosition: "center",
              }}
              image={loading ? imageLoading : PerroActual?.imagen}
              alt="Contemplative Reptile"
            />
            {loading ? (
              <CircularProgress sx={{ margin: 7 }} />
            ) : (
              <><CardContent>

                <Typography gutterBottom variant="h5">{PerroActual?.name}</Typography>

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
                  {PerroActual?.tags.map((tag) => tagRender(tag))}
                </Box>
                <Typography>{PerroActual?.description}</Typography>
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
                  image={item.imagen}
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
                      flexDirection: isXsScreen ? "column" : "row" ,
                      gap: 1,
                    }}
                  >
                    <Grid xs={12} md={9}>
                      <Accordion
                        sx={{
                          backgroundColor: "#e8cfc1",
                          color: "black",
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography sx={{ overflowWrap: "break-spaces" }} >Descripción</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{item.description}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
                      <Box sx={{ marginTop: "auto" }}>
                        <Tooltip title="Cambiar a rechazados">
                          <Button
                            onClick={() => cambiarEstado(item)}
                            sx={{
                              backgroundColor: "#ac4147",
                              color: "#e8cfc1",
                              ":hover": {
                                backgroundColor: "#e8cfc1",
                                color: "#ac4147",
                              },
                            }}
                          >
                            <ArrowForwardIosIcon />
                          </Button>
                        </Tooltip>
                      </Box>
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
                  image={item.imagen}
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
                      flexDirection: isXsScreen ? "column" : "row" ,
                      gap: 1,
                    }}
                  >
                    <Grid xs={12} md={9}>
                      <Accordion
                        sx={{
                          backgroundColor: "#e8cfc1",
                          color: "black",
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Descripción</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{item.description}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
                      <Box sx={{ marginTop: "auto" }}>
                        <Tooltip title="Cambiar a rechazados">
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
                            <ArrowForwardIosIcon />
                          </Button>
                        </Tooltip>
                      </Box>
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
