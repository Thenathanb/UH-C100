import { useTilt } from "../hooks/useTilt.js";

/** Generic wrapper that adds a subtle 3D tilt-on-hover to whatever it renders. */
export default function TiltCard({
  as: Tag = "div",
  maxTilt = 7,
  className = "",
  children,
  ...props
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(maxTilt);

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
