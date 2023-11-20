import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import warsztatImage from "./img/warsztatTło.png";

import { MainNav } from "@/components/main-nav";
import { Fotter } from "@/components/footer";

function App() {
  return (
    <>
      <ThemeProvider>
        <MainNav></MainNav>
        <div
          className="w-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${warsztatImage})`,
            minHeight: "100vh",
          }}
          aria-label="Warsztat"
        >
          <div className="h-16 md:h-24"></div>

          <div className="mx-auto max-w-screen-lg bg-black bg-opacity-80 text-white p-4 md:p-8 text-center">
            <h2 className="text-3xl font-semibold">O nas</h2>
            <p className="mt-4">
              Witamy w Moto Serwisie, miejscu, gdzie wydajność i długowieczność
              Twojego samochodu są naszym priorytetem. Usytuowany w samym sercu
              miasta, nasz warsztat jest azylem dla miłośników motoryzacji i
              codziennych kierowców. Nasz zespół certyfikowanych mechaników
              specjalizuje się w świadczeniu dokładnych usług, upewniając się,
              że każdy pojazd, który wjeżdża na naszą stację, jest traktowany z
              największą starannością i kompetencją.
            </p>
            <p className="mt-4">
              W Moto Serwisie rozumiemy więź pomiędzy kierowcą a jego autem.
              Dlatego oferujemy kompleksowy zakres usług, od rutynowej
              konserwacji po złożone naprawy, wszystko po to, aby Twój pojazd
              funkcjonował płynnie i niezawodnie. Używając najnowocześniejszych
              narzędzi diagnostycznych i części najwyższej jakości, podejmujemy
              się każdego wyzwania z precyzją i zaangażowaniem.
            </p>
            <p className="mt-4">
              Cenimy sobie przejrzystość naszego podejścia, dostarczając jasne
              wyjaśnienia i uczciwe porady. Naszym celem jest budowanie zaufania
              i spokoju ducha, co czyni nas nie tylko dostawcą usług, ale
              partnerem w podróży Twojego samochodu. Zajedź do Moto Serwisu już
              dziś, gdzie wyjątkowa obsługa spotyka się z niezrównanym kunsztem,
              i doświadcz różnicy, jaką robi zaangażowanie.
            </p>
          </div>
        </div>
        <Fotter></Fotter>
      </ThemeProvider>
    </>
  );
}

export default App;
