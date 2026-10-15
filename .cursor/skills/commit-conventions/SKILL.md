# Conventional Commits

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

## Types

- `feat` — new feature
- `fix` — bug fix
- `perf` — performance improvement
- `refactor` — code restructuring
- `style` — CSS/styling changes
- `docs` — documentation only
- `chore` — build, deps, config
- `wip` — work in progress

## Scopes (Birthday LAN)

- `countdown` — countdown components
- `3d`, `three` — 3D scene
- `postfx` — post-processing
- `audio` — audio
- `style` — CSS/themes
- `data` — palettes/messages
- `state` — zustand stores
- `hooks` — React hooks
- `phase` — phase transitions

## Rules

- Use imperative mood: "add" not "added"
- Keep subject line ≤72 characters
- Body wrap at 100 characters
- Reference issues: `Closes #123`

## Examples

```
feat(countdown): add Digit10 phase with big number animation
perf(three): upgrade bloom to kernelSize HUGE with mipmapBlur
fix(wish): prevent double blow-candle trigger
docs: add GTA3D documentation
chore: upgrade Three.js to r169
```
