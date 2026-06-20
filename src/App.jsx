import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CyberGridBackground from "./components/ui/CyberGridBackground";
import CursorSpotlight from "./components/ui/CursorSpotlight";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <CyberGridBackground />
      <CursorSpotlight />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}
