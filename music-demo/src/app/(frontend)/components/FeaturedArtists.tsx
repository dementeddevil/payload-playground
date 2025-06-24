import Link from 'next/link'

export default function LatestNews(props: any) {
  return (
    <section className="section">
      <div className="section__header">
        <div className="section__title">
          <h2>Featured artists.</h2>
          <p>A small selection of our world class songriters.</p>
        </div>
      </div>
      <div className="section__content">
        <ul className="cards-list cards-list--square">
          {props.artists.map((item: any) => (
            <li className="card" key={item.id}>
              <Link href={`/artists/${item.slug}`}>
                <div
                  className="card__bg"
                  style={{ ['background-image' as any]: `url(${item.thumbnailImage.url})` }}
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
