export default function ShowReel(props: any) {
  return (
    <section className="section section--white">
      <div className="section__header">
        <div className="section__title">
          <h2>Showreel.</h2>
          <p>We're the best at what we do. Here's why.</p>
        </div>
      </div>
      <div className="section__content">
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/RSW8U8hX-ss?si=HVqmxQC376Ps2EWT"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}
