import { MediaCarousel } from '../common/MediaCarousel';
const videos = ['/video/gettyimages-1501085755-640_adpp.mp4', '/video/gettyimages-1501086416-640_adpp.mp4', '/video/gettyimages-1501086923-640_adpp.mp4'];
export function VideoCarousel() { return <MediaCarousel sources={videos} video className="video-carousel" label="Skincare ritual films" />; }
