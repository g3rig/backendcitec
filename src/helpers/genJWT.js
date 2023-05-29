import jwt from "jsonwebtoken";

// Generar token JWT
export const generarJWT = (uid, userRole) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid: uid,
      role: userRole,
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
