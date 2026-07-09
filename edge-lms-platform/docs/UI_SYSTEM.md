# UI SYSTEM: Edge LMS 2030

## Design Philosophy
- **Vibe:** Premium, calm, enterprise, consulting-led, not flashy.
- The UI should instill trust and focus, enabling learners to complete courses without distraction and empowering admins to make data-driven decisions.

## Strengthscape Color Palette
The following design tokens will be implemented in `tailwind.config.ts` and `globals.css`:

- **Deep Blue:** `#152E53` (Primary brand color, headers, primary buttons)
- **Maroon:** `#9B2423` (Secondary brand color, call-outs, active states)
- **Dark Grey:** `#4C4C4D` (Primary text, structural borders)
- **Green:** `#4FBC85` (Success states, progress completion, positive trends)
- **Yellow:** `#F3B41B` (Warnings, pending states, highlights)
- **Neutral:** `#848484` (Secondary text, inactive states, subtle borders)
- **Warm Background:** `#F7F7F5` (App background, avoiding stark clinical white)

## Component Strategy
- Use Tailwind CSS for utility-first styling.
- Create reusable base components (e.g., `<Button>`, `<Card>`, `<Badge>`) in `src/components/ui`.
- Use consistent border radii, subtle shadows for elevation (avoiding heavy dropshadows), and generous whitespace for a "calm" feel.
- Forms should have clear labels, accessible contrast, and distinct focus states.
