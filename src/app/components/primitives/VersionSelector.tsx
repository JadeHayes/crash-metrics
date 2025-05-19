import React from 'react';
import '@/app/styles/selector.css';

interface VersionSelectorProps {
  allVersions: string[];
  selectedVersions: string[];
  onSelectionChange: (selectedVersions: string[]) => void;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({
  allVersions,
  selectedVersions,
  onSelectionChange,
}) => {
  const handleVersionToggle = (version: string) => {
    const newSelection = selectedVersions.includes(version)
      ? selectedVersions.filter((v) => v !== version)
      : [...selectedVersions, version];

    // Ensure at least one version is always selected
    if (newSelection.length === 0) {
      // If unchecking the last item, re-select it or select the first available if nothing was selected.
      onSelectionChange(selectedVersions.length === 1 && selectedVersions[0] === version ? [version] : [allVersions[0]]);
    } else {
      onSelectionChange(newSelection);
    }
  };

  const handleSelectAllToggle = () => {
    if (selectedVersions.length === allVersions.length) {
      onSelectionChange([allVersions[0]]);
    } else {
      onSelectionChange(allVersions);
    }
  };

  const isAllSelected = selectedVersions.length === allVersions.length;

  return (
    <div className="version-selector-container">
      <h4 className="version-selector-title">Filter by App Version:</h4>
      <div>
        <label htmlFor="select-all-versions" className="version-selector-select-all-label">
          <input
            type="checkbox"
            id="select-all-versions"
            checked={isAllSelected}
            onChange={handleSelectAllToggle}
            className="version-selector-checkbox-input"
          />
          Select All
        </label>
      </div>
      <div className="version-selector-versions-list">
        {allVersions.map((version) => (
          <label htmlFor={`version-${version}`} key={version} className="version-selector-version-label">
            <input
              type="checkbox"
              id={`version-${version}`}
              value={version}
              checked={selectedVersions.includes(version)}
              onChange={() => handleVersionToggle(version)}
              className="version-selector-checkbox-input"
            />
            {version}
          </label>
        ))}
      </div>
    </div>
  );
};

export default VersionSelector; 