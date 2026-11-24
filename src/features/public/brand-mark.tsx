import { Bot } from "lucide-react";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`brand-mark grid size-8 place-items-center rounded-[10px] border border-[rgba(86,217,255,0.62)] bg-[#091725] text-[#56d9ff] shadow-[0_0_18px_rgba(86,217,255,0.15)] ${className}`}
    >
      <Bot className="size-[18px]" strokeWidth={2} />
    </span>
  );
}
