import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';

const payload = await getPayload({ config });

export default async function GlobalFooter() {
  const globalData = await payload.findGlobal({
    slug: 'footer'
  });

  const footerData = globalData;

  return (
    <footer className="site-footer">
      <span className="site-footer__copyright">&copy; {footerData.copyright}</span>
      <ul className="site-footer__list">
      {footerData.footerLinks?.map((item: any) => (
        <li className="site-footer__list-item" key={item.id}>
          <Link className="siteFooter__list-link" href={item.url}>{item.text}</Link>
        </li>
      ))}
      </ul>
    </footer>
  )
}