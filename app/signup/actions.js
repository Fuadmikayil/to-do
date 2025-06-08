// app/signup/actions.js
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function handleSignUp(_, formData) {
  const supabase = await createClient()
  const name     = formData.get('name')
  const surname  = formData.get('surname')
  const email    = formData.get('email')
  const password = formData.get('password')

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, surname } },
  })

  if (error) {
    // Return a serializable object with your error message
    return { message: error.message }
  }

  // On success, redirect the user
  redirect('/signin')
}
