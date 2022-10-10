
import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { jwt, validations } from '../../../utils';
import { db } from '../../../database';
import { User } from '../../../models';

type Data =
  | { message: string; }
  | { 
    token: string;
    user: {
      email: string;
      name: string;
      role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return registerUser(req, res);
    
    default:
      res.status(400).json({
        message: 'Bad request' 
      })
  }

} 


const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string};
 
  // Validación de tamaño de password
  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe contener al menos 6 caracteres'})
  } 

  // Validación de nombre 
  if (name.length < 3) {
    return res.status(400).json({ message: 'El nombre debe tener al menos 3 caracteres'})
  } 
  
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: 'El formato del correo no es válido' });
  }
  
  await db.connect();
  const user = await User.findOne({ email }); 

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'Ese correo ya está registrado' });
  }
  
  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcryptjs.hashSync(password),
    role: 'client',
    name
  });

  try {
    // Validación al crear el usuario
    await newUser.save({ validateBeforeSave: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: 'Revisar logs del servidor'})
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    user: { email, role, name },
    token
  });
}