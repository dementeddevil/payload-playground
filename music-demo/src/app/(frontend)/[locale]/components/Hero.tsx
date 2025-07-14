export default function Hero(props: any) {
  if (props.slides === undefined || props.slides.length === 0) return
  return (
    <section className="hero">
      <div className="hero__slide">
        <div
          className="hero__slide-bg"
          style={{ ['backgroundImage' as any]: `url(${props.slides[0].image.url})` }}
        ></div>
        <div className="hero__slide-content">
          <h1>{props.slides[0].title}</h1>
          <p>{props.slides[0].description}</p>
        </div>
      </div>
    </section>
  )
}
