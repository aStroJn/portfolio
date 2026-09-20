# Toolbox Shelf Tech Stack --- Implementation Plan

## 1. Objective

Implement the technology stack inside the existing illustrated bookshelf
in `ToolboxSection.tsx`.

The final result must make the technologies look like they were
intentionally designed into the shelf artwork rather than appearing as
conventional floating UI icons.

### Visual direction

-   Use the eight dark display compartments already present in the shelf
    artwork.
-   Place one technology icon inside each compartment.
-   Preserve the original illustrated shelf artwork.
-   Keep the technology icons visually subordinate to the artwork.
-   Use subtle depth/shadow treatment rather than neon effects, cards,
    borders, or large glows.
-   Keep the implementation responsive by positioning icons with
    percentages rather than fixed viewport pixels.
-   Keep technology data separate from the layout/component logic so the
    stack can be changed easily later.
-   Keep the implementation compatible with the current React/TypeScript
    structure.

The existing `ToolboxSection` already separates the header and shelf
into independent layout areas, and the shelf wrapper is positioned
relatively. This makes the shelf wrapper the correct coordinate system
for the technology layer.

------------------------------------------------------------------------

# 2. Current Component Context

Current structure:

``` text
ToolboxSection
│
├── Section container
│
├── Header row
│   ├── Plant image
│   └── Section title SVG
│
└── Shelf container
    └── section-two-shelf.webp
```

The existing shelf container uses:

``` tsx
position: 'relative'
```

and the shelf image is rendered inside that container.

This should be preserved. The technology layer will be positioned
absolutely inside the same relative container so its percentage
coordinates remain tied to the shelf artwork.

Reference: the current component defines the shelf wrapper and shelf
image in the lower portion of `ToolboxSection`.
fileciteturn0file0L76-L100

------------------------------------------------------------------------

# 3. Target Architecture

Change the shelf area to:

``` text
ToolboxSection
│
├── Header
│   ├── Plant
│   └── Title
│
└── Shelf Scene
    │
    ├── Shelf Artwork
    │   └── section-two-shelf.webp
    │
    └── Technology Layer
        │
        ├── TechObject
        │   ├── Python
        │   ├── React
        │   ├── Node.js
        │   ├── TypeScript
        │   ├── Git
        │   ├── Docker
        │   ├── PostgreSQL
        │   └── JavaScript
        │
        └── Interaction / Hover
```

The important architectural rule is:

> The shelf artwork and technology layer must share the same parent
> coordinate system.

Do not position technology icons relative to the entire page.

------------------------------------------------------------------------

# 4. Recommended File Structure

Use the following structure:

``` text
public/
└── assets/
    └── site/
        └── section-two/
            ├── section-two-top-left-plant.png
            ├── section-two-title.svg
            ├── section-two-shelf.webp
            │
            └── tech/
                ├── python.svg
                ├── react.svg
                ├── node.svg
                ├── typescript.svg
                ├── git.svg
                ├── docker.svg
                ├── postgres.svg
                └── javascript.svg

src/
└── components/
    └── ToolboxSection.tsx
```

If the project already has a dedicated components/assets organization,
preserve that convention instead of unnecessarily restructuring the
project.

------------------------------------------------------------------------

# 5. SVG Asset Strategy

The supplied Python icon should remain an SVG.

Do not convert the SVGs to PNG unless a specific rendering problem
requires it.

Use the icons as external SVG image assets:

``` tsx
<img
  src="/assets/site/section-two/tech/python.svg"
  alt="Python"
/>
```

### Reason

The technology logos are independent visual assets. Keeping them as
external SVG files:

-   preserves resolution at different sizes;
-   keeps `ToolboxSection.tsx` readable;
-   makes individual icons easy to replace;
-   avoids embedding large SVG markup inside the component;
-   isolates SVG definitions such as gradients and clip paths.

The provided Python SVG contains gradients and internal SVG IDs, so
external `<img>` usage is preferred for predictable isolation.

------------------------------------------------------------------------

# 6. Technology Data Model

Do not hard-code every technology directly into the visual layout if the
final implementation can avoid it.

Create a data array:

``` tsx
type Technology = {
  name: string;
  icon: string;
  x: string;
  y: string;
  size: string;
};
```

Example:

``` tsx
const technologies: Technology[] = [
  {
    name: 'Python',
    icon: '/assets/site/section-two/tech/python.svg',
    x: '25.2%',
    y: '32%',
    size: 'clamp(55px, 5.5vw, 92px)',
  },
  {
    name: 'React',
    icon: '/assets/site/section-two/tech/react.svg',
    x: '39.7%',
    y: '32%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'Node.js',
    icon: '/assets/site/section-two/tech/node.svg',
    x: '54.9%',
    y: '32%',
    size: 'clamp(52px, 5.2vw, 86px)',
  },
  {
    name: 'TypeScript',
    icon: '/assets/site/section-two/tech/typescript.svg',
    x: '69.5%',
    y: '32%',
    size: 'clamp(48px, 5vw, 80px)',
  },
  {
    name: 'Git',
    icon: '/assets/site/section-two/tech/git.svg',
    x: '25.2%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'Docker',
    icon: '/assets/site/section-two/tech/docker.svg',
    x: '39.7%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'PostgreSQL',
    icon: '/assets/site/section-two/tech/postgres.svg',
    x: '54.9%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'JavaScript',
    icon: '/assets/site/section-two/tech/javascript.svg',
    x: '69.5%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
];
```

These are initial values. They must be visually calibrated against the
actual rendered shelf.

------------------------------------------------------------------------

# 7. Shelf Coordinate System

The shelf artwork contains eight primary display compartments.

Use normalized percentage coordinates rather than fixed pixel
coordinates.

## Upper row

Approximate initial centers:

  Slot         X     Y
  ------ ------- -----
  1        25.2%   32%
  2        39.7%   32%
  3        54.9%   32%
  4        69.5%   32%

## Lower row

Approximate initial centers:

  Slot         X     Y
  ------ ------- -----
  5        25.2%   72%
  6        39.7%   72%
  7        54.9%   72%
  8        69.5%   72%

These values are starting coordinates, not immutable measurements.

Final positioning must be visually calibrated in the browser at desktop,
tablet, and mobile widths.

------------------------------------------------------------------------

# 8. `TechIcon` Component

Create a reusable component outside `ToolboxSection()`.

Recommended interface:

``` tsx
type TechIconProps = {
  src: string;
  alt: string;
  x: string;
  y: string;
  size?: string;
};
```

Implementation:

``` tsx
function TechIcon({
  src,
  alt,
  x,
  y,
  size = 'clamp(48px, 5vw, 88px)',
}: TechIconProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}
```

Keep this component deliberately small.

It should be responsible for rendering a technology object, not for
managing the shelf layout.

------------------------------------------------------------------------

# 9. Shelf Scene Implementation

The current shelf wrapper should remain:

``` tsx
position: 'relative'
```

Inside it, render two layers:

``` text
Shelf Scene
│
├── Shelf Image
│
└── Technology Layer
```

Recommended structure:

``` tsx
<div
  style={{
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 'clamp(-16.5rem, -20vw, -10.5rem)',
    zIndex: 2,
    lineHeight: 0,
  }}
>
  <img
    src="/assets/site/section-two/section-two-shelf.webp"
    alt="Toolbox shelf"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
    }}
  />

  <div
    style={{
      position: 'absolute',
      inset: 0,
    }}
  >
    {technologies.map((tech) => (
      <TechIcon
        key={tech.name}
        src={tech.icon}
        alt={tech.name}
        x={tech.x}
        y={tech.y}
        size={tech.size}
      />
    ))}
  </div>
</div>
```

------------------------------------------------------------------------

# 10. Remove `objectFit: 'cover'`

The shelf is a composed illustration and must preserve its aspect ratio.

Do not use:

``` tsx
objectFit: 'cover'
```

on the shelf artwork.

Use:

``` tsx
width: '100%',
height: 'auto',
display: 'block',
```

instead.

This prevents the shelf artwork from being cropped or distorted and
keeps the percentage-based technology coordinates aligned with the
artwork.

The existing component currently uses `objectFit: 'cover'` on the shelf
image, so this is an intentional implementation change.
fileciteturn0file0L88-L98

------------------------------------------------------------------------

# 11. Visual Treatment

## 11.1 Do not use conventional UI cards

Do not add:

-   white cards;
-   rounded containers;
-   borders around icons;
-   colored backgrounds;
-   neon glows;
-   badges;
-   floating glassmorphism;
-   generic tooltip bubbles by default.

The shelf itself is the visual container.

The technology icon should appear to belong to the illustration.

------------------------------------------------------------------------

# 12. Icon Scale

The empty shelf compartments should remain visible.

Do not make an icon fill an entire compartment.

Start with:

``` css
width: clamp(48px, 5vw, 88px);
height: clamp(48px, 5vw, 88px);
```

Use slightly different sizes where the logo geometry requires it.

Example:

``` text
Python       ~90px
React        ~80px
Node.js      ~85px
TypeScript   ~78px
Git          ~80px
Docker       ~80px
PostgreSQL   ~80px
JavaScript   ~78px
```

These are visual starting points rather than strict specifications.

------------------------------------------------------------------------

# 13. Lighting and Shadow

The existing shelf artwork already contains strong illustrated lighting
and dark depth.

The technology icons should therefore use restrained shadows.

Recommended:

``` tsx
filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.35))'
```

Avoid:

``` css
filter: drop-shadow(0 0 20px ...);
```

or bright outer glows.

The icons should feel embedded in the scene rather than illuminated
independently from it.

------------------------------------------------------------------------

# 14. Optional Contact Shadow

If the icons visually appear to float inside the compartments, add a
small shadow below each icon.

Structure:

``` text
TechIcon
│
├── Icon
└── ContactShadow
```

Example:

``` tsx
<div
  style={{
    position: 'absolute',
    left: '50%',
    bottom: '-4px',
    transform: 'translateX(-50%)',
    width: '55%',
    height: '7px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.22)',
    filter: 'blur(4px)',
  }}
/>
```

Only use this if the artwork needs it.

Because the icons are inside dark compartments rather than physically
sitting on the horizontal shelf surface, the shadow should be subtle.

------------------------------------------------------------------------

# 15. Rotation

Do not heavily rotate the logos.

These are displayed inside designed compartments, so they should mostly
remain upright.

Acceptable range:

``` text
-2° to +2°
```

Do not use:

``` text
-10°
+12°
```

for this particular composition.

The existing shelf has strong perspective and illustration details;
excessive icon rotation will introduce unnecessary visual noise.

------------------------------------------------------------------------

# 16. Layering / Z-Index

Initial layer order:

``` text
ToolboxSection
│
├── Header                 z-index: 3
│
└── Shelf Scene            z-index: 2
    │
    ├── Shelf artwork
    │
    └── Technology layer
```

The technology layer should remain inside the shelf scene.

Do not give individual icons an unnecessarily high global z-index.

This prevents the icons from accidentally appearing above unrelated
sections of the page.

------------------------------------------------------------------------

# 17. Interaction

The icons may be interactive, but interaction should be subtle.

Recommended hover behavior:

``` text
Default
    icon
     ↓
  stationary

Hover
    icon
     ↑
  slightly lifted
```

Suggested transition:

``` css
transition: transform 180ms ease;
```

On hover:

``` css
transform: translate(-50%, calc(-50% - 4px));
```

Do not use large scaling.

Avoid:

``` css
transform: scale(1.3);
```

because it will break the physical/illustrated appearance.

------------------------------------------------------------------------

# 18. Accessibility

Every technology icon must have a meaningful `alt` value:

``` tsx
alt="Python"
alt="React"
alt="Node.js"
alt="TypeScript"
```

If an icon is purely decorative and the technology name is already
exposed elsewhere, `aria-hidden="true"` may be used.

If the icons become interactive, they must have an accessible label and
keyboard interaction.

Do not make an `<img>` clickable without providing a keyboard-accessible
interaction model.

------------------------------------------------------------------------

# 19. Responsive Behavior

The shelf is responsive because its width is currently `100%`.

The technology system must scale with it.

Use:

``` tsx
left: '25.2%'
top: '32%'
```

rather than:

``` tsx
left: '516px'
top: '190px'
```

Use:

``` css
width: clamp(48px, 5vw, 88px);
```

rather than:

``` css
width: 80px;
```

for the default sizing.

## Mobile

At narrow widths, the eight-icon layout may become visually crowded.

Do not immediately create a completely different layout.

First test:

1.  desktop;
2.  1440px;
3.  1024px;
4.  768px;
5.  480px;
6.  375px.

If the icons become too small or overlap, introduce a mobile-specific
size/position adjustment.

The shelf artwork itself should remain the visual source of truth.

------------------------------------------------------------------------

# 20. Mobile Strategy

If required, add a responsive modifier through CSS classes or media
queries.

Example:

``` css
@media (max-width: 600px) {
  .tech-icon {
    width: clamp(34px, 9vw, 54px);
    height: clamp(34px, 9vw, 54px);
  }
}
```

If individual positions need adjustment, use CSS custom properties
rather than duplicating the entire component.

Example:

``` css
.tech-python {
  left: 25.2%;
  top: 32%;
}

@media (max-width: 600px) {
  .tech-python {
    left: 25%;
    top: 31%;
  }
}
```

Do not create separate desktop and mobile copies of all eight icons
unless absolutely necessary.

------------------------------------------------------------------------

# 21. Data/Layout Separation

Keep these concerns separate:

### Technology data

``` tsx
const technologies = [...]
```

### Rendering

``` tsx
{technologies.map(...)}
```

### Visual component

``` tsx
TechIcon
```

### Shelf artwork

``` tsx
section-two-shelf.webp
```

This gives the implementation a clean separation of concerns.

Changing:

``` tsx
name
icon
x
y
size
```

should not require changing the shelf rendering logic.

------------------------------------------------------------------------

# 22. Recommended Initial Technology Arrangement

Use this only as the initial implementation:

## Upper shelf

``` text
Python       React       Node.js       TypeScript
```

## Lower shelf

``` text
Git          Docker      PostgreSQL    JavaScript
```

The arrangement can later be changed without modifying the component
architecture.

If the portfolio's actual technology stack differs, replace the entries
in the data array only.

------------------------------------------------------------------------

# 23. Do Not Hard-Code the SVG Markup

Do not do this:

``` tsx
<TechIcon
  icon={
    <svg>
      ...
      hundreds of lines...
    </svg>
  }
/>
```

Keep the SVG in:

``` text
public/assets/site/section-two/tech/
```

and reference it through its path.

This keeps the component maintainable.

------------------------------------------------------------------------

# 24. Recommended Final `ToolboxSection` Organization

The finished file should conceptually look like:

``` tsx
type Technology = {
  name: string;
  icon: string;
  x: string;
  y: string;
  size: string;
};

const technologies: Technology[] = [
  // ...
];

type TechIconProps = {
  src: string;
  alt: string;
  x: string;
  y: string;
  size?: string;
};

function TechIcon(...) {
  // ...
}

export function ToolboxSection(): JSX.Element {
  return (
    <section id="toolbox">
      {/* Header */}

      {/* Shelf Scene */}
      <div className="shelf-scene">
        <img
          src="/assets/site/section-two/section-two-shelf.webp"
          alt="Toolbox shelf"
        />

        <div className="technology-layer">
          {technologies.map((tech) => (
            <TechIcon
              key={tech.name}
              ...
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

The existing header structure should remain intact unless there is a
separate reason to refactor it.

------------------------------------------------------------------------

# 25. Implementation Sequence

Follow these steps in order.

## Step 1 --- Create the technology asset directory

Create:

``` text
public/assets/site/section-two/tech/
```

------------------------------------------------------------------------

## Step 2 --- Add the SVG files

Add:

``` text
python.svg
react.svg
node.svg
typescript.svg
git.svg
docker.svg
postgres.svg
javascript.svg
```

Do not modify the SVG artwork unless an individual asset has a rendering
problem.

------------------------------------------------------------------------

## Step 3 --- Create the `Technology` data array

Add the eight technology definitions.

Use the initial coordinates from this plan.

------------------------------------------------------------------------

## Step 4 --- Create `TechIcon`

Create the reusable icon component.

Keep it outside `ToolboxSection()`.

------------------------------------------------------------------------

## Step 5 --- Modify the shelf wrapper

Keep:

``` tsx
position: 'relative'
```

and add:

``` tsx
position: 'absolute'
inset: 0
```

for the technology layer.

------------------------------------------------------------------------

## Step 6 --- Remove `objectFit: 'cover'`

Use:

``` tsx
width: '100%'
height: 'auto'
```

for the shelf artwork.

------------------------------------------------------------------------

## Step 7 --- Render technologies with `.map()`

Use:

``` tsx
technologies.map(...)
```

rather than manually repeating the entire component eight times.

------------------------------------------------------------------------

## Step 8 --- Calibrate positions

Open the site and adjust:

``` text
x
y
size
```

for each icon.

Do not alter the shelf artwork to accommodate the icons.

------------------------------------------------------------------------

## Step 9 --- Calibrate visual treatment

Adjust:

-   icon size;
-   shadow strength;
-   shadow blur;
-   icon vertical alignment;
-   spacing;
-   optional rotation.

The shelf artwork remains the visual reference.

------------------------------------------------------------------------

## Step 10 --- Add hover behavior

Only after the static composition is correct.

Do not introduce animation before the positioning is finalized.

------------------------------------------------------------------------

## Step 11 --- Test responsive widths

Test:

``` text
1920px
1440px
1280px
1024px
768px
480px
375px
```

Verify that every icon remains inside its intended compartment.

------------------------------------------------------------------------

## Step 12 --- Test accessibility

Verify:

-   meaningful alt text;
-   no broken images;
-   no keyboard traps;
-   interactive elements are keyboard accessible if interaction is
    added;
-   decorative elements are not unnecessarily exposed to screen readers.

------------------------------------------------------------------------

# 26. Acceptance Criteria

The implementation is complete when all of the following are true.

### Layout

-   [ ] The shelf artwork remains visually unchanged.
-   [ ] Eight technology icons occupy the eight intended display
    compartments.
-   [ ] Icons are positioned relative to the shelf scene.
-   [ ] No icon uses page-level fixed pixel positioning.
-   [ ] Icons remain aligned with the shelf when the viewport changes
    width.

### Visual design

-   [ ] Icons do not look like conventional UI cards.
-   [ ] Icons do not have excessive glow.
-   [ ] Icons do not overpower the shelf artwork.
-   [ ] Existing orange/dark shelf lighting remains visible.
-   [ ] Icons have enough negative space around them.
-   [ ] Icons feel visually integrated into the illustration.

### Code quality

-   [ ] SVG files are external assets.
-   [ ] Technology metadata is stored in a data array.
-   [ ] `TechIcon` is reusable.
-   [ ] Technology rendering uses `.map()`.
-   [ ] Shelf and technology layer share the same positioning context.
-   [ ] No unnecessary duplication exists.
-   [ ] Existing header implementation remains unaffected.

### Responsive behavior

-   [ ] Desktop layout works.
-   [ ] Tablet layout works.
-   [ ] Mobile layout works.
-   [ ] No icon overlaps another compartment.
-   [ ] No icon escapes the shelf artwork.
-   [ ] Shelf aspect ratio remains correct.

### Interaction

-   [ ] Hover behavior is subtle.
-   [ ] Icons do not jump excessively.
-   [ ] Animation does not affect neighboring layout.
-   [ ] Keyboard behavior is correct if icons become interactive.

------------------------------------------------------------------------

# 27. Things Explicitly Not To Do

Do not:

1.  Convert the SVG icons into raster images unnecessarily.
2.  Put the entire SVG markup into `ToolboxSection.tsx`.
3.  Use fixed viewport pixel coordinates for icon placement.
4.  Use `object-fit: cover` for the shelf artwork.
5.  Add conventional UI cards around the icons.
6.  Add large neon glows.
7.  Rotate the icons heavily.
8.  Make every icon the exact same visual size.
9.  Create duplicate desktop/mobile markup unnecessarily.
10. Modify the shelf artwork just to make positioning easier.
11. Build a separate technology grid below the shelf.
12. Replace the illustrated shelf aesthetic with a conventional
    portfolio component.

------------------------------------------------------------------------

# 28. Future Extension

The architecture should allow the shelf to evolve into an interactive
portfolio element.

Potential future additions:

``` text
Technology
    │
    ├── icon
    ├── name
    ├── category
    ├── experience/usage description
    └── projects
```

For example:

``` tsx
{
  name: 'React',
  icon: '/assets/site/section-two/tech/react.svg',
  category: 'Frontend',
  x: '39.7%',
  y: '32%',
  size: 'clamp(48px, 5vw, 82px)',
}
```

A future click could open a small illustrated tooltip or project
association.

Do not implement these future features as part of the initial shelf
implementation unless explicitly required.

------------------------------------------------------------------------

# 29. Final Design Principle

The technology stack should look like:

> **part of the artwork first, technology showcase second.**

The shelf already provides the visual structure. The implementation
should simply populate that structure with carefully scaled SVG assets.

The result should feel like the technologies were physically designed
into the illustrated environment from the beginning---not like a row of
developer logos was placed on top of an existing image.
