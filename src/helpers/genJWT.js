import jwt from "jsonwebtoken";

// Generar token JWT
export const generarJWT = (uid, userRole, userName, userLastName, userEmail) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid: uid,
      role: userRole,
      name: userName,
      lastName: userLastName,
      email: userEmail
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
