export const firebaseErrors = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "El email ya esta en uso"
      }
    case "auth/user-not-found":
      return {
        code: "email",
        message: "El usuario no existe"
      }
    case "auth/wrong-password":
      return {
        code: "password",
        message: "La contraseña es incorrecta"
      }
    default:
      return{
        code: "email",
        message: "Error desconocido"
      }
  }
};
