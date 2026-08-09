import { Head, Link, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    full_name: '',
    username: '',
    email: '',
    password: '',
  })

  function submit(event: FormEvent) {
    event.preventDefault()
    post('/register', {
      onFinish: () => reset('password'),
    })
  }

  return (
    <>
      <Head title="Create account" />

      <form className="card" onSubmit={submit} noValidate>
        <h1>Create your account</h1>

        <label className="field">
          <span>
            Name <small>optional</small>
          </span>
          <input
            value={data.full_name}
            onChange={(event) => setData('full_name', event.target.value)}
            autoComplete="name"
            autoFocus
          />
          {errors.full_name && <em className="field__error">{errors.full_name}</em>}
        </label>

        <label className="field">
          <span>Username</span>
          <input
            value={data.username}
            onChange={(event) => setData('username', event.target.value)}
            autoComplete="username"
          />
          {errors.username && <em className="field__error">{errors.username}</em>}
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={data.email}
            onChange={(event) => setData('email', event.target.value)}
            autoComplete="email"
          />
          {errors.email && <em className="field__error">{errors.email}</em>}
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={data.password}
            onChange={(event) => setData('password', event.target.value)}
            autoComplete="new-password"
          />
          {errors.password && <em className="field__error">{errors.password}</em>}
          <small className="field__hint">At least 8 characters.</small>
        </label>

        <button type="submit" className="btn btn--solid" disabled={processing}>
          {processing ? 'Creating…' : 'Create account'}
        </button>

        <p className="card__alt">
          Already have an account? <Link href="/login">Sign in</Link>.
        </p>
      </form>
    </>
  )
}
