"use client";

import { useEffect, useRef, useState } from "react";

type CopyEmailActionProps = {
  email: string;
  label: string;
  copiedLabel: string;
  className?: string;
};

export function CopyEmailAction({
  email,
  label,
  copiedLabel,
  className,
}: CopyEmailActionProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? copiedLabel : label}
    </button>
  );
}
