import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import confetti from "canvas-confetti";
import { Check, Loader2 } from "lucide-react";

type Phase = "twitter" | "tasks" | "wallet" | "success";

type WaitlistData = {
  twitterName: string;
  walletAddress: string;
  quoteLink: string;
  commentLink: string;
  website?: string; // honeypot
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyYKBD1TfaGnRiIENdIEPwsy6jvGmiz9rILhqNVMBfiPVVPkxnqgG0WnDsSNlP39fz8QQ/exec";

export function WaitlistForm() {
  const [phase, setPhase] = useState<Phase>("twitter");
  const { toast } = useToast();

  const form = useForm<WaitlistData>({
    defaultValues: {
      twitterName: "",
      walletAddress: "",
      quoteLink: "",
      commentLink: "",
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: WaitlistData) => {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      setPhase("success");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#000000", "#333333"],
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

  const nextPhase = () => {
    if (phase === "twitter") {
      if (!form.getValues("twitterName")) {
        toast({
          variant: "destructive",
          title: "Required",
          description: "Please enter your Twitter name.",
        });
        return;
      }
      setPhase("tasks");
    }

    if (phase === "tasks") {
      const { quoteLink, commentLink } = form.getValues();
      if (!quoteLink || !commentLink) {
        toast({
          variant: "destructive",
          title: "Required",
          description: "Please complete the tasks and provide the links.",
        });
        return;
      }
      setPhase("wallet");
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6"
        >
          {/* 🛡 Honeypot */}
          <input
            type="text"
            {...form.register("website")}
            className="hidden"
            autoComplete="off"
          />

          <AnimatePresence mode="wait">
            {/* ───────── PHASE 01 ───────── */}
            {phase === "twitter" && (
              <motion.div
                key="twitter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 bg-card/50 backdrop-blur-xl p-8 border border-border/50 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold uppercase">
                    Phase 01
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Identify yourself in the void.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="twitterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="TWITTER (X) NAME"
                          {...field}
                          className="h-12 text-center font-mono uppercase tracking-widest"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={nextPhase}
                  className="w-full h-12 bg-white text-black font-bold uppercase"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {/* ───────── PHASE 02 ───────── */}
            {phase === "tasks" && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 bg-card/50 backdrop-blur-xl p-8 border border-border/50 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold uppercase">
                    Phase 02
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Let's cause some trouble...
                  </p>
                </div>

                {/* FOLLOW */}
                <div className="flex items-center justify-between bg-background/50 p-4 rounded-xl">
                  <span className="text-sm uppercase font-mono">follow</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      window.open("https://x.com/cherygpt", "_blank")
                    }
                  >
                    go
                  </Button>
                </div>

                {/* QUOTE */}
                <div className="space-y-2 bg-background/50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase">
                      like & quote pinned post containing "Minimals"
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        window.open(
                          "https://x.com/cherygpt"
                        )
                      }
                    >
                      go
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
                            className="h-10 text-center text-xs font-mono uppercase"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* TAG */}
                <div className="space-y-2 bg-background/50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase">
                      tag 2 frens
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        window.open("https://x.com/cherygpt", "_blank")
                      }
                    >
                      go
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
                            className="h-10 text-center text-xs font-mono uppercase"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  onClick={nextPhase}
                  className="w-full h-12 bg-white text-black font-bold uppercase"
                >
                  Done
                </Button>
              </motion.div>
            )}

            {/* ───────── PHASE 03 ───────── */}
            {phase === "wallet" && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 bg-card/50 backdrop-blur-xl p-8 border border-border/50 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold uppercase">
                    Phase 03
                  </h3>
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
                          className="h-12 text-center font-mono uppercase"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full h-12 bg-white text-black font-bold uppercase"
                >
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Complete Manifest"
                  )}
                </Button>
              </motion.div>
            )}

            {/* ───────── SUCCESS ───────── */}
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
                <h3 className="text-3xl font-display font-bold uppercase">
                  Manifested
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
}