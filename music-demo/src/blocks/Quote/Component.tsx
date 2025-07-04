import {Quote} from '@/payload-types'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

export function QuoteBlock(block: Quote) {
  const alignment = block.textPosition?.toLowerCase();

  return (
    <section className={`block quote-block quote-block--${alignment}`}>
      <BiSolidQuoteAltLeft />
      <span>{block['quote text']}</span>
      <BiSolidQuoteAltRight />
    </section>
  )
}