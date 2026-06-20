"use client";

import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

interface CompareButtonProps {
  comparing?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export default function CompareButton({
  comparing = false,
  loading = false,
  onClick,
}: CompareButtonProps) {
  return (
    <Button
      variant={comparing ? "primary" : "outline"}
      size="sm"
      loading={loading}
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Squares2X2Icon className="w-4 h-4" />
      {comparing ? "Added" : "Compare"}
    </Button>
  );
}
