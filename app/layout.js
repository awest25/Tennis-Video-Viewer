// import { Inter } from "next/font/google";
// import Toolbar from "./components/Toolbar"
import Footer from "./components/Footer"
import { AuthProvider } from "./components/AuthWrapper";
import { MatchDataProvider } from "./components/MatchDataProvider";
import { DatabaseProvider } from "./components/DatabaseProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tennis Video Viewer",
  description: "Next13 App Router for UCLA D1 Tennis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Match Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* <Toolbar/> */}
        <div style={{width:'100%'}}>
        <AuthProvider>
          <MatchDataProvider>
            <DatabaseProvider>
              {children}
            </DatabaseProvider>
          </MatchDataProvider>
        </AuthProvider>
        </div>
        <Footer/>
      </body>
    </html>
  );
}
