type NumberPalette = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000: string;
};

const grayPllater: NumberPalette = {
  100: "#FFFFFF",
  200: "#F9FAFB",
  300: "#F3F4F6",
  400: "#E5E7EB",
  500: "#D1D5DB",
  600: "#9CA3AF",
  700: "#6B7280",
  800: "#4B5563",
  900: "#1F2937",
  1000: "#000000",
};

const greenPalette: NumberPalette = {
  100: "#ECFDF5",
  200: "#D1FAE5",
  300: "#A7F3D0",
  400: "#6EE7B7",
  500: "#34D399",
  600: "#10B981",
  700: "#059669",
  800: "#047857",
  900: "#065F46",
  1000: "#064E3B",
};

const redPalette: NumberPalette = {
  100: "#FEF2F2",
  200: "#FEE2E2",
  300: "#FECACA",
  400: "#FCA5A5",
  500: "#F87171",
  600: "#EF4444",
  700: "#DC2626",
  800: "#B91C1C",
  900: "#991B1B",
  1000: "#7F1D1D",
};

const yellowPalette: NumberPalette = {
  100: "#FFFBEB",
  200: "#FEF3C7",
  300: "#FDE68A",
  400: "#FCD34D",
  500: "#FBBF24",
  600: "#F59E0B",
  700: "#D97706",
  800: "#B45309",
  900: "#92400E",
  1000: "#78350F",
};

const PurplePalette: NumberPalette = {
  100: "#FAF5FF",
  200: "#F3E8FF",
  300: "#E9D5FF",
  400: "#D8B4FE",
  500: "#C084FC",
  600: "#A855F7",
  700: "#9333EA",
  800: "#7E22CE",
  900: "#6B21A8",
  1000: "#581C87",
};

const paletteNames = {
  Gray: grayPllater,
  Red: redPalette,
  Green: greenPalette,
  Yellow: yellowPalette,
  Purple: PurplePalette,
};

type NamePalette = keyof typeof paletteNames;
export type Color = `${NamePalette}.${keyof NumberPalette}`;

const getColor = (color: Color): string => {
  const [name, nembrt] = color.split(".");
  const paletteName = name as NamePalette;
  const paletteNembrt = Number(nembrt) as keyof NumberPalette;

  return paletteNames[paletteName][paletteNembrt];
};

const getAllColors = (): string[] => {
  return [
    ...Object.values(grayPllater),
    ...Object.values(redPalette),
    ...Object.values(yellowPalette),
    ...Object.values(greenPalette),
    ...Object.values(PurplePalette),
  ];
};

export const colors = { getColor, getAllColors };
