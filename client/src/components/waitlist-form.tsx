import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema, type InsertWaitlist } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import confetti from "canvas-confetti";
import { ExternalLink, Check, Loader2 } from "lucide-react";

type Phase = "twitter" | "tasks" | "wallet" | "success";

export function WaitlistForm() {
  const [phase, setPhase] = useState<Phase>("twitter");
  const { toast } = useToast();

  const form = useForm<InsertWaitlist>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
      twitterName: "",
      walletAddress: "",
      quoteLink: "",
      commentLink: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      const res = await apiRequest("POST", api.waitlist.create.path, data);
      return res.json();
    },
    onSuccess: () => {
      setPhase("success");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#000000", "#333333"]
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message,
      });
    },
  });

  const nextPhase = async () => {
    if (phase === "twitter") {
      const twitterName = form.getValues("twitterName");
      const email = form.getValues("email");
      if (!twitterName || !email) {
        toast({ variant: "destructive", title: "Required", description: "Please enter your email and Twitter name." });
        return;
      }
      setPhase("tasks");
    } else if (phase === "tasks") {
      const quoteLink = form.getValues("quoteLink");
      const commentLink = form.getValues("commentLink");
      if (!quoteLink || !commentLink) {
        toast({ variant: "destructive", title: "Required", description: "Please complete the tasks and provide the links." });
        return;
      }
      setPhase("wallet");
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <AnimatePresence mode="wait">
            {phase === "twitter" && (
              <motion.div
                key="twitter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 bg-card/50 backdrop-blur-xl p-8 border border-border/50 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Phase 01</h3>
                  <p className="text-muted-foreground text-sm mt-2">Identify yourself in the void.</p>
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="EMAIL ADDRESS" 
                          {...field} 
                          className="bg-background/50 border-border/30 h-12 text-center font-mono uppercase tracking-widest focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="TWITTER (X) NAME" 
                          {...field} 
                          className="bg-background/50 border-border/30 h-12 text-center font-mono uppercase tracking-widest focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="button"
                  onClick={nextPhase}
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest transition-all duration-300"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {phase === "tasks" && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 bg-card/50 backdrop-blur-xl p-8 border border-border/50 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Phase 02</h3>
                  <p className="text-muted-foreground text-sm mt-2">Let's cause some trouble...</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-background/30 border border-border/20 rounded-xl">
                    <span className="text-sm font-mono uppercase">Follow @Minimals</span>
                    <Button size="sm" variant="secondary" className="h-8 px-4 font-mono text-xs uppercase" asChild>
                      <a href="https://x.com/minimalsnft" target="_blank" rel="noreferrer">Go <ExternalLink className="ml-2 w-3 h-3" /></a>
                    </Button>
                  </div>

                  <div className="p-4 bg-background/30 border border-border/20 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase leading-tight max-w-[180px]">Like & Quote pinned post with "Minimals"</span>
                      <Button size="sm" variant="secondary" className="h-8 px-4 font-mono text-xs uppercase" asChild>
                        <a href="https://x.com/minimalsnft" target="_blank" rel="noreferrer">Go <ExternalLink className="ml-2 w-3 h-3" /></a>
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name="quoteLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="QUOTE LINK" 
                              {...field} 
                              className="bg-background/50 border-border/30 h-10 text-center text-xs font-mono uppercase tracking-widest"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-4 bg-background/30 border border-border/20 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase">Tag 2 frens in comments</span>
                      <Button size="sm" variant="secondary" className="h-8 px-4 font-mono text-xs uppercase" asChild>
                        <a href="https://x.com/minimalsnft" target="_blank" rel="noreferrer">Go <ExternalLink className="ml-2 w-3 h-3" /></a>
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name="commentLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="COMMENT LINK" 
                              {...field} 
                              className="bg-background/50 border-border/30 h-10 text-center text-xs font-mono uppercase tracking-widest"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="button"
                  onClick={nextPhase}
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest transition-all duration-300 mt-4"
                >
                  Done
                </Button>
              </motion.div>
            )}

            {phase === "wallet" && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 bg-card/50 backdrop-blur-xl p-8 border border-border/50 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Phase 03</h3>
                  <p className="text-muted-foreground text-sm mt-2">Where should the artifacts go?</p>
                </div>

                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="ETH WALLET ADDRESS (0x...)" 
                          {...field} 
                          className="bg-background/50 border-border/30 h-12 text-center font-mono uppercase tracking-widest focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest transition-all duration-300"
                >
                  {mutation.isPending ? <Loader2 className="animate-spin" /> : "Complete Manifest"}
                </Button>
              </motion.div>
            )}

            {phase === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card/50 backdrop-blur-xl p-12 border border-border/50 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-black w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">Manifested</h3>
                <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">You are now part of the void.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
}
