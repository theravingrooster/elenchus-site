import { chrome } from "@/content/chrome";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        <p className="mono-label">{chrome.footerPath}</p>
        <p className="mono-label" aria-hidden="true">
          {chrome.palette.hint}
        </p>
      </div>
    </footer>
  );
}
