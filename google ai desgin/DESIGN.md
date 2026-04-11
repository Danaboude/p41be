# Design System Specification: Industrial Intelligence

## 1. Overview & Creative North Star
The core objective of this design system is to bridge the gap between heavy industrial heritage and futuristic digital management. We are moving away from the standard "corporate template" toward a high-end, editorial experience defined by the Creative North Star: **"The Architectural Engine."**

Like a modern precision factory, the UI should feel structured, airy, and powerful. We achieve this through **Intentional Asymmetry**—where large-scale typography meets tight, data-driven modules. We avoid the "boxed-in" feel of traditional enterprise software by using expansive white space (`surface`) contrasted against deep, authoritative "Engine Rooms" (`inverse_surface`). By layering elements with tonal shifts rather than lines, the interface feels fluid and high-performance.

---

## 2. Colors
Our palette balances the "Human" (Management) and the "Machine" (Industry 4.0).

*   **Primary (`#006a64`) & Primary Container (`#5fcfc6`):** These represent the "Vibrant Tech" pulse. Use them for high-impact actions and key brand accents.
*   **Secondary (`#1c6777`):** Use this for analytical components, providing a steady, professional counterpart to the vibrant primary.
*   **Surface Hierarchy (The Depth Scale):**
    *   `surface`: The canvas. Pure, expansive, and high-contrast.
    *   `surface_container_low`: Used for secondary background sections to provide a subtle "hush" of color.
    *   `surface_container_high`: Used for elevated interactive cards or nested data modules.

### The "No-Line" Rule
Explicitly prohibited: 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. To separate a section, transition from `surface` to `surface_container_low`. This creates a sophisticated, "borderless" look that feels premium and integrated.

### The "Glass & Gradient" Rule
To inject a sense of "futuristic established" energy:
*   **Floating Elements:** Use `surface_container_lowest` at 80% opacity with a `24px` backdrop-blur for navigation bars or floating action panels.
*   **Signature Textures:** Apply a linear gradient from `primary` to `primary_container` (angled at 135°) for hero CTA buttons. This adds a "machined" metallic sheen that flat color cannot replicate.

---

## 3. Typography
We utilize a dual-font approach to emphasize the industrial-meets-modern aesthetic.

*   **Display & Headlines (Inter):** These are our "Structural Bold" elements. Set `display-lg` and `headline-lg` with tight letter spacing (-0.02em) to mimic high-end architectural journals. Use bold weights to command authority.
*   **Body (Inter):** High readability is paramount. Maintain ample line-height (1.6) for `body-lg` to ensure data-heavy consultancy reports remain digestible.
*   **Labels (Space Grotesk):** We introduce **Space Grotesk** for `label-md` and `label-sm`. This monospaced-leaning sans-serif provides a "data-driven" look for technical specs, micro-copy, and button labels, reinforcing the Industry 4.0 identity.

---

## 4. Elevation & Depth
In this system, depth is a result of **Tonal Layering**, not structural ornamentation.

*   **The Layering Principle:** Stack surfaces to create focus. A `surface_container_lowest` card sitting on a `surface_container_low` background creates a natural, soft lift.
*   **Ambient Shadows:** For high-priority floating elements (like a "Request a Demo" modal), use an ultra-diffused shadow: `offset: 0 12px, blur: 40px, color: rgba(21, 27, 42, 0.06)`. This mimics soft studio lighting rather than a digital drop shadow.
*   **The "Ghost Border" Fallback:** If a container sits on an identical color background, use the `outline_variant` token at **15% opacity**. It should be felt more than seen.
*   **Glassmorphism:** Use semi-transparent layers for elements that "hover" over data visualizations, ensuring the underlying information remains visible but secondary.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary` to `primary_container`), `9999px` (Full) roundedness, `Space Grotesk` Bold label.
*   **Secondary:** `surface_container_highest` background with `on_surface` text. No border.
*   **Tertiary:** No background. Underline on hover using the `primary` color at 2px thickness.

### Input Fields
*   **Styling:** Forgo the 4-sided box. Use a `surface_container_high` background with a slightly darker `outline_variant` bottom border (2px) only. This creates a modern, editorial form feel.
*   **States:** On focus, the bottom border transitions to `primary`.

### Cards & Lists
*   **Rule:** Zero dividers. 
*   **Implementation:** Group list items using vertical white space (use the `1.5rem` spacing token). Separate card groups by nesting a `surface_container_lowest` card within a `surface_container_low` section wrapper.

### Industrial "Pulse" Chips
*   **Selection Chips:** Use `secondary_container` with `on_secondary_container` text. Use `sm` roundedness (`0.125rem`) for a sharper, more industrial "tag" look compared to rounded buttons.

---

## 6. Do's and Don'ts

### Do
*   **Do** use extreme white space. If you think there is enough padding, add 16px more.
*   **Do** use "Editorial Offsets." Place images so they slightly overlap the boundary between two background color sections.
*   **Do** use high-quality, desaturated industrial photography (blue/grey tones) to allow the `primary` accents to pop.

### Don't
*   **Don't** use 100% black. Use `on_background` (#151b2a) for text to maintain a sophisticated tonal depth.
*   **Don't** use standard "Material Design" shadows. They are too aggressive for this "Established" brand.
*   **Don't** use icons as the primary focus. Icons should be functional and "Ghostly" (using `outline` color), letting the typography do the heavy lifting.