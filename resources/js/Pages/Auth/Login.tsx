import { Head, Link, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export default function Login() {
  /*
   * `useForm` holds the field values, the submit state, and the errors the
   * server flashed back. `errors` here is Inertia's own — it reads the shared
   * `errors` prop that app/inertia.py populates from the session, so a failed
   * POST redirects back and the messages are simply present on the next
   * render. Nothing on this page inspects a response.
   */
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
  })

  function submit(event: FormEvent) {
    event.preventDefault()
    post('/login', {
      // Never leave a password in component state after a failed attempt.
      onFinish: () => reset('password'),
    })
  }

  return (
    <>
      <Head title="Sign in" />

      <form className="card" onSubmit={submit} noValidate>
        <h1>Sign in</h1>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={data.email}
            onChange={(event) => setData('email', event.target.value)}
            autoComplete="username"
            autoFocus
          />
          {errors.email && <em className="field__error">{errors.email}</em>}
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={data.password}
            onChange={(event) => setData('password', event.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <em className="field__error">{errors.password}</em>}
        </label>

        <button type="submit" className="btn btn--solid" disabled={processing}>
          {processing ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="card__alt">
          No account yet? <Link href="/register">Create one</Link>.
        </p>
      </form>
    </>
  )
}
