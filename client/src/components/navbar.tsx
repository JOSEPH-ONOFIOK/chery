import { motion } from "framer-motion";

export function Navbar() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none"
    >
      <div className="text-white font-display font-bold text-xl tracking-[0.2em] uppercase">
        Cherygpt
      </div>
      
      <button 
        onClick={scrollToWaitlist}
        className="pointer-events-auto text-white border border-white/20 px-4 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
      >
        Join
      </button>
    </motion.header>
  );
}
