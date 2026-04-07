---
name: accessibility-rules
description: Accessibility rules for the app
---

Accessibility Rules:

General:
- All UI must be accessible by keyboard
- All interactive elements must be reachable via TAB
- Focus order must follow visual order
- Do not trap focus unless inside a modal
- Accessibility must be considered during implementation, not after

Semantics:
- Use semantic HTML elements (button, input, label, table)
- Do NOT use divs for clickable elements
- Use proper roles only when necessary

Labels:
- All inputs must have labels (label + htmlFor OR aria-label)
- Do not leave inputs without accessible names

Buttons & Actions:
- Buttons must have clear text or aria-label
- Icon-only buttons must include aria-label

Images:
- All images must have alt text
- Decorative images must use alt=""

Forms:
- Show validation errors clearly
- Associate errors with inputs (aria-describedby)
- Required fields must be indicated
- Labels should be tied to the form elements

State & Feedback:
- Loading states must be announced or visible
- Disabled states must be clear
- Use aria-live for dynamic updates when needed

Color & Contrast:
- Do not rely on color alone to convey meaning
- Ensure sufficient contrast (use design tokens)
- Ensure color contrast is good for color blind people

Focus:
- Visible focus indicators must be present
- Do not remove outline without replacement

Tables:
- Use proper table structure (thead, tbody, th)
- Use scope="col" or "row" where appropriate

Modals:
- Focus must move into modal when opened
- Focus must return to trigger when closed