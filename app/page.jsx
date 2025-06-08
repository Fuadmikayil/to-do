// app/page.js
import Link from 'next/link'
import { createClient } from '../utils/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Welcome to My App</h1>

      {user ? (
        <Link
          href="/userpanel"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Your Panel
        </Link>
      ) : (
        <div className="space-x-4">
          <Link
            href="/signin"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-indigo-500 text-white rounded"
          >
            Sign Up
          </Link>
        </div>
      )}
    </main>
  )
}
