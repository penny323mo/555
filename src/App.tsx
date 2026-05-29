import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { SearchBar } from '@/components/search/SearchBar';
import { LayerSwitcher } from '@/components/layers/LayerSwitcher';
import { Legend } from '@/components/ui/Legend';
import { WeatherPanel } from '@/components/weather/WeatherPanel';

// Phase 2：全屏地圖 + 響應式 UI 殼。
// 風場動畫（Phase 3）、真實天氣資料（Phase 4）、圖層渲染（Phase 5）後續接入。
export default function App() {
  return (
    <MapProvider>
      <div className="app-shell">
        <MapContainer />
        <SearchBar />
        <LayerSwitcher />
        <Legend />
        <WeatherPanel />
      </div>
    </MapProvider>
  );
}
