import Link from "next/link";
import Image from "next/image";

export default function RootLayout({ children }: { children:React.ReactNode }) {
    return (
        <section className="bg-lightTan xl:h-[100vh] pb-14 sm:pb-28">
            {children}
            <div className=" flex justify-center sm:inline">
                <Link href="/" className="hidden sm:inline-flex sm:pl-96">
                    <Image src="/assets/IRL_Logo_Final_Main.png" alt="In Real Life Logo" width={100} height={100} className="relative"/>    
                </Link>
                <Link href="/" className="block sm:hidden">
                    <Image src="/assets/IRL_Logo_Final_Responsive.png" alt="In Real Life Logo" width={100} height={100} className="relative"/>    
                </Link>
            </div>

        </section>
    )
}
