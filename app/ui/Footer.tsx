import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
    <footer className="pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))] sm:pt-4">
      <div className="flex flex-col sm:flex-row sm:gap-20 gap-4 items-center pb-16">
        <Link href="/" className="hidden sm:block">
          <Image src="/assets/IRL_Logo_Final_Main.png" alt="In Real Life Logo" width={100} height={100} className="relative"/>    
        </Link>
        <Link href="/" className="block sm:hidden">
          <Image src="/assets/IRL_Logo_Final_Responsive.png" alt="In Real Life Logo" width={100} height={100} className="relative"/>    
        </Link>
        <Link href="/contact" className="hover:font-bold">Contact</Link>
      </div>
    </footer>
    )
}