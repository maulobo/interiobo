import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="container mx-auto p-5">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-bold  mb-10">Welcome!</h1>
          <p className="text-2xl  mb-10">
            Here you can start creating amazing things.
          </p>
          <Link
            href="/create"
            className="font-bold py-2 px-4 rounded-full shadow-lg hover:bg-slate-600 hover:text-white transition duration-500 "
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
