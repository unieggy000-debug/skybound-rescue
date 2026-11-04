# Skybound Rescue: Storm Courier

An original browser arcade game made for ZhouYuan's STEM game project. Vanilla HTML, CSS and JavaScript. No build step or external assets.

## Play

- A/D or left/right arrows: steer.
- Space: open/fold the parachute.
- P: pause.
- Touch buttons support phones and tablets.
- Local co-op: one player steers; the other controls the canopy on the same device.

Complete three safe deliveries. Collect optional rings, refill boost with green batteries, avoid walls and patrol drones, and slow down before landing on the orange pad. Completed deliveries are preserved on retry. Choose the shelter or clinic route and an equipment upgrade after the first delivery.

All STEM background, learning objectives, MDA explanation, science references and AI disclosure are in the in-game **About the game** page.

## Development

Serve this repository with any static HTTP server. Run `node check.mjs` for game-engine checks. `index.html` is self-contained and is hosted by GitHub Pages from `main` / repository root.

Arcade physics are qualitative, deliberately simplified and not suitable for real engineering or rescue planning. Original code, narrative and procedural artwork created with AI assistance.
