const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// const axios = require("axios");
const { Temperament, Dog } = require("../db");
const {
  getAllDogs,
  getDogsByName,
  getDogsByID,
  getAllTemperaments,
} = require("../Controllers/Controllers");
// const { YOUR_API_KEY } = process.env;
// const urlDogApi = "https://api.thedogapi.com/v1/breeds";

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// 📍 GET | /dogs
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.
router.get("/dogs", async (req, res, next) => {
  const name = req.query.name;
  if (name) {
    /// retornar un array de las razas que incluyan name en su name
    try {
      let aux = await getDogsByName(name);
      return res.send(aux);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    //retornar todas las razas
    try {
      let aux = await getAllDogs();
      return res.send(aux);
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
router.get("/dogs/:idRaza", async (req, res, next) => {
  const idRaza = req.params.idRaza;
  if (idRaza) {
    /// retornar un objeto
    try {
      let aux = await getDogsByID(idRaza);
      return res.json(aux);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    console.log("no existe idRaza");
  }
});
// 📍 GET | /dogs/name?="..."
// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

// 📍 POST | /dogs
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).
router.post("/dogs", async (req, res) => {
  const {
    image,
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpanMin,
    lifeSpanMax,
    temperament,
  } = req.body;
  if (
    !name ||
    !heightMin ||
    !heightMax ||
    !weightMin ||
    !weightMax ||
    !lifeSpanMin ||
    !lifeSpanMax ||
    !temperament
  ) {
    return res.status(400).send("Faltan datos");
  }
  if (
    heightMin >= heightMax ||
    weightMin >= weightMax ||
    lifeSpanMin >= lifeSpanMax
  ) {
    return res.status(400).send("Los mìnimos deben ser menores a los máximos");
  }
  try {
    let dog = await Dog.create({
      image:
        image ||
        "https://www.mundoprimaria.com/wp-content/uploads/2019/07/dibujos-perros-para-colorear.jpg",
      name,
      heightMin: parseFloat(heightMin),
      heightMax: parseFloat(heightMax),
      weightMin: parseFloat(weightMin),
      weightMax: parseFloat(weightMax),
      lifeSpanMin: parseInt(lifeSpanMin),
      lifeSpanMax: parseInt(lifeSpanMax),
      isCreated: true,
    });
    
    temperament.forEach( async (e) => {
      let tempObj = await Temperament.findOrCreate({
        where: { name: e },
      });
    console.log("tempObj: ",JSON.stringify(tempObj));
    console.log("tempObj[0].id: ",JSON.stringify(tempObj[0].id));
      //await dog.addTemperament(tempObj);
      await dog.addTemperament(tempObj[0].id);
      
    });
    return res.status(200).send(dog);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// 📍 GET | /temperaments
// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
router.get("/temperaments", async (req, res, next) => {
  /// retornar un array
  try {
    let aux = await getAllTemperaments();
    return res.send(aux);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
