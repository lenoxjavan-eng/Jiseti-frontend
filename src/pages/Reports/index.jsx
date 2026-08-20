import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { AuthContext } from '../../context/AuthContext'
import MyRecords from '../MyRecords/MyRecords.jsx'

export default function Reports() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="info-page">
        <main className="info-page__content info-page__content--centered">
          <p className="eyebrow">REPORTS</p>
          <h1>Your reports, in one place.</h1>
          <p className="info-page__lead">Sign in to view and manage the reports you have submitted.</p>
          <Link className="button button--primary" to="/login">Sign in to continue</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return <MyRecords />
}
