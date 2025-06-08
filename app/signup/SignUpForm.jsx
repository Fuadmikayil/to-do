// app/signup/SignUpForm.jsx
'use client'

import { useActionState } from 'react'
import { handleSignUp }      from './actions'

export default function SignUpForm() {
  // initialState must match the shape you return on error
  const initialState = { message: '' }
  const [state, formAction, pending] = useActionState(handleSignUp, initialState)

  return (
    <form
      action={formAction}
      className="w-full max-w-sm flex flex-col space-y-4"
    >
      <input name="name"     type="text"     placeholder="First Name" className="border p-2 rounded" />
      <input name="surname"  type="text"     placeholder="Surname"    className="border p-2 rounded" />
      <input name="email"    type="email"    placeholder="Email"      className="border p-2 rounded" />
      <input name="password" type="password" placeholder="Password"   className="border p-2 rounded" />

      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
      >
        {pending ? 'Signing up…' : 'Sign Up'}
      </button>

      {state.message && (
        <p className="text-red-400 mt-2" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  )
}
