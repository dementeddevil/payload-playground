import Link from 'next/link'

export default function FeaturedArtist(props: any) {
  if (props.artists === undefined) return

  return (
    <section className="section">
      <div className="section__header">
        <div className="section__title">
          <h2>{props.artists.title}</h2>
          <p>{props.artists.description}</p>
        </div>
      </div>
      <div className="section__content">
        <ul className="cards-list cards-list--square">
          {props.artists.artists.map((item: any) => (
            <li className="card" key={item.id}>
              <Link href={`/artists/${item.slug}`}>
                <div
                  className="card__bg"
                  style={{ ['backgroundImage' as any]: `url(${item.thumbnailImage?.url})` }}
                ></div>
                <div className="card__content">
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
