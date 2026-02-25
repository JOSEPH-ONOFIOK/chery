import React, { useState, useEffect } from "react";
import { Router, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";

// Helper component to sync hash with Wouter
function HashRouterWrapper({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<string>(window.location.hash.slice(1) || "/");

  useEffect(() => {
    const onHashChange = () => setLocation(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Override Wouter's useLocation
  const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <Router base="/">
      {children}
    </Router>
  );

  // Whenever location changes, update the hash
  useEffect(() => {
    if (window.location.hash.slice(1) !== location) {
      window.location.hash = location;
    }
  }, [location]);

  return <RouterWrapper>{children}</RouterWrapper>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <HashRouterWrapper>
          <Route path="/" component={Home} />
          <Route path="/:rest*" component={NotFound} />
        </HashRouterWrapper>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;