import Footer from '../../components/Footer'

export default function About() {
  return (
    <div className="info-page">
      <main className="info-page__content">
        <p className="eyebrow">ABOUT JISETI</p>
        <h1>Make public service easier to follow.</h1>
        <p className="info-page__lead">
          Jiseti gives people a clear place to report red flags and request interventions,
          then follow what happens next.
        </p>
        <div className="info-page__grid">
          <article>
            <h2>Built for clarity</h2>
            <p>Every report keeps its description, location, status, and history together.</p>
          </article>
          <article>
            <h2>Designed for action</h2>
            <p>Structured records help teams review issues consistently and respond faster.</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
