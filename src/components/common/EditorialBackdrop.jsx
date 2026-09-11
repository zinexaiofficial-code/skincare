import { MediaCarousel } from './MediaCarousel';
const images = ['/carousel/Skincare_Routine_Decades.webp', '/carousel/images (1).jpeg', '/carousel/images (2).jpeg', '/carousel/images.jpeg'];
export function EditorialBackdrop() { return <MediaCarousel sources={images} className="editorial-carousel" label="Skincare rituals in pictures" />; }
