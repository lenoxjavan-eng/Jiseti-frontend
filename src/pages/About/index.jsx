import Footer from '../../components/Footer'

export default function About() {
  return (
    <div className="info-page">
      <main className="info-page__content">
        <p className="eyebrow">ABOUT JISETI</p>
        <div className="about-page__intro">
          <div>
            <h1>Make public service easier to follow.</h1>
            <p className="info-page__lead">
              Jiseti is a civic reporting platform that helps people bring corruption and urgent community problems to the attention of the right authorities.
            </p>
          </div>
          <img
            className="about-page__image"
            src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85"
            alt="People working together around a table"
          />
        </div>

        <section className="about-page__story">
          <h2>Turning a concern into a public record</h2>
          <p>
            Corruption and neglected infrastructure affect everyday life, but many concerns are difficult to document or easy to lose. Jiseti gives every citizen a structured place to describe what they witnessed, attach a location, and provide supporting evidence.
          </p>
          <p>
            Reports remain visible as they move through review. This creates a clearer connection between citizens, public institutions, and the outcomes communities need to see.
          </p>
        </section>

        <div className="info-page__grid">
          <article>
            <h2>Red flags</h2>
            <p>Document suspected bribery, embezzlement, abuse of office, or other corruption-related incidents.</p>
          </article>
          <article>
            <h2>Interventions</h2>
            <p>Request attention for public problems such as damaged roads, flooding, unsafe bridges, or broken services.</p>
          </article>
          <article>
            <h2>Traceable outcomes</h2>
            <p>Each record includes its location and status so progress can be followed from submission to resolution.</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
