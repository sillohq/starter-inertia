import { Head, Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '../types'

interface Props {
  message: string
}

export default function Home({ message }: Props) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      {/* Sets document.title through the `title` callback in app.tsx. */}
      <Head title="Home" />

      <section className="hero">
        <h1>One request, one page.</h1>
        <p>{message}</p>

        <p className="hero__note">
          This page was rendered by <code>routes/web.py</code>. Its props came down with the
          document on the first visit and over XHR on every visit after — no API call, no
          loading state, no second source of truth.
        </p>

        <div className="hero__actions">
          {auth.user ? (
            <Link href="/dashboard" className="btn btn--solid">
              Go to your dashboard
            </Link>
          ) : (
            <>
              <Link href="/register" className="btn btn--solid">
                Create an account
              </Link>
              <Link href="/login" className="btn btn--ghost">
                Sign in
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  )
}
