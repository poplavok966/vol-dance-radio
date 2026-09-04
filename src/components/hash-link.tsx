import { useNavigate, useRouterState } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";

function headerOffset() {
  const header = document.querySelector("header");
  return header ? header.getBoundingClientRect().height + 8 : 72;
}

function pinTop() {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, behavior: "auto" });
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = prev;
}

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (id === "on-air") {
    pinTop();
    requestAnimationFrame(pinTop);
    window.setTimeout(pinTop, 50);
    window.setTimeout(pinTop, 200);
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
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
  onNavigate,
}: {
  hash: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onNavigate?.();
    if (pathname === "/") {
      window.history.replaceState(null, "", hash === "on-air" ? "/" : `/#${hash}`);
      jumpTo(hash);
      return;
    }
    void Promise.resolve(
      hash === "on-air" ? navigate({ to: "/" }) : navigate({ to: "/", hash }),
    ).then(() => jumpTo(hash));
  };

  return (
    <a href={hash === "on-air" ? "/" : `/#${hash}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
