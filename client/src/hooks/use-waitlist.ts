import { useMutation } from "@tanstack/react-query";
import { api, type WaitlistInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useJoinWaitlist() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: WaitlistInput) => {
      // Use the path from our shared API contract
      const res = await fetch(api.waitlist.create.path, {
        method: api.waitlist.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          // The error might be formatted by our backend according to the schema
          throw new Error(error.message || "Invalid submission");
        }
        throw new Error("Failed to join waitlist. Please try again.");
      }

      // Parse successful response using Zod schema from our contract
      const responseData = await res.json();
      return api.waitlist.create.responses[201].parse(responseData);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
