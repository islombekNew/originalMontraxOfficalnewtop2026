# Montrax Portfolio PRD

## Status
This PRD consolidates and extends the previous sections.

### 1. Project Overview
- Premium portfolio for Montrax.
- Goal: convert visitors into clients through trust and exceptional presentation.
- Audience: businesses, startups, personal brands, agencies, international clients.

### 2. Design System
- Dark-only theme.
- Colors:
  - Background #040604
  - Surface #111712
  - Primary #1F7A4C
  - Accent #39D98A
- Premium typography (General Sans/Satoshi/Inter).
- SVG icons only.
- No emojis in UI.
- Glassmorphism, subtle noise, cinematic lighting.
- Smooth animations with Framer Motion + GSAP.
- Custom cursor.
- 3D interactions.
- AI-generated/template look is forbidden.

### 3. Website Structure
Loading → Hero → Trust → About → Services → Why Montrax → Process → Portfolio → Technologies → Testimonials → FAQ → Contact → Footer.

### 4. Motion
- Lenis smooth scroll.
- Framer Motion for UI.
- GSAP where needed.
- Stagger reveal.
- Parallax.
- Magnetic buttons.
- Hover depth.
- Scroll progress.
- Reduced motion accessibility support.

### 5. Components
Navbar, Buttons, Cards, Portfolio cards, Modals, Inputs, Accordions, Timeline, Stats, Footer.
All reusable and responsive.

### 6. Portfolio
Each project:
- Hero image
- Overview
- Problem
- Solution
- Technologies
- Gallery
- Results
- CTA

Categories:
Graphic Design, Branding, Web, Landing Page, Telegram Bot, AI, SMM, UI/UX.

### 7. Localization
Languages:
- Uzbek
- English

Every visible string must be localized.
Persist language in LocalStorage.
No mixed-language UI.
Use structured JSON dictionaries.

### 8. Contact
Telegram:
@Montrax_offical

Channel:
@montrax_kanal

Instagram:
https://www.instagram.com/montraxoffical/

GitHub:
https://github.com/islombekNew

Contact form:
Name, Email, Telegram, Company, Service, Budget, Description.

### 9. Technical Stack
Next.js
TypeScript
Tailwind CSS
Framer Motion
GSAP
Lenis
Lucide Icons
next-intl/i18next
Vercel-ready

### 10. Performance
Lighthouse target:
95+

Lazy loading
Image optimization
Font optimization
Code splitting

### 11. SEO
Metadata
OpenGraph
Twitter Cards
Schema.org
robots.txt
sitemap.xml
hreflang
Canonical URLs

### 12. Accessibility
Semantic HTML
Keyboard navigation
Visible focus
WCAG-friendly contrast

### 13. AI Restrictions
No templates.
No Bootstrap look.
No DaisyUI look.
No generic Tailwind blocks.
No copied layouts.
Every section must feel custom.

### 14. Quality Checklist
- Responsive
- Fast
- Accessible
- SEO optimized
- Premium animations
- Fully bilingual
- Production ready
- Clean code
- Reusable components
- Consistent spacing
- Trust-building UX

Final requirement:
The website itself must serve as Montrax's strongest portfolio piece and persuade visitors to start a project.
