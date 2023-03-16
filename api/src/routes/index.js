const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const axios = require("axios");
const { Temperament, Dog } = require("../db");
const { YOUR_API_KEY } = process.env;
const urlDogApi = "https://api.thedogapi.com/v1/breeds";

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const objDogApiToMiDog = (DogApi) => {
  let miDog = {};
  miDog.id = DogApi.id;
  miDog.image = DogApi.image.url;
  miDog.name = DogApi.name;

  //height
  let height = DogApi.height.metric.split("-");
  if (height[0] && height[1] && !isNaN(height[0]) && !isNaN(height[1])) {
    miDog.heightMin = parseFloat(height[0].trim());
    miDog.heightMax = parseFloat(height[1].trim());
  } else if (height[0]  && !isNaN(height[0])) {
    miDog.heightMin = Math.floor(parseFloat(height[0].trim()) * 0.9 * 10) / 10;
    miDog.heightMax = Math.ceil(parseFloat(height[0].trim()) * 1.1 * 10) / 10;
  } else if (height[1] && !isNaN(height[1])) {
    miDog.heightMin = Math.floor(parseFloat(height[1].trim()) * 0.9 * 10) / 10;
    miDog.heightMax = Math.ceil(parseFloat(height[1].trim()) * 1.1 * 10) / 10;
  } else {
    miDog.heightMin = 0.0;
    miDog.heightMax = 1.0;
  }
  //
  //weight
  let weight = DogApi.weight.metric.split("-");
  if (weight[0] && weight[1] && !isNaN(weight[0]) && !isNaN(weight[1])) {
    miDog.weightMin = parseFloat(weight[0].trim());
    miDog.weightMax = parseFloat(weight[1].trim());
  } else if (weight[0] && !isNaN(weight[0])) {
    miDog.weightMin = Math.floor(parseFloat(weight[0].trim()) * 0.9 * 10) / 10;
    miDog.weightMax = Math.ceil(parseFloat(weight[0].trim()) * 1.1 * 10) / 10;
  } else if (weight[1] && !isNaN(weight[1])) {
    miDog.weightMin = Math.floor(parseFloat(weight[1].trim()) * 0.9 * 10) / 10;
    miDog.weightMax = Math.ceil(parseFloat(weight[1].trim()) * 1.1 * 10) / 10;
  } else {
    miDog.weightMin = 0.1;
    miDog.weightMax = 1.0;
  }
  //

  //life_span
  let life_span = DogApi.life_span.split(" ");
  if (life_span[0] && life_span[2] && !isNaN(life_span[0]) && !isNaN(life_span[2])) {
    miDog.life_spanMin = parseInt(life_span[0].trim());
    miDog.life_spanMax = parseInt(life_span[2].trim());
  } else if (life_span[0] && !isNaN(life_span[0])) {
    miDog.life_spanMin = parseInt(
      Math.floor(parseFloat(life_span[0].trim()) * 0.9 * 10) / 10
    );
    miDog.life_spanMax = parseInt(
      Math.ceil(parseFloat(life_span[0].trim()) * 1.1 * 10) / 10
    );
  } else if (life_span[2] && !isNaN(life_span[2])) {
    miDog.life_spanMin = parseInt(
      Math.floor(parseFloat(life_span[2].trim()) * 0.9 * 10) / 10
    );
    miDog.life_spanMax = parseInt(
      Math.ceil(parseFloat(life_span[2].trim()) * 1.1 * 10) / 10
    );
  } else {
    miDog.life_spanMin = 1;
    miDog.life_spanMax = 4;
  }
  //
  miDog.isCreated = false;
  miDog.temperament = DogApi.temperament;
  if (
    !miDog.id ||
    !miDog.image ||
    !miDog.name ||
    !miDog.heightMin ||
    !miDog.heightMax ||
    !miDog.weightMin ||
    !miDog.weightMax ||
    !miDog.life_spanMin ||
    !miDog.life_spanMax
  ) {
    console.log(
      "falta un campo en la conversion de objetos de Dog de la api a dog de mi api",
      miDog
    );
    console.log("DogApi: ",DogApi);
  }
  return miDog;
};

// 📍 GET | /dogs
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.
router.get("/dogs", async (req, res, next) => {
  const name = req.query.name;
  let arrayDogApiAux = [];
  if (name) {
    console.log("si hay nombre por query, entonces buscar la raza");
    return res.status(404).send("No esta impplementada esta busqueda");
  } else {
    //retornar todas las razas, api y db
    // console.log(
    //   "${urlDogApi}?api_key=${YOUR_API_KEY}: ",
    //   `${urlDogApi}?api_key=${YOUR_API_KEY}`
    // );
    try {
      let aux = await axios.get(`${urlDogApi}?api_key=${YOUR_API_KEY}`);
      //console.log("arrayDogApiAux: ", aux.data);
      arrayDogApiAux = aux.data.map((e) => {
        return objDogApiToMiDog(e);
      });
      return res.send(arrayDogApiAux);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
});
// 📍 GET | /dogs/:idRaza
// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro (ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

// 📍 GET | /dogs/name?="..."
// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

// 📍 POST | /dogs
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

// 📍 GET | /temperaments
// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

module.exports = router;
