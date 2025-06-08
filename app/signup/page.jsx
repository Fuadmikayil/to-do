// app/signup/page.jsx
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import SignUpForm from './SignUpForm'

export default async function SignUpPage() {
  // Redirect logged-in users to their panel
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) redirect('/userpanel')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Create an Account</h1>

      <SignUpForm />

      <p className="mt-4">
        Already have an account?{' '}
        <Link href="/signin" className="text-blue-400 underline">
          Sign In
        </Link>
      </p>
    </main>
  )
}
