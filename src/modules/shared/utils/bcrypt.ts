import { hash, compare } from 'bcrypt'

export async function genHash(password: string): Promise<string> {
  return await hash(password, 15)
}

export async function comparePass(password: string, hash: string): Promise<boolean> {
  return await compare(password, hash)
}
