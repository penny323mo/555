// 地圖底圖與初始視角設定。
// MVP 使用 OSM raster 免費底圖（免 API key），style 以 inline JSON 提供。
// Phase 2 會由 MapContainer 套用此設定。

export const MAP_INITIAL_VIEW = {
  // 初始置中於東亞，貼近示意截圖的視角。
  center: [114, 24] as [number, number],
  zoom: 4,
  minZoom: 2,
  maxZoom: 12,
};

// MapLibre style 物件：OSM raster tiles（無需金鑰）。
export const RASTER_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: 'raster' as const,
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster' as const,
      source: 'osm',
    },
  ],
};
