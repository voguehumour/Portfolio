"use client";

import dynamic from "next/dynamic";

const HoverImage = dynamic(() => import("./HoverImage"), {
  ssr: false,
  loading: () => null,
});

export function HoverImageClient(props: {
  src: string;
  accent?: string;
  className?: string;
}) {
  return <HoverImage {...props} />;
}
