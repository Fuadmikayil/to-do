// app/userpanel/page.js
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export default async function UserPanelPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If not signed in, redirect to sign-in
  if (!user) redirect('/signin')

  // user_metadata holds the extra fields you passed on sign-up
  const {
    email,
    user_metadata: { name, surname },
  } = user

  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Your Panel</h1>
      <p>
        <span className="font-semibold">Name:</span> {name}
      </p>
      <p>
        <span className="font-semibold">Surname:</span> {surname}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {email}
      </p>

      <form action={handleSignOut}>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
        >
          Sign Out
        </button>
      </form>

      <Link href="/" className="text-blue-400 underline">
        Back to Home
      </Link>
    </main>
  )
}

// Server Action to sign out
async function handleSignOut() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
