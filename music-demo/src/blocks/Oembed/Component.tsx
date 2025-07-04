import {Oembed} from '@/payload-types'
import { YouTubeEmbed } from '@next/third-parties/google'

export function OembedBlock(block: Oembed) {
  let videoId: string;
  const videoURL = block.URL;
  const getString = videoURL.split("v=");
  const params = getString[1].split("&");
  videoId = params[0]

  return (
    <section className="block oembed-block">
        <div className="video-wrapper">

        <YouTubeEmbed videoid={videoId} />
          {/* <iframe
            src={block.URL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
        </div>
    </section>
  )
}