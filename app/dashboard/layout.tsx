import Link from "next/link";
import { handlee } from "@/app/ui/fonts";

export default function RootLayout({ children }: { children:React.ReactNode }) {
    return (
        <section className="bg-camo xl:h-[100vh] pb-28 ">
            {children}
            <div className="absolute bottom-10 sm:left-[26rem] left-6">
                <Link href="/" className={`${handlee.className} text-xl hover:font-semibold`}>
                    In Real Life
                </Link>
            </div>
            
        </section>
    )
}
