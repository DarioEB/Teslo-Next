import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { jwt } from '../../../utils';
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
      return loginUser(req, res);
    
    default:
      res.status(400).json({
        message: 'Bad request' 
      })
  }

} 


const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { email = '', password = '' } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: 'Datos no válidos' });
  }

  if (!bcryptjs.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'Datos no válidos' }); 
  }

  const { role, name, _id } = user;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    user: { email, role, name },
    token
  });
}