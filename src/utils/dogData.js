
function getFrase ()  {
    var frases = [
        "Bueno, estoy orgulloso de mí mismo. ¿Quieres saber por qué? Desliza el dedo hacia la derecha.",
        "Soy tu marido del año 2050. Después de que un trágico accidente se cobrara tu vida, me llené de una cantidad imposible de dolor. Usando todos mis fondos y recursos, he construido la primera máquina del tiempo del mundo en un intento de salvar tu vida. Para mantener la línea de tiempo natural intacta, debemos coincidir en Tinder en 2022. Espero que hagas lo correcto, por ti y por el destino del universo.",
        "Dime una sola buena razón por la que sigues soltero. Y, entonces, seguimos adelante.",
        "Si te he bloqueado en Facebook, te he dejado de seguir en Instagram o te he denunciado en Twitter, no se te ocurra contactar conmigo aquí.",
        "Primero, pide una pizza para mí. Solo entonces te entregaré mis fotos.",
        "Pasa el dedo por la derecha y jode tu vida. Pasa el dedo por la izquierda y salva tu vida.",
        "¿Necesitas que alguien me guíe sobre cómo funcionan las cosas en Tinder?",
        "Definitivamente, puedes llamarme una buena chica. Pero, también puedo ser mala, si quieres.",
        "Una reina del drama certificada. Asegúrate de estar preparado para eso de antemano.",
        "Mido 1,90, pero te prometo que no soy una asesina en serie.",
        "Busco a un chico que nunca haya hablado con ninguna chica, que no se haya enrollado con nadie y que ni siquiera tenga un perfil en Tinder.",
        "Te reto a que ignores este perfil. Sé que no puedes. Ahora, desliza el dedo hacia la derecha.",
        "¿Sientes que soy demasiado caliente para manejar? Entonces, mejor aléjate. No quiero freírte.",
        "¿Podemos dejar de hablar y arreglar nuestra cita?",
        "Solo busco a alguien que pueda apreciar mis ingeniosos juegos de palabras.",
        "Cansado de Netflix y escalofríos, ¿Tienes algo nuevo que ofrecer? Entonces desliza a la derecha.",
        "Si buscas una noche romántica, probablemente no soy tu hombre.",
        "Respétame y yo haré lo mismo. Jódeme y te joderé el doble.",
        "Casado. Un par de niños. Buscando algo de acción lateral. Es una broma. Soltero. Tres tamagotchis. Buscando a alguien a quien llevar a los eventos familiares para que dejen de pensar que me pasa algo.",
        "A las chicas de más de 30 años: Soy anestesista y busco formar una familia. A las chicas menores de 30: Soy colgado y crío cachorros de labrador.",
        "Pensemos en esto. Nos encontramos y lo pasamos muy bien, salimos durante un año, nos casamos, tenemos dos hijos y 5 años después empezamos a pelearnos, los dos nos dedicamos al alcohol, nos divorciamos y los niños son infelices. O nos encontramos y lo pasamos bien, nos enrollamos, tú te alejas y yo hago el camino de la vergüenza y no te vuelvo a ver. Piensa en los niños.",
        "No soy solo una cara bonita; también tengo un cerebro.",
        "Soy el tipo bueno de chico malo.",
        "Busco a alguien que haga que mi fin de semana sea increíble.",
        "¿Buscas un tipo que literalmente pueda borrar Tinder después de nuestra primera cita?",
        "Este lugar es solo para un tipo que no ha establecido una contraseña móvil.",
        "Al chico de más de 1,80 metros: desliza a la derecha. Busco un decorador de casas urgentemente.",
        "Necesito un chico con confianza como un Internet Explorer que se atreva a pedirte que lo conviertas en tu navegador por defecto, todavía.",
        "¿Eres un meme? Porque me gustaría enseñarte a mis amigos y espero que les gustes tanto como a mí.",
        "Soy el equivalente humano de una resaca de domingo por la mañana.",
        "Mi mejor amiga dice que tengo mal gusto. ¿Quieres demostrar que está equivocada?",
        "Mi alma gemela probablemente navegó por el triángulo de las Bermudas. Porque no puedo localizarlo en ningún otro lugar.",
        "Serás mi primer objetivo si te deslizas hacia la derecha.",
        "¡¡Qué!! ¿La foto de perfil no es suficiente? ¿Quieres más? Desliza a la derecha.",
        "Sí, me dolió cuando caí del cielo. ¿Eres feliz ahora?",
        "Sigue adelante solo si eres soltero, sexy y serio para una relación.",
        "Cuidado: demasiada actitud por delante.",
        "Vino viejo con la botella nueva, pero de mejor sabor.",
        "Solo la presión de la familia me trajo aquí. No me decepciones.",
        "Si tienes objetivos, ¿qué haces aquí?",
        "Buscando a un tipo duro para mi culo inteligente.",
        "Sigue adelante y no vuelvas atrás. No me gustan los chicos que se arrepienten.",
        "De rubor a rubor. Y aquí estamos en Tinder… Todos buscando un «Amor». ¿No es irónico?",
        "Buscando un chico que sea tan serio para formar una familia como mis padres esperan que sea a esta edad. Para poder librarme de esa carga familiar y de esa mirada preocupada de mis vecinos.",
        "Si alguna vez intentas pasarte de la raya o jugar conmigo, estoy segura de que me casaré contigo y te joderé toda la vida.",
        "No soy la típica Dreamgirl.",
        "Se acabaron los ligues o los rollos de una noche, solo se permiten relaciones serias… Dijo ningún perfil de Tinder jamás.",
        "No te limites a hablar. Muéstralo.",
        "No odies a la gente sola. Odiémoslas juntos.",
        "Seguro que luego te sorprenderás.",
    ];

    

  const temp = frases[getRandomInt(0, frases.length)];
  if (temp === undefined) return "";
  return temp;
};

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

export { getFrase, generateTags };
