import { cva } from "class-variance-authority";

import { Sidebar } from "@/components/sidebar";

const sidebarPreviewShellVariants = cva(
  "flex min-h-[430px] items-start justify-start rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.15),transparent_36%)] p-4",
);

export function SidebarPreview() {
  return (
    <div className={sidebarPreviewShellVariants()}>
      <Sidebar />
    </div>
  );
}
