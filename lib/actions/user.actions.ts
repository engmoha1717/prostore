"use server"

import { signInFormSchema } from "../validators"
import { signIn,signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"  ;

export async function signInWithCredentials(prevState :unknown,formData: FormData) {
    try {
        const user =signInFormSchema.parse({
            email:formData.get("email") as string,
            password:formData.get("password") as string
        })
        
        await signIn('credentials',user)
        return {success: true, message :"Signed in successfully"}
    } catch (error) {
        if (isRedirectError(error)) {
            //return {success: false, message: error.message}
            throw error
        }
        return {success: false, message: "invalid email or password"}
    }
}


// Sign user out
export async function signOutUser() {
    await signOut();
  }

export async function signUpUser(prevState: unknown, formData: FormData) {
    console.log(prevState,formData)
    return { success: true, message: 'User registered successfully' };
}
