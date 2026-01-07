import Link from "next/link";
export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background font-pixel px-4 text-center text-black">
      <h1 className="text-9xl md:text-[12rem] text-white/10 select-none">
        404
      </h1>
      <div className="absolute flex flex-col items-center gap-6 z-10">
        <h2 className="text-2xl md:text-4xl text-white font-bold uppercase tracking-widest">
          Lost within Void
        </h2>
        <p className="text-white/60 max-w-md text-sm md:text-base leading-relaxed">
          The coordinates you entered led to an empty sector. Return to base
          before you drift too far.
        </p>
        <Link href="/">
          <button className="px-8 py-4 mt-4 bg-yellow-400 text-black font-bold uppercase hover:bg-yellow-300 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
