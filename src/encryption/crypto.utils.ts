import * as bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const isMatchPassword = async (
  password: string,
  hashedPassword: string,
) => await bcrypt.compare(password, hashedPassword ?? '');
