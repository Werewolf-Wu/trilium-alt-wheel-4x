// Trilium: JavaScript (Trilium frontend)
// Enable at startup with: #run=frontendStartup
// Re-running replaces the previous listener; multiplier never stacks.
(() => {
    const KEY = '__triliumAltWheel4x';
    window[KEY]?.dispose();
    const controller = new AbortController();
    const FACTOR = 4;

    function onWheel(event) {
        // Preserve browser zoom and Shift-wheel horizontal scrolling.
        if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
            !event.cancelable || event.defaultPrevented || !event.deltaY ||
            Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

        const path = event.composedPath();
        // Canvas-based views own their wheel gestures.
        if (path.some(el => el instanceof Element &&
            el.matches('canvas, .excalidraw, .leaflet-container'))) return;

        for (const element of path) {
            if (!(element instanceof Element)) continue;
            const style = getComputedStyle(element);
            const root = element === document.scrollingElement;
            if (!root && !/^(auto|scroll|overlay)$/.test(style.overflowY)) continue;
            const max = element.scrollHeight - element.clientHeight;
            if (max <= 0) continue;
            const pos = element.scrollTop;
            const canMove = event.deltaY > 0 ? pos < max - 0.5 : pos > 0.5;
            if (canMove) {
                let unit = 1;
                if (event.deltaMode === 1) {
                    unit = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) || 16) * 1.2;
                } else if (event.deltaMode === 2) {
                    unit = element.clientHeight;
                }
                event.preventDefault();
                event.stopImmediatePropagation();
                element.scrollBy({ top: event.deltaY * unit * FACTOR, left: 0, behavior: 'instant' });
                return;
            }
            // Respect nested panels that intentionally prevent scroll chaining.
            if (/^(contain|none)$/.test(style.overscrollBehaviorY)) return;
        }
    }

    window.addEventListener('wheel', onWheel, {
        capture: true, passive: false, signal: controller.signal
    });
    window[KEY] = {
        dispose() { controller.abort(); delete window[KEY]; }
    };
})();
