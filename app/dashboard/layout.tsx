import Link from "next/link";
import { handlee } from "@/app/ui/fonts";

export default function RootLayout({ children }: { children:React.ReactNode }) {
    return (
        <section className="bg-camo xl:h-[100vh]">
            {children}
            <div className="pl-8 pb-12 mt-12 sm:mt-60 sm:mx-auto sm:px-[--columnPaddingNormal] sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                <Link href="/" className={`${handlee.className} text-xl hover:font-semibold`}>
                    In Real Life
                </Link>
            </div>
            
        </section>
    )
}
