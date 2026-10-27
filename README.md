# Shift – The 2027 State of Browsing Report (landing page prototype)

Mandy Schollen's HTML/CSS prototype for Shift's 2027 State of Browsing landing page, a page full of stats from Shift's survey of 1,000 US internet users.

## View it

Open `index.html` in a browser by double-clicking it. You don't need a build step or a server; it's plain HTML, CSS and JavaScript.

## What's on the page

- **Nav:** there's no nav over the hero, just the Shift logo centred 80px from the top. Once you scroll past the chapter row, the whole nav (Shift logo, the four chapters and Download PDF) softly fades in, and the chip for the chapter you're reading is highlighted.
- **Hero:** "The 2027 State of Browsing Report" over the Figma light leak, which stretches edge to edge on any screen width.
- **Four chapters:** collapsible cards. *Expand insights* opens each chapter's stat cards.
  1. Browser loyalty: Chrome market-share ring (58%), familiarity bars (90%, 25%, 38%), gauges (54%, 32%)
  2. Digital burnout: burnout donut, 4-in-10 tabs, gauges (20%, 43%)
  3. Privacy & control: decision-driver bubbles (36%, 33%, 32%), The Top 3 frustrations, gauges (64%, 48%, 80%, 34%), AI-concern bars
  4. What we want from AI: AI adoption bubbles by age (80%, 76%, 50%), practical AI uses, Nearly 3 in 5 dots, gauges (32%, 22%)
- **Stat cards:** every stat has a Share button and the "shift.com/state-of-browsing · The 2027 State of Browsing Report" stamp. Charts animate in on scroll: bars grow, gauges and the donut sweep round, and numbers count up. They replay every time a stat scrolls back into view (and when a chapter is reopened).
- **End of the page:** the "Reimagine your browser" CTA and the shift.com footer.

## Versions

- `index.html` (repo root): the version on the shared link, https://claude.ai/artifact/DGF65qNkmxzN3GCW3HZQgK
- `edits/`: Mandy's "2027 - edits" Figma updates (Shift Website WIP 25228:59507), privately previewed at https://claude.ai/artifact/J91VKrm5qStunk1FTBHFEq. Open `edits/index.html` the same way.

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
- **2026-10-22:** Nav chapters now softly fade in (staggered, with a small lift) instead of flying up from the chapter row.
- **2026-10-22:** There's no nav over the hero: the Shift logo sits centred above the title, 80px from the top, and the whole nav fades in once you scroll past the chapter row. The hero light leak stretches full width on large screens. Open chapters grow to the full screen width, and neighbouring open chapters share one divider line.
- **2026-10-22:** Stats re-animate every time a chapter is reopened.
- **2026-10-22:** Reverted the full-width chapters: open chapters stay at the regular centred size again (the merged divider lines went with it).
- **2026-10-22:** Burnout donut sweep now starts just before 12 o'clock so the dark grey segment's rounded end isn't clipped.
- **2026-10-22:** 4-in-10 dots rebuilt as 10 separate circles (same colours, outline and glow as Figma). They pop in one by one and shrink to fit smaller screens instead of being cut off. Stacked cards on phones no longer leave a gap.
- **2026-10-22:** Nav chapter titles are never cut off: chips stay equal width when there's room but never shrink below their title; between 1100 and 1240px the 01–04 numbers drop out to make room.
- **2026-10-22:** The big gradient numbers (58%, 36%, 68%) no longer get clipped along the top.
- **2026-10-22:** Applied Mandy's Figma edits (Shift Website WIP, section 'SOB 2027' 25216:13050): smaller split-card numbers (48px) and light-blue 14px bar labels; chapter 3 decision drivers and chapter 4 AI adoption as glowing bubbles with colour legends; 'The Top 3' panel list; big-title AI concerns and practical-uses cards; new 'Nearly 3 in 5' dots card; opt-in gauges now 32% and 22%.
- **2026-10-22:** Stat animations replay every time a card scrolls into view, not just when its chapter is reopened.
- **2026-10-22:** Shareable link published: https://claude.ai/artifact/DGF65qNkmxzN3GCW3HZQgK. Share buttons now copy the stat when a browser refuses the share sheet.
- **2026-10-22:** "Nearly 3 in 5" dots sit against the card's right edge on desktop (as in Figma) and are centred on tablet and phone.
- **2026-10-27:** New `edits/` copy with the "2027 - edits" Figma updates: labelled thin bars, a 58% ring with the number inside (no Chrome logo), new lit/unlit dots, the donut and bubble cards with legends above the charts, solid-colour bubbles in the new layouts, updated chapter 3 and 4 copy, chapter 4 re-ordered, plus new Summary, "Download the report" email form and About sections with popping circle clusters. Same animations as before. Private preview link: https://claude.ai/artifact/J91VKrm5qStunk1FTBHFEq
