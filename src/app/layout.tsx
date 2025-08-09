
import { Geist, Geist_Mono } from "next/font/google";
<<<<<<< HEAD
// import { SessionProvider } from "next-auth/react"; 
=======
>>>>>>> a8fc7c57029295e6830f949c0c2a9b4e6158dc3f
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "#F3F4F6",
        }}
      >

      

<<<<<<< HEAD
          <AuthProvider>
            {children}
            <Footer/>
          </AuthProvider>
=======
        <Providers>
          {children}
          
        </Providers>
>>>>>>> a8fc7c57029295e6830f949c0c2a9b4e6158dc3f

      </body>
    </html>
  );
}
