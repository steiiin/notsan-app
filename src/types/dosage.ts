export interface Dosage {
  type?: "adult" | "child" | "youth" | "none",
  target?: string,
  color?: "red" | "blue" | "orange" | "lila" | "green",
  dose: string,
  hint?: string,
}