import {z} from 'zod'
import {baseSignUpSchema} from '../../sign-up/lib/sign-up-schema'

export const signInSchema = baseSignUpSchema.pick({email: true, password: true})
export type SignInBody = z.infer<typeof signInSchema>
