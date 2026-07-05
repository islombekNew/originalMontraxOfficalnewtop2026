/**
 * MONTRAX design tokens v3 — Warm Editorial (bronze + olive).
 * CSS tarafda ekvivalenti app/globals.css'da (data-theme atributi).
 * JS runtime'da rang kerak bo'lsa — Canvas/Three.js — bu qiymatlardan foydalan.
 */

export const lightPalette = {
  bg: "#f2ebde",
  surface: "#ebe2d0",
  surface2: "#ded1bb",
  line: "#d5c8b0",
  ink: "#1a1512",
  inkDim: "#4a3f37",
  muted: "#7a6f64",
  accent: "#a06d3a",
  accentDeep: "#7a5028",
  accentSoft: "#d4a568",
  olive: "#6b7a4f",
  paper: "#faf4e8",
} as const;

export const darkPalette = {
  bg: "#0f0c0a",
  surface: "#1a1613",
  surface2: "#241e1a",
  line: "#2a231d",
  ink: "#ecebe6",
  inkDim: "#b8b0a5",
  muted: "#7a7267",
  accent: "#d4a568",
  accentDeep: "#a07a3a",
  accentSoft: "#e8c48c",
  olive: "#a8b878",
  paper: "#1a1613",
} as const;
