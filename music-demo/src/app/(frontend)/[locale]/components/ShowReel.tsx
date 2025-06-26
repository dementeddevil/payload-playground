export default function ShowReel(props: any) {
  console.log('showreel', props);

  return (
    <section className="section section--white">
      <div className="section__header">
        <div className="section__title">
          <h2>{props.video.title}</h2>
          <p>{props.video.description}</p>
        </div>
      </div>
      <div className="section__content">
        <div className="video-wrapper">
          <iframe
            src={props.video.video}
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
