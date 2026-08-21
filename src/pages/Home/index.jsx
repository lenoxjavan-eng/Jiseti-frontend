import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import RecordCard from '../../components/RecordCard/RecordCard'
import { fetchRecords } from '../../services/api'

export default function Home() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchRecords().then(setRecords)
  }, [])

  const stats = useMemo(() => ({
    total: records.length,
    pending: records.filter((record) => record.status === 'pending').length,
    investigating: records.filter((record) => record.status === 'under-investigation').length,
    resolved: records.filter((record) => record.status === 'resolved').length,
  }), [records])

  const recentRecords = [...records]
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
    .slice(0, 6)

  return (
    <div>
      <main className="public-dashboard">
        <section className="public-dashboard__header">
          <div>
            <p className="eyebrow">JISETI COMMUNITY REPORTS</p>
            <h1>See what citizens are reporting.</h1>
            <p className="public-dashboard__lead">
              Explore public red flags and intervention requests, then add your own report when you see something that needs attention.
            </p>
          </div>
          <Link className="button button--primary" to="/how">Create a report</Link>
        </section>

        <section className="public-dashboard__stats" aria-label="Report summary">
          <DashboardStat label="Total reports" value={stats.total} />
          <DashboardStat label="Pending review" value={stats.pending} />
          <DashboardStat label="Under investigation" value={stats.investigating} />
          <DashboardStat label="Resolved" value={stats.resolved} />
        </section>

        <section className="public-dashboard__reports">
          <div className="public-dashboard__section-heading">
            <div>
              <p className="eyebrow">PUBLIC RECORDS</p>
              <h2>Latest community reports</h2>
            </div>
            <span>{records.length} published records</span>
          </div>
          <div className="public-dashboard__grid">
            {recentRecords.length > 0 ? recentRecords.map((record) => (
              <RecordCard key={record.id} record={record} showActions={false} />
            )) : <p>No reports have been submitted yet.</p>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function DashboardStat({ label, value }) {
  return (
    <article className="public-dashboard__stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}
