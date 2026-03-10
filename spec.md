# Insight Essays

## Current State
Single-page site with: sticky navbar, hero section, featured essays grid (4 cards), about section with stats, categories filter pills, newsletter signup, and footer with social icons. No section classification or categorized content sections.

## Requested Changes (Diff)

### Add
- **Section navigation** with 5 classified sections: Movies, Random Insights, Opinions, Books & Articles, Online Resources
- **Movies section** as a dedicated page/section showing movie review cards with:
  - City of God (1970s/2002, Brazilian film about favelas in Rio de Janeiro) — user's review: raw filmmaking, real hood members cast, explores life of young boys in crime/gang wars, drugs normalized, purposeless lives, touches on Bhagavat Gita concept of desire slavery. Director used real favela residents for authenticity.
  - Forrest Gump — user's review: 75% humor / 15% drama / 10% reality check, peaceful flow, no twists, happy ending overall. Commentary on being too nice/naive in a pragmatic world, soldier life, social hardships. Jenny dies at end (implied HIV). Calm and beautiful watch.
- Each movie card shows: title, year, genre tags, user's personal review text (their voice preserved), and a rating/mood tag
- **Contact email** `dakshesh236@gmail.com` added to the footer and a dedicated contact section
- **Navbar updated** to include the 5 new section tabs: Movies, Insights, Opinions, Books & Articles, Online Resources (replacing or alongside current nav items)

### Modify
- Footer: add email link for dakshesh236@gmail.com
- Categories section: update to reflect the 5 new main content sections
- Existing essays section can remain but be labeled under appropriate category

### Remove
- Nothing removed, just reorganized

## Implementation Plan
1. Add section-based navigation tabs (Movies, Random Insights, Opinions, Books & Articles, Online Resources) to navbar and as section anchor links
2. Create `MoviesSection` component with two movie review cards (City of God + Forrest Gump) using the user's own words/voice
3. Create placeholder sections for Insights, Opinions, Books & Articles, Online Resources with "Coming Soon" empty states
4. Add contact email to footer as a mailto link
5. Update navbar links to include all 5 sections
6. Ensure all interactive elements have proper data-ocid markers
