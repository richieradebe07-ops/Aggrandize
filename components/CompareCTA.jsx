"use client";

import { useState } from "react";
import Button from "./Button";
import PackageFinder from "./PackageFinder";

// Small client boundary so /compare's page component can stay a server
// component (static metadata, no "use client") while still offering the
// interactive Package Finder modal as its closing CTA.
export default function CompareCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Find My Package</Button>
      <PackageFinder open={open} onClose={() => setOpen(false)} />
    </>
  );
}
