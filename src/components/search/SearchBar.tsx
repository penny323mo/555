import { useState } from 'react';
import { zhHant } from '@/config/i18n.zh-Hant';

// Phase 2：靜態搜尋列外觀。真實地理編碼與下拉建議於 Phase 4 接入。
export function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden>
        🔍
      </span>
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={zhHant.search.placeholder}
        aria-label={zhHant.search.placeholder}
      />
    </div>
  );
}
