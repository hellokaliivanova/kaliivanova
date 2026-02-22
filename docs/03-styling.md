# Styling

**Framework**: Strict TailwindCSS. Custom CSS is forbidden.

## Design System Tokens
- **Theme**: Strict brutalist monochrome. `bg-white`, `text-black`, `border-black`. Gray (`text-gray-400`) permitted strictly for empty placeholders/secondary meta.
- **Typography**: System `font-sans`. Forced `uppercase`. Scale: `text-xs`/`text-sm`. Tightened (`leading-tight`, `tracking-tight`). Emulates a receipt or typographical specimen.
- **Structural Layout**:
  - Delimiters: Heavy use of 1px borders (`border-b`, `border-l`, `border-r`) echoing tabular data.
  - Positioning: Sticky headers (`sticky top-X`) enable persistent contextual reading during scroll.
- **Media**: `object-cover`. Adapted aspect ratios for snap grid fitting.

## Agent Directives for UI Modification
1. **Zero New Colors**: Maintain monochrome palette.
2. **Border Collapse Prevention**: Explicitly manage adjacent borders (e.g., `last:border-b-0`) to prevent 2px overlap artifacts.
