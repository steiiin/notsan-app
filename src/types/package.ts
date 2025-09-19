export interface PackageIncredient {
  amount: string
  label?: string
}
export interface Package {
  id: string,
  type: "amp" | "amp-2x" | "amp-flsk" | "flsk" | "flexamp" | "inhaler" | "infusion" | "spray" | "supp" | "pill" | "spritz",
  name: string,
  incredients: PackageIncredient[]
}