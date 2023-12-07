
import Image from 'next/image';

interface ImageComponentProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  containerStyle?: React.CSSProperties; // Style for the container
}

const ImageComponent: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => (
  <div className={className}>
    <img src={src} alt={alt} />
  </div>
);


export default ImageComponent;
