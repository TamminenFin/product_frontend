import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold md:text-8xl">404</h1>
      <p className="text-lg font-medium">Page not Found!</p>
      <Link href="/" className="text-white bg-purple-600 px-4 py-2 rounded">
        {" "}
        Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
