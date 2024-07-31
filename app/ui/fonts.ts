import { Inter, Cardo, Hanken_Grotesk, Handlee } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const cardo = Cardo({ 
    weight: ['400', '700'],
    subsets: ["greek"] 
});

export const hanken_grotesk = Hanken_Grotesk({
    weight: ['500','900'],
    subsets: ["latin"]
});

export const handlee = Handlee({
    weight: ['400'],
    subsets: ["latin"]
});
