# Trilium Alt-Wheel 4× Scroll

A small Trilium frontend startup script that makes vertical mouse-wheel scrolling four times faster while **Alt** is held.

## Install

1. Create a JavaScript frontend code note in Trilium.
2. Paste [`alt-wheel-4x.js`](./alt-wheel-4x.js) into the note.
3. Add the label `#run=frontendStartup` to run it automatically when the Trilium frontend starts.

You can execute the note manually for the current window before restarting Trilium. Running it again replaces the previous listener, so the multiplier does not stack.

## Behavior

- Alt + vertical wheel: scrolls by four times the wheel event's distance.
- No Alt: normal scrolling is unchanged.
- Ctrl/Meta zooming and Shift + wheel horizontal scrolling are preserved.
- Canvas and map gestures are left alone.
- Nested scrollable panels are handled at the panel under the pointer.

Remove the `run` label and reload Trilium to disable automatic startup. A listener already active in the current window is removed after reloading or restarting.

This script was prepared with assistance from OpenAI Codex; the repository owner reviewed the implementation and publication.

## License

MIT. See [LICENSE](./LICENSE).

## Reference

- [Trilium scripting guide](https://docs.triliumnotes.org/user-guide/scripts)
