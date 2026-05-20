export default function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.15]" aria-hidden>
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508]" />
    </div>
  );
}
