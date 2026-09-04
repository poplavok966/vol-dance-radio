import type { ReactNode } from "react";
import { RadioProvider } from "@/components/radio-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/lib/i18n";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <RadioProvider>{children}</RadioProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
