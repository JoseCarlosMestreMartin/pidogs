const axios = require("axios");
const { Dog, Temperament } = require("../db");

const { YOUR_API_KEY } = process.env;
const urlDogApi = "https://api.thedogapi.com/v1/breeds";

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
  } else if (height[0] && !isNaN(height[0])) {
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
  if (
    life_span[0] &&
    life_span[2] &&
    !isNaN(life_span[0]) &&
    !isNaN(life_span[2])
  ) {
    miDog.lifeSpanMin = parseInt(life_span[0].trim());
    miDog.lifeSpanMax = parseInt(life_span[2].trim());
  } else if (life_span[0] && !isNaN(life_span[0])) {
    miDog.lifeSpanMin = parseInt(
      Math.floor(parseFloat(life_span[0].trim()) * 0.9 * 10) / 10
    );
    miDog.lifeSpanMax = parseInt(
      Math.ceil(parseFloat(life_span[0].trim()) * 1.1 * 10) / 10
    );
  } else if (life_span[2] && !isNaN(life_span[2])) {
    miDog.lifeSpanMin = parseInt(
      Math.floor(parseFloat(life_span[2].trim()) * 0.9 * 10) / 10
    );
    miDog.lifeSpanMax = parseInt(
      Math.ceil(parseFloat(life_span[2].trim()) * 1.1 * 10) / 10
    );
  } else {
    miDog.lifeSpanMin = 1;
    miDog.lifeSpanMax = 4;
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
    !miDog.lifeSpanMin ||
    !miDog.lifeSpanMax
  ) {
    console.log(
      "falta un campo en la conversion de objetos de Dog de la api a dog de mi api",
      miDog
    );
    console.log("DogApi: ", DogApi);
  }
  return miDog;
};
const getAllDogsApi = async () => {
  let arrayDogApiAux = [];
  try {
    let aux = await axios.get(`${urlDogApi}?api_key=${YOUR_API_KEY}`);
    arrayDogApiAux = aux.data.map((e) => {
      return objDogApiToMiDog(e);
    });
    return arrayDogApiAux;
  } catch (error) {
    console.log("error", error.message);
  }
  return arrayDogApiAux;
};
//////////////
const getAllDogsDB = async () => {
  let arrayDogAux = [];
  try {
    //arrayDogAux = await Dog.findAll();
    let arrayAux = await Dog.findAll({
      include: {
        model: Temperament,
        atributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    //arrayDogAux = arrayAux;
    arrayDogAux = arrayAux.map(dog => { //mapea los datos de la bd
      let temp = dog.temperaments.map(t => t.name); //trae los temperamentos de la bd
      let auxTemp = temp.join(", "); //convierte el array de temperamentos en un string
      
      return {
          id: dog.id,
          image: dog.image,
          name: dog.name,
          heightMin: dog.heightMin,
          heightMax: dog.heightMax,
          weightMin: dog.weightMin,
          weightMax: dog.weightMax,
          lifeSpanMin: dog.lifeSpanMin,
          lifeSpanMax: dog.lifeSpanMax,
          temperament: auxTemp,
          isCcreated: dog.isCreated
      };

  });
   // console.log(" arrayAux: ", JSON.stringify(arrayAux));
    return arrayDogAux;

  } catch (error) {
    console.log("error", error.message);
  }

  return arrayDogAux;
};
///////////
const getAllDogs = async () => {
  let arrayDogsAPI = await getAllDogsApi();
  let arrayDogsDB = await getAllDogsDB();

  let arrayDogs = arrayDogsDB.concat(arrayDogsAPI);
  return arrayDogs;
};

const getDogsByName = async (name) => {
  try {
    let array = await getAllDogs();
    let aux = array.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    return aux;
  } catch (error) {
    console.log("error el busqueda de los perros por nombre");
    return "error el busqueda de los perros por nombre";
  }
};

const getDogsByID = async (id) => {
  try {
    let array = await getAllDogs();
    let aux = array.find((dog) => dog.id == id);
    return aux;
  } catch (error) {
    console.log("error el busqueda de los perros por id");
    return "error el busqueda de los perros por id";
  }
};
const getAllTemperamentsOfApi = async () => {
  try {
    let dogsAux = await getAllDogsApi();
    let tempAux = dogsAux
      .map((dog) => dog.temperament)
      .join()
      .split(",")
      .filter((e) => e.length > 1);
    tempAux = tempAux.map((temp) => temp.trim());
    return tempAux;
  } catch (error) {
    console.log("error el busqueda de temperamentos en la api");
    return "error el busqueda de temperamentos en la api";
  }
};
const getAllTemperaments = async () => {
  let auxTemps = await Temperament.findAll();
  if (auxTemps.length < 1) {
    let auxTempsOfApi = await getAllTemperamentsOfApi();
    auxTempsOfApi.forEach((e) => {
      Temperament.findOrCreate({ where: { name: e } });
    });
    auxTemps = await Temperament.findAll();
  }
  return auxTemps;
};

const createDog = async (dog) => {};

module.exports = { getAllDogs, getDogsByName, getDogsByID, getAllTemperaments };
