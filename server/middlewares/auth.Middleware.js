import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: "Token é necessário para autenticação" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET || 'seu_segredo_aqui');
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
  return next();
};
