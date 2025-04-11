import * as bcrypt from 'bcrypt'

export const hashPassword = async (password:string):Promise<string>=>{
  const saltrounds:number=10;
  const hash:string = await bcrypt.hash(password,saltrounds);
  return hash;
}

export const validHash = async (password:string,hash:string):Promise<boolean>=>{
    return await bcrypt.compare(password,hash);
}