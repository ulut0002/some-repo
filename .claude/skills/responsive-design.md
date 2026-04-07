---
name: responsive-design-rules
description: Defines how viewport breakpoints and container queries must be used across the application
---

# Responsive Design Rules

## Core Principle

- Viewport breakpoints → control page layout
- Container queries → control component behavior

These must remain strictly separated.

---

## Viewport (Page-Level)

Use viewport breakpoints only for high-level layout.

### Breakpoints
- mobile → default
- tablet → md
- desktop → lg

### Allowed Usage
- page layout (grid, sections, navigation)
- global structure

### Forbidden
- Do NOT use viewport breakpoints inside reusable components
- Do NOT control component layout based on screen size

---

## Container Queries (Component-Level)

All reusable components must respond to their container size.

### Requirements
- Every widget or reusable component MUST be wrapped in a container (`@container`)
- Child elements MUST use container queries (`@sm`, `@md`, etc.)

### Behavior
- Small container → simplified / compact layout
- Large container → expanded / detailed layout

---

## Dashboard Rules

- Every dashboard widget MUST:
  - be container-wrapped
  - adapt using container queries
  - work in any size or layout

### Widgets must function correctly:
- in narrow panels
- in wide panels
- when dynamically resized

---

## Separation Rules

- Components MUST depend only on container size
- Components MUST NOT depend on viewport size

### Strict Rule
- Do NOT mix viewport breakpoints and container queries in the same component

---

## Consistency

- All components must follow the same responsive pattern
- Reuse existing container-query patterns
- Do NOT invent custom responsive logic per component

---

## Forbidden

- No fixed-width components
- No screen-size assumptions inside components
- No viewport-based logic in widgets

---

## Goal

- Build fully reusable, layout-independent components
- Ensure consistent behavior across dynamic dashboard layouts
- Support flexible resizing without breaking UI