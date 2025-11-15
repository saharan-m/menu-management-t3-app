"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { clearAuthCookie } from "~/lib/cookies";
import { trpc } from "~/utils/trpc";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const logoutMutation = trpc.auth.logout.useMutation();

  // Use tRPC query for current user to check auth status
  const {
    data: user,
    isLoading,
    isError,
  } = trpc.auth.getCurrentUser.useQuery();

  useEffect(() => {
    if (!isLoading) {
      if (!user || isError) {
        router.push("/auth/login");
      }
    }
  }, [user, isLoading, isError, router]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    }
    clearAuthCookie();
    router.push("/auth/login");
  };

  // Optional: Show loading while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Restaurant Menu Manager
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
