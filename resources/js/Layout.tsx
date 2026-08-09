import { Link, router, usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import type { SharedProps } from './types'

/**
 * The shell every page renders inside.
 *
 * Assigned once in app.tsx rather than wrapped around each page, which is what
 * makes it *persistent*: Inertia keeps this component mounted across visits,
 * so state in here — an open menu, a scroll position — survives navigation.
 * Wrapping each page instead remounts the layout on every visit and loses it.
 */
export default function Layout({ children }: { children: ReactNode }) {
  const { auth, app_name, flash } = usePage<SharedProps>().props

  return (
    <div className="app">
      <header className="app__bar">
        <Link href="/" className="app__brand">
          {app_name}
        </Link>

        <nav className="app__nav">
          {auth.user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <span className="app__who">{auth.user.username}</span>
              {/*
                A button, not a link. Signing out changes state, so it must be
                a POST — a GET can be triggered by any page that embeds the
                URL, and by prefetchers that follow links on your behalf.
              */}
              <button type="button" className="btn btn--ghost" onClick={() => router.post('/logout')}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Sign in</Link>
              <Link href="/register" className="btn btn--solid">
                Create account
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Rendered here, once, so no page has to remember to show it. */}
      {flash.success && <p className="flash flash--ok">{flash.success}</p>}
      {flash.error && <p className="flash flash--bad">{flash.error}</p>}

      <main className="app__main">{children}</main>

      <footer className="app__foot">
        Built with <a href="https://sillo.build">Sillo</a> and{' '}
        <a href="https://inertiajs.com">Inertia</a>.
      </footer>
    </div>
  )
}
