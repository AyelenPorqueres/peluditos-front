


import { BannerHome } from "@/app/components/bannerHome/bannerHome";
import { CardDogs } from "@/app/components/cardDogs/cardDogs";
import { CardService } from "@/app/components/cardServices/cardService";
import { Footer } from "@/app/components/footer/footer";
import { InfoPoly } from "@/app/components/infoPoly/infoPoly";
import { Menu } from "@/app/components/nav/nav";


export default function Home() {
  
  return (
    <>
   
    <header>
      <div>
        <Menu></Menu>
        <BannerHome></BannerHome>

      </div>
    </header>
    <main>
     <CardService></CardService>
     <InfoPoly></InfoPoly>
     <CardDogs></CardDogs>
    </main>
    <Footer></Footer>
    </>
  );
}