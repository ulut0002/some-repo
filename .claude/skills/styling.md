---
name: styling-rules
description: CSS/Styling rules for the app
---


Styling Rules:

General:
- Do NOT use inline styles (style, sx)
- All styling must be done using Tailwind CSS

Component Styling:
- Use className with Tailwind utilities
- Avoid long repeated className strings

Reusable Styles:
- Extract repeated patterns using @apply in CSS files
- Use semantic class names (e.g. toolbar-button, panel-header)

MUI Usage:
- Use MUI components for structure and behavior only
- Do NOT use MUI styling system (sx, styled)

Consistency:
- Reuse existing classes before creating new ones
- Follow design tokens for spacing, colors, typography

Forbidden:
- Do NOT use sx or inline style
- Do NOT mix Tailwind and inline styles
- Do NOT duplicate styling patterns across components

Goal:
- Achieve consistent, maintainable, and scalable styling