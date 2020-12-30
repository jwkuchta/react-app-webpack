import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

export function useGraphics(view, jsonGraphics) {
  useEffect(() => {
    if (!view || !jsonGraphics) {
      return;
    }

    let graphics;
    loadModules(['esri/Graphic']).then(([Graphic]) => {
      graphics = jsonGraphics.map(jsonGraphic => new Graphic(jsonGraphic));
      view.graphics.addMany(graphics);
    });
    return function removeGraphics() {
      view && view.graphics.removeMany(graphics);
    };
  }, [view, jsonGraphics]);
}

export function useGraphic(view, jsonGraphic) {
  return useGraphics(view, [jsonGraphic]);
}