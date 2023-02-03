import Project from "../components/Project";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <section>
      <Navbar />
      <div className="home">
        <div className="main">
          <h3 className="text">Bonjour, Mon nom est</h3>
          <h1 className="text">Romain Bronquard</h1>
          <h2 className="text">Je l'ai créé pour le développement web</h2>
          <p className="text">Je suis un développeur web fullstack</p>
        </div>
        <About />
        <Project />
        <Contact />
      </div>
    </section>
  );
}
