export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return {
    isValid:
      re.test(String(email).toLowerCase()) &&
      email.length <= 50 &&
      email.length >= 3,
    message: 'Por favor, ingrese un email válido',
  }
}

export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9]{3,}$/
  return {
    isValid:
      re.test(String(username)) &&
      username.length <= 20 &&
      username.length >= 3,
    message: 'Debe tener al menos 3 caracteres',
  }
}

export const validateName = (name) => {
  const re = /^[a-zA-Z ]{3,}$/
  return {
    isValid: re.test(String(name)) && name.length <= 20 && name.length >= 3,
    message: 'El nombre debe tener al menos 3 caracteres alfabéticos',
  }
}

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 6 && password.length <= 20,
    message: 'La contraseña debe tener entre 6 y 20 caracteres',
  }
}
export const validateBy = (value, type) => {
  switch (type) {
    case 'email':
      return validateEmail(value)
    case 'username':
      return validateUsername(value)
    case 'name':
      return validateName(value)
    case 'password':
      return validatePassword(value)
    default:
      return false
  }
}
export const formValidation = (form, isLogin) => {
  const errors = {}
  if (!validateUsername(form.username).isValid) {
    errors.username = 'El nombre de usuario es inválido'
  }
  if (!validatePassword(form.password).isValid) {
    errors.password = 'La contraseña es inválida'
  }
  if (!isLogin) {
    if (form.hasOwnProperty('email') && !validateEmail(form?.email).isValid) {
      errors.email = 'El email es inválido'
    }
    if (form.hasOwnProperty('name') && !validateName(form?.name).isValid) {
      errors.name = 'El nombre es inválido'
    }
  }

  return errors
}
