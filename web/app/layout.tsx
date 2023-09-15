import "/sass/main.scss";
import { Montserrat, Lexend_Zetta, PT_Serif } from 'next/font/google';

const montserrat = Montserrat({ 
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const lexendZetta = Lexend_Zetta({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-lexend-zetta'
});

const ptSerif = PT_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-pt-serif'
});

export default function RootLayout({children}) {
  return (
    <html lang="sv">
      <body>
        <main className={`main ${montserrat.variable} ${lexendZetta.variable} ${ptSerif.variable}`}>
          {children}
          <div className="footer">
            <div className="footer__content">
              BF Rodret 2 U.P.A. <a href="https://goo.gl/maps/73XdpHWQQvRzo1yc7">Eldarvägen 4-6, Gröndal, 117 66 Stockholm.</a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
