import { useState } from 'react';
import type { GeoResult } from '@/types';
import { zhHant } from '@/config/i18n.zh-Hant';
import { useGeocoding } from '@/hooks/useGeocoding';
import { useMap } from '@/hooks/useMap';
import { useAppStore } from '@/store/appStore';

// 城市搜尋列：即時下拉建議，選取後飛至該地並開啟天氣面板。
export function SearchBar() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const { results, loading } = useGeocoding(value);
  const map = useMap();
  const selectLocation = useAppStore((s) => s.selectLocation);

  const select = (r: GeoResult) => {
    map?.flyTo({ center: [r.location.lng, r.location.lat], zoom: 7 });
    selectLocation(r.location, r.name);
    setValue(r.name);
    setOpen(false);
  };

  const showDropdown = open && value.trim().length > 0;

  return (
    <div className="search-bar">
      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden>
          🔍
        </span>
        <input
          className="search-bar__input"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={zhHant.search.placeholder}
          aria-label={zhHant.search.placeholder}
        />
      </div>

      {showDropdown && (
        <ul className="search-bar__results">
          {loading && <li className="search-bar__hint">{zhHant.search.loading}</li>}
          {!loading && results.length === 0 && (
            <li className="search-bar__hint">{zhHant.search.noResults}</li>
          )}
          {results.map((r, i) => (
            <li key={`${r.name}-${i}`}>
              <button className="search-bar__result" onClick={() => select(r)}>
                <span className="search-bar__result-name">{r.name}</span>
                <span className="search-bar__result-meta">
                  {[r.admin1, r.country].filter(Boolean).join('・')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
