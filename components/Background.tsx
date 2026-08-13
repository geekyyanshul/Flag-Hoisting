import Image from "next/image";

export function Background() {
  return (
    <>
      <Image
        src="/background.webp"
        alt="DikHoist Hero"
        fill
        priority
        className="object-cover -z-20"
      />
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.28))'
        }}
        aria-hidden="true"
      />
    </>
  );
}
