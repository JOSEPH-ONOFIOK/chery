import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Force dark mode for this specific landing page to match the premium aesthetic
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground noise-bg overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 z-0"
        >
          {/* User's 1st Pic Placeholder */}
          {/* abstract dark architectural/sculpture image */}
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}
          <img 
            src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop" 
            alt="Hero Abstract Concept" 
            className="w-full h-full object-cover object-center animate-slow-pan"
          />
          <div className="absolute bottom-8 right-8 z-20 text-xs text-white/50 font-mono uppercase tracking-widest hidden md:block">
            [ Placeholder: 1st Pic ]
          </div>
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <h1 className="text-[12vw] leading-[0.8] md:text-[10vw] font-bold font-display uppercase tracking-tighter text-white mix-blend-overlay">
              Void
              <br />
              <span className="text-outline">Walker</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl font-light text-white/70 max-w-md mx-auto"
          >
            A minimal collection of 999 artifacts existing purely in the negative space.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 64, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* SHOWCASE SECTION */}
      <section className="py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          {/* User's 2nd Pic Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-7 relative group"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted relative border border-border/20">
              {/* minimal geometric shape */}
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2464&auto=format&fit=crop" 
                alt="Artifact 01" 
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            <div className="mt-4 flex justify-between items-end border-b border-border/30 pb-4">
              <div>
                <h3 className="text-xl font-display font-bold uppercase">Artifact 01</h3>
                <p className="text-sm text-muted-foreground mt-1">Static Origin</p>
              </div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest text-right">
                [ Placeholder: 2nd Pic ]
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-5 flex flex-col gap-12 md:gap-24 md:pl-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6">
                Absence of<br />Noise
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                We strip away the unnecessary. What remains is the essence of form and structure. True luxury is found in the restraint of design.
              </p>
            </motion.div>

            {/* User's GIF Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="aspect-square overflow-hidden bg-muted relative border border-border/20">
                {/* 
                  Using a static image with a slow pan animation as a stand-in for the GIF 
                  to provide a sense of motion without relying on external GIF hosts.
                */}
                {/* minimal fluid/wave abstract */}
                <img 
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" 
                  alt="Animated Artifact" 
                  className="w-full h-full object-cover grayscale opacity-80 animate-slow-pan mix-blend-screen"
                />
                
                {/* GIF Badge */}
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur text-foreground text-[10px] uppercase tracking-widest px-3 py-1 font-mono border border-border/50">
                  Animated (GIF)
                </div>
              </div>
              <div className="mt-4 flex justify-between items-end border-b border-border/30 pb-4">
                <div>
                  <h3 className="text-xl font-display font-bold uppercase">State of Flux</h3>
                  <p className="text-sm text-muted-foreground mt-1">Dynamic Sequence</p>
                </div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest text-right">
                  [ Placeholder: 1st Gif ]
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WAITLIST SECTION */}
      <section id="waitlist" className="py-32 relative border-t border-border/10 overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-6">
              The <span className="text-outline">Access</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-light">
              Phase 1 is strictly limited. Join the manifest to secure your position in the void.
            </p>
          </motion.div>

          <WaitlistForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-12 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
        <div>© {new Date().getFullYear()} Void Walker. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">Discord</a>
          <a href="#" className="hover:text-foreground transition-colors">Etherscan</a>
        </div>
      </footer>
    </div>
  );
}
