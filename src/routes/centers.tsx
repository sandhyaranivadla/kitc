import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/centers")({
  beforeLoad: () => {
    throw redirect({ to: "/centres" });
  },
});
