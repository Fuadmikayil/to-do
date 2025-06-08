// app/signin/page.js
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export default async function SignInPage() {
  // If already signed in, send to user panel
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) redirect('/userpanel')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Sign In</h1>

      <form action={handleSignIn} className="w-full max-w-sm flex flex-col space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Sign In
        </button>
      </form>

      <p>
        Don’t have an account?{' '}
        <Link href="/signup" className="text-indigo-400 underline">
          Sign Up
        </Link>
      </p>
    </main>
  )
}

// Server Action to handle sign-in
async function handleSignIn(formData) {
  'use server'
  const supabase = await createClient()
  const email = formData.get('email')
  const password = formData.get('password')

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    // For now, we'll just throw — you can add UI feedback later
    throw new Error(error.message)
  }

  // On success, send them to their user panel
  redirect('/userpanel')
}
