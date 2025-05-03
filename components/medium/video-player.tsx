import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

export default function VideoPlayer({ url }: { url: string }) {
  return (
    <MediaPlayer playsInline title="Sprite Fight" src={url}>
      <MediaProvider />
      <PlyrLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={plyrLayoutIcons} />
    </MediaPlayer>
  )
}