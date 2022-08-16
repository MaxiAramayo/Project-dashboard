export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "Este campo es obligatorio",
    },
    patternEmail: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Formato de Email no valido",
    },
    minLength: {
      value: 6,
      message: "Minimo 6 caracteres",
    },
    validateTrim: {
      trim: (value) => {
        if (!value.trim()) {
          return "No se permiten espacios en blanco";
        }
        return true;
      },
    },
    validateSamePass(value) {
      return {
        equals: (v) => v === value || "Las contraseñas no coinciden",
      };
    },
  };
};
