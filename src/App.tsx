import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { WindCanvasLayer } from '@/components/map/WindCanvasLayer';
import { ScalarFieldLayer } from '@/components/layers/ScalarFieldLayer';
import { SearchBar } from '@/components/search/SearchBar';
import { LayerSwitcher } from '@/components/layers/LayerSwitcher';
import { Legend } from '@/components/ui/Legend';
import { WeatherPanel } from '@/components/weather/WeatherPanel';
import { useAppStore } from '@/store/appStore';

// 全屏地圖 + 響應式 UI + 風場粒子動畫（風圖層）/ heatmap（其餘四圖層）。
export default function App() {
  const activeLayer = useAppStore((s) => s.activeLayer);

  return (
    <MapProvider>
      <div className="app-shell">
        <MapContainer />
        {activeLayer === 'wind' ? (
          <WindCanvasLayer />
        ) : (
          <ScalarFieldLayer layer={activeLayer} />
        )}
        <SearchBar />
        <LayerSwitcher />
        <Legend />
        <WeatherPanel />
      </div>
    </MapProvider>
  );
}
