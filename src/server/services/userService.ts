export const userService = {
  authenticate,
}

function authenticate(username: string, password: string){
  if(username !== "admin" && password !== "admin"){
    // For the simplicity of the code we just hardcode the username and password to admin. Later you have to change this to match your specific application needs (either database lookup or from an external API)
    return null;
    // If the user does not authenticate we return null. We will also allow the ui to show the error message to make the user check the details without giving them a hint.
  }

  const user = {
    id: '9',
    name: 'Aria Laurel',
    email: 'admin@example.com',
    // Pretend the user is authenticated we can create the user object and fill it with the details
  }
  return user;
}