"use client";

import { Button } from "@/components/ui/button";
import { Link, redirect } from "@/lib/i18n";
import Error from "next/error";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-4 rounded-md bg-white p-16">
        <h1 className="text-4xl font-semibold">Page Not Found</h1>
        <p className="text-xl">
          Please click the button below to navigate to correct path
        </p>
        <Link href="/" locale="en">
          <Button className="self-start text-xl" size="lg">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
