import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { WindCanvasLayer } from '@/components/map/WindCanvasLayer';
import { SearchBar } from '@/components/search/SearchBar';
import { LayerSwitcher } from '@/components/layers/LayerSwitcher';
import { Legend } from '@/components/ui/Legend';
import { WeatherPanel } from '@/components/weather/WeatherPanel';
import { useAppStore } from '@/store/appStore';

// Phase 3：地圖 + 響應式 UI 殼 + mock 風場粒子動畫（風圖層）。
// 真實天氣資料（Phase 4）、其餘圖層渲染（Phase 5）後續接入。
export default function App() {
  const activeLayer = useAppStore((s) => s.activeLayer);

  return (
    <MapProvider>
      <div className="app-shell">
        <MapContainer />
        {activeLayer === 'wind' && <WindCanvasLayer />}
        <SearchBar />
        <LayerSwitcher />
        <Legend />
        <WeatherPanel />
      </div>
    </MapProvider>
  );
}
