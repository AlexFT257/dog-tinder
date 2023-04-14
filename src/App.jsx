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
    setListaAceptados((listaAceptados) => [...listaAceptados, perroActual]);
    buscarImagenPerro();
  };

  // const randomDogs = () => {
  //   fetch("https://dog.ceo/api/breeds/image/random")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);

  //       setPerroActual({ name: generateName(), image: data.message });
  //     });
  // };

  // useEffect(() => {
  //   randomDogs();
  // }, []);

  const rechazarPerro = (perroActual) => {
    console.log("rechazado");
    console.log(perroActual);
    setListaRechazados([...listaRechazados, perroActual]);
    // randomDogs();
    buscarImagenPerro();
  };

  return (
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        {/* lista rechazados */}
        <Grid item xs={4}  direction="column" sx={{ }}>
          <List rowHeight={100} cols={1} style={{}}>
            {listaRechazados.map((item) => (
              <ListItem>
                <Card direction="column" key={item.name}>
                  <CardMedia
                    component="img"
                    style={{
                      width: "",
                      height: "",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                    image={item.image}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {console.log(item.name)}
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={4} direction="column" >
          <Card >
            
              <CardMedia
                component="img"
                width="500px"
                height="250px"
                image={perroActual.image}
                alt="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {perroActual.name}
                </Typography>
              </CardContent>
            <CardActions>
              <Button onClick={()=>rechazarPerro(perroActual)} size="small" color="primary">
                Rechazar
              </Button>
              <Button onClick={()=>aceptarPerro(perroActual)} size="small" color="primary">
                Aceptar
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4} direction="row" style={{alignItems: "center"}} >
          <List style={{alignItems: "center"}}>
            {listaAceptados.map((item) => (
              <ListItem>
                <Card direction="column"  key={item.name}>
                  <CardMedia
                    component="img"
                    style={{
                      maxWidth: "500px",
                      maxHeight: "250px",
                      objectFit: "contain",
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
