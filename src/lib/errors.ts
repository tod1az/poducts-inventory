export const errors = {
  getLoginErrors: (error: string) => {
    if (error === "400") return loginErrors.badRequest
    if (error === "404") return loginErrors.notFound
    return loginErrors.unknown
  },
}

const loginErrors = {
  badRequest: "Falta el nombre de usuario",
  notFound: "Usuario no encontrado",
  unknown: "Error desconocido",
}
