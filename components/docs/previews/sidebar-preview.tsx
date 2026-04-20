import { cva } from "class-variance-authority";

import { Sidebar } from "@/components/sidebar";

const sidebarPreviewShellVariants = cva(
  "min-w-0 overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.15),transparent_36%)] p-4",
);

const sidebarPreviewRailVariants = cva(
  "flex min-w-0 items-start justify-center",
);

export function SidebarPreview() {
  return (
    <div className={sidebarPreviewShellVariants()}>
      <div className={sidebarPreviewRailVariants()}>
        <Sidebar className="mx-auto w-full max-w-72 sm:w-72" />
      </div>
    </div>
  );
}
