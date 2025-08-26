// components/SearchBar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  /** Se dispara (con debounce) cuando cambia el texto */
  onSearch?: (value: string) => void;
  /** Se dispara al enviar: Enter o botón "Buscar" */
  onSubmit?: () => void;
  /** milisegundos de debounce para onSearch */
  delay?: number;
  className?: string;
  autoFocus?: boolean;
};

export default function SearchBar({
  defaultValue = "",
  placeholder = "Buscar…",
  onSearch,
  onSubmit,
  delay = 350,
  className = "",
  autoFocus = false,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const timer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enfocar opcionalmente al montar
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Debounce para onSearch (cuando cambia el texto)
  useEffect(() => {
    if (!onSearch) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      onSearch(value.trim());
    }, delay);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [value, delay, onSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(value.trim()); // ejecuta inmediato
    onSubmit?.();
  }

  function handleClear() {
    setValue("");
    onSearch?.("");
    inputRef.current?.focus();
  }

  const isEmpty = useMemo(() => value.trim().length === 0, [value]);

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar estatuas"
          className="w-full rounded-xl border border-slate-300 px-3 py-2 pr-20 outline-none focus:ring-2 focus:ring-slate-400"
        />
        {!isEmpty && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            ×
          </button>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl border px-4 py-2 hover:bg-slate-50 active:scale-[0.99]"
        aria-label="Buscar"
      >
        Buscar
      </button>
    </form>
  );
}
