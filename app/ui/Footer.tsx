import Link from "next/link";
import {handlee} from "@/app/ui/fonts";

export function Footer() {
    return (
    <footer className="pl-8 bg-slate-100 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))] text-slate-600 sm:pt-4">
      <div className="flex flex-col sm:flex-row sm:gap-20 gap-4 ">
        <Link href="/" className={`${handlee.className} text-xl hover:font-bold sticky`}> In Real Life </Link>
        <Link href="/contact" className="hover:font-bold mb-8">Contact</Link>
      </div>
    </footer>
    )
}