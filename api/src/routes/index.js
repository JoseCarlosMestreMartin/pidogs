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
  miDog.heightMin = parseInt(DogApi.height.metric.slice(0, 2).trim());
  miDog.heightMax = parseInt(DogApi.height.metric.slice(4).trim());
  miDog.weightMin = parseInt(DogApi.weight.metric.slice(0, 2).trim());
  miDog.weightMax = parseInt(DogApi.weight.metric.slice(4).trim());
  miDog.life_spanMin = parseInt(DogApi.life_span.slice(0, 2).trim());
  miDog.life_spanMax = parseInt(DogApi.life_span.slice(4).trim());
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
  )
    console.log(
      "falta un campo en la conversion de objetos de Dog de la api a dog de mi api"
    );
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
    console.log("${urlDogApi}?api_key=${YOUR_API_KEY}: ",`${urlDogApi}?api_key=${YOUR_API_KEY}`)
    try {
      let aux = await axios.get(`${urlDogApi}?api_key=${YOUR_API_KEY}`);
      console.log("arrayDogApiAux: ", aux.data);
      arrayDogApiAux = aux.data.map((e)=> {return objDogApiToMiDog(e)});
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
