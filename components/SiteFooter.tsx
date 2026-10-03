import { chrome } from "@/content/chrome";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        <p className="mono-label">{chrome.footerPath}</p>
        <a href="#main-content" className="mono-label inline-flex items-center gap-3 py-2 underline-offset-[6px] hover:underline">
          {chrome.footerTop}<span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
