/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#2A201D',
    tint: '#A8543B',

    // Core surfaces
    background: '#F6F0E8',
    foreground: '#2A201D',

    // Cards / elevated surfaces
    card: '#FFF9F1',
    cardForeground: '#2A201D',

    // Primary action color (buttons, links, active states)
    primary: '#A8543B',
    primaryForeground: '#FFF9F1',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#E7D9C8',
    secondaryForeground: '#3D2C26',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EDE3D6',
    mutedForeground: '#806E63',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#D3A15F',
    accentForeground: '#3D2C26',

    // Destructive actions (delete, error states)
    destructive: '#B84E45',
    destructiveForeground: '#FFF9F1',

    // Borders and input outlines
    border: '#DFD1C1',
    input: '#D4C2B1',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
