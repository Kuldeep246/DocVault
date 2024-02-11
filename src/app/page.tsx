import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main >
      <div className=" flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to DocVault<br />
            <br />
            Storing your Docs
          </h1>
          <p className="pb-20">
            Enhacnce you document access time with DocValut , offering a simple and efficent way to upload , organize and access files from anywhere . Securely store importent document and experince the convience of easy docs management and sharing in one centrlized solution.
          </p>
          <Link href='/dashboard' className=" flex cursor-pointer bg-blue-500 p-5 w-fit rounded-lg ">
            Try it for  free!
            <ArrowRight className="" />
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
              type="video/mp4"
               />
              </video>
        </div>
      </div>
    </main>
  );
}
