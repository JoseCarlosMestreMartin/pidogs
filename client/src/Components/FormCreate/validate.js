export default function validate(form) {
  var errors = {
    image: "",
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    temperament: "",
  };
  if (!form.image) errors.image = "El campo debe contener un texto";
  if (!form.name) errors.name = "El campo debe contener un texto";
  if (!form.heightMin) errors.heightMin = "El campo debe contener un texto";
  if (!form.heightMax) errors.heightMax = "El campo debe contener un texto";
  if (form.heightMax && form.heightMin) {
    if (form.heightMax < form.heightMin) {
      errors.heightMin = "La altura máxima debe ser mayor que la mínima";
      errors.heightMax = "La altura máxima debe ser mayor que la mínima";
    }
  }

  if (!form.weightMin) errors.weightMin = "El campo debe contener un texto";
  if (!form.weightMax) errors.weightMax = "El campo debe contener un texto";
  if (form.weightMax && form.weightMin) {
    if (form.weightMax < form.weightMin) {
      errors.weightMin = "El peso máximo debe ser mayor que el mínimo";
      errors.weightMax = "El peso máximo debe ser mayor que el mínimo";
    }
  }
  
  if (!form.lifeSpanMin) errors.lifeSpanMin = "El campo debe contener un texto";
  if (!form.lifeSpanMax) errors.lifeSpanMax = "El campo debe contener un texto";
  if (form.lifeSpanMax && form.lifeSpanMin) {
    if (form.lifeSpanMax < form.lifeSpanMin) {
      errors.lifeSpanMin = "La edad máxima debe ser mayor que la mínima";
      errors.lifeSpanMax = "La edad máxima debe ser mayor que la mínima";
    }
  }
  
  if (!form.temperament) errors.temperament = "El campo debe contener un texto";
  return errors;
}
