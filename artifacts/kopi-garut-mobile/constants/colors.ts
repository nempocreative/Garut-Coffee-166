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

import { brandTokens } from '@workspace/kopi-garut-shared';

const colors = {
  light: {
    ...brandTokens,
    text: brandTokens.foreground,
    tint: brandTokens.primary,
    cardForeground: brandTokens.foreground,
  },
  radius: 8,
};

export default colors;
