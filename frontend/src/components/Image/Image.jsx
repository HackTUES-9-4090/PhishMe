import "./Image.css";

export default function Image({ src, alt, size }) {
  return (
    <img
      src={src}
      alt={alt || src}
      style={size ? { height: size.height, width: size.width } : {}}
    />
  );
}
