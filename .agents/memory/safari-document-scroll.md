---
name: Expo web document scrolling
description: Expo Router web stacks can constrain document height through absolutely positioned route scenes.
---

Use browser document scrolling for long Expo web pages. Expo Router's Stack and Tabs can render web route scenes in viewport-sized, absolutely positioned wrappers, preventing long route content from increasing the document height. Use Slot for web route rendering at both the root and grouped layouts, while keeping Stack and Tabs on native platforms.

**Why:** An inner React Native web ScrollView made the image-heavy home page stutter, while Stack/Tabs scene wrappers could leave document height equal to the viewport and clip the remaining page. Browser document scrolling avoids both problems.

**How to apply:** Keep native navigation unchanged and use Slot for web in each layout that would otherwise mount Stack or Tabs scenes. Keep the custom mobile menu fixed outside route content and reserve its bottom space. Verify a long page's document scroll height exceeds the viewport and that scrolling changes `window.scrollY`; preserve viewport and safe-area handling for mobile Safari.