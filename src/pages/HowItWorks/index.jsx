import Footer from '../../components/Footer'

const steps = [
  ['01', 'Create an account', 'Register once so your reports stay connected to you.'],
  ['02', 'Submit a report', 'Choose a red flag or intervention and add the useful details.'],
  ['03', 'Track the outcome', 'Return to your records to see status updates and next steps.'],
]

export default function HowItWorks() {
  return (
    <div className="info-page">
      <main className="info-page__content">
        <p className="eyebrow">HOW IT WORKS</p>
        <h1>From observation to follow-through.</h1>
        <p className="info-page__lead">
          A short, traceable workflow keeps the important context visible at every step.
        </p>
        <div className="steps-list">
          {steps.map(([number, title, description]) => (
            <article className="step" key={number}>
              <span className="step__number">{number}</span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
