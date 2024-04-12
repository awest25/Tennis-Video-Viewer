// import { Inter } from "next/font/google";
import Toolbar from "../components/Toolbar"
// import Footer from "../components/Footer"

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tennis Video Viewer",
  description: "Next13 App Router for UCLA D1 Tennis",
};

export default function RootLayout({ children }) {
  return (
    /*
    DON'T RETURN ADDITIONAL <html>/<head>/<body> tags in Next layout: 
      https://github.com/vercel/next.js/discussions/25049#discussioncomment-7225671
    */
    <>
      <Toolbar/>
      {children}
    </>
  );
}
