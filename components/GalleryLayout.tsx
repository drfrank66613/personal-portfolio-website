import { ImageGallery } from "../data/projects";
import GalleryThumb from "./GalleryThumb";

type GalleryLayoutProps = {
  gallery: ImageGallery[];
  viewImage: (image: ImageGallery) => void;
};

const GalleryLayout = ({ gallery, viewImage }: GalleryLayoutProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-1 h-full">
      {gallery.map((image, index) => (
        <GalleryThumb index={index} image={image} viewImage={viewImage} />
      ))}
    </div>
  );
};

export default GalleryLayout;
