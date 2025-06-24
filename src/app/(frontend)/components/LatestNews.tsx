import Link from 'next/link'

export default function LatestNews(props: any) {
  return (
    <section className="section">
      <div className="section__header">
        <div className="section__title">
          <h2>Latest News.</h2>
          <p>Our lastest news from around the globe. </p>
        </div>
      </div>
      <div className="section__content">
        <ul className="cards-list">
          {props.posts.map((item: any) => (
            <li className="card" key={item.id}>
              <Link href={`/posts/${item.slug}`}>
                <div
                  className="card__bg"
                  style={{ ['backgroundImage' as any]: `url(${item.thumbnailImage.url})` }}
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
