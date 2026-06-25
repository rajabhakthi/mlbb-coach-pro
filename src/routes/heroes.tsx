import { createFileRoute, Link, notFound, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/heroes")({
  component: () => <Outlet />,
});
