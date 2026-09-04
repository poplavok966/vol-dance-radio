import { useNavigate, useRouterState } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function jumpTo(hash: string) {
  if (scrollToHash(hash)) return;
  [50, 160, 320, 500].forEach((ms) => {
    window.setTimeout(() => scrollToHash(hash), ms);
  });
}

export function HashLink({
  hash,
  className,
  children,
}: {
  hash: string;
  className?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname === "/") {
      window.history.replaceState(null, "", `/#${hash}`);
      jumpTo(hash);
      return;
    }
    void Promise.resolve(navigate({ to: "/", hash })).then(() => jumpTo(hash));
  };

  return (
    <a href={`/#${hash}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
