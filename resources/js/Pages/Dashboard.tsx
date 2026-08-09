import { Head, usePage } from '@inertiajs/react'
import type { SharedProps } from '../types'

interface Props {
  stats: {
    signed_in_as: string
  }
}

export default function Dashboard({ stats }: Props) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Dashboard" />

      <section className="panel">
        <h1>Dashboard</h1>
        <p>
          Signed in as <strong>{stats.signed_in_as}</strong>.
        </p>

        {/*
          `auth.user` is a shared prop, resolved per request in
          app/inertia.py. It is on every page without any handler passing it,
          which is what shared props are for — and it is a hand-listed subset
          of the model, not a dump of it, so the password hash cannot reach
          the browser by someone adding a column later.
        */}
        <dl className="facts">
          <dt>Username</dt>
          <dd>{auth.user?.username}</dd>
          <dt>Email</dt>
          <dd>{auth.user?.email}</dd>
          <dt>Name</dt>
          <dd>{auth.user?.full_name ?? <em>not set</em>}</dd>
          <dt>Staff</dt>
          <dd>{auth.user?.is_staff ? 'yes' : 'no'}</dd>
        </dl>
      </section>
    </>
  )
}
