import { useState } from "react";
import { useForm } from "react-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema } from "@shared/schema";
import { type WaitlistInput } from "@shared/routes";
import { useJoinWaitlist } from "@/hooks/use-waitlist";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useForm as useReactHookForm } from "react-hook-form";

export function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: joinWaitlist, isPending } = useJoinWaitlist();

  const form = useReactHookForm<WaitlistInput>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
      walletAddress: "",
    },
  });

  const onSubmit = (data: WaitlistInput) => {
    joinWaitlist(data, {
      onSuccess: () => {
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#888888', '#444444']
        });
        form.reset();
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center p-8 text-center border border-border bg-card/50 backdrop-blur-sm"
          >
            <CheckCircle2 className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2 font-display">You're on the list.</h3>
            <p className="text-muted-foreground mb-6">
              Keep an eye on your inbox. We'll be in touch soon.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-sm border-b border-primary pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              Submit another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="space-y-4">
              <div className="relative group">
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder="EMAIL ADDRESS *"
                  disabled={isPending}
                  className="w-full bg-transparent border-b border-border/50 py-4 text-lg md:text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50 font-display uppercase tracking-wider"
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 ease-out group-focus-within:w-full" />
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs mt-2 absolute -bottom-5">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative group pt-4">
                <input
                  {...form.register("walletAddress")}
                  type="text"
                  placeholder="ETH WALLET (OPTIONAL)"
                  disabled={isPending}
                  className="w-full bg-transparent border-b border-border/50 py-4 text-lg md:text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50 font-display uppercase tracking-wider"
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group relative flex items-center justify-between w-full py-4 overflow-hidden border border-primary bg-primary text-primary-foreground disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              <div className="absolute inset-0 w-0 bg-background transition-all duration-[400ms] ease-out group-hover:w-full" />
              <span className="relative px-6 font-display font-bold tracking-widest text-lg uppercase group-hover:text-primary transition-colors duration-[400ms]">
                {isPending ? "Joining..." : "Enter Void"}
              </span>
              <span className="relative px-6 group-hover:text-primary transition-colors duration-[400ms]">
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
