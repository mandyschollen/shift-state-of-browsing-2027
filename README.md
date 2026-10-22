# Shift – The 2027 State of Browsing Report (landing page prototype)

Mandy Schollen's HTML/CSS prototype for Shift's 2027 State of Browsing landing page, a page full of stats from Shift's survey of 1,000 US internet users.

## View it

Open `index.html` in a browser by double-clicking it. You don't need a build step or a server; it's plain HTML, CSS and JavaScript.

## What's on the page

- **Nav:** dark pill nav with the Shift logo and Download PDF. The chapter row below the hero flies up into the nav once you scroll past it, and the chip for the chapter you're reading is highlighted.
- **Hero:** "The 2027 State of Browsing Report" over the Figma light leak.
- **Four chapters:** collapsible cards. *Expand insights* opens each chapter's stat cards.
  1. Browser loyalty: Chrome market-share ring (58%), familiarity bars (90%, 25%, 38%), gauges (54%, 32%)
  2. Digital burnout: burnout donut, 4-in-10 tabs, gauges (20%, 43%)
  3. Privacy & control: decision drivers, top frustrations, control and AI-concern stats
  4. What we want from AI: AI adoption by age, practical AI uses, opt-in preferences
- **Stat cards:** every stat has a Share button and the "shift.com/state-of-browsing · The 2027 State of Browsing Report" stamp. Charts animate in on scroll: bars grow, gauges and the donut sweep round, and numbers count up.
- **End of the page:** the "Reimagine your browser" CTA and the shift.com footer.

## Sources

- **Design:** Figma, Shift Website (WIP), Section 2. https://www.figma.com/design/yRiTzEUObUFSjSJbxfKknY/Shift-Website--WIP-?node-id=25202-12440
- **Brand:** Shift Design System 2.0 (colours and typography). https://www.figma.com/design/zBPdqo3KdG4gsc62BaiFyq/Design-System-2.0
- **Copy:** "State of Browsing 2027: Copy Draft" (Google Doc).
- **Fonts:** Geist and Geist Mono, self-hosted in `assets/fonts/`.

## Notes and open questions

- Chapters 1 and 2 follow the Figma expanded screen exactly. Chapters 3 and 4 only exist collapsed in Figma, so when expanded they reuse the same card styles.
- The 63% burnout figure was dropped. The page uses the design's "More than half of Americans…" wording with the donut breakdown.
- The Summary, email download form, "About the report" and "Read last year's report" pop-out from the copy doc aren't in this design, so they were left out.
- Gauge arcs are drawn in code (same cream-to-blue gradient as Figma) so they can animate and work for any percentage.

## History

This copy lives on Mandy's personal GitHub. The original is in the team sandbox at `redbrickmedia/content-team-sandbox`, folder `Mandy/shift-state-of-browsing-2027/`. It was copied here while the shared sandbox couldn't publish, because of an unrelated build error in another prototype.

- **2026-10-16:** First concept, a calmer Shift-branded take on Jorge's concept. Started light, then moved to the dark theme, with a centred hero and no floating shapes.
- **2026-10-20:** Rebuilt to Mandy's polished Figma design: collapsible chapters, the nav that absorbs the chapter row, the stat card designs and animations.
- **2026-10-21:** Added the remaining Figma images (hero light leak, card glows, chapter grid) and checked the page against Figma at desktop and phone sizes.
- **2026-10-22:** Standalone copy made for this repository: plain CSS with no build step, and fonts bundled.
