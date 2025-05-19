import { ChartPoint } from '../types/VersionedMertrics'; // Corrected path
import { groupChartDataByVersion } from './chartUtils'; // Corrected path

describe('groupChartDataByVersion', () => {
  it('should correctly group chart data by version', () => {
    const mockData: ChartPoint[] = [
      { timestamp: 1, crashCount: 10, version: '1.0.0' },
      { timestamp: 2, crashCount: 5, version: '1.0.1' },
      { timestamp: 3, crashCount: 12, version: '1.0.0' },
      { timestamp: 4, crashCount: 8, version: '1.0.1' },
      { timestamp: 5, crashCount: 3, version: '1.0.2' },
    ];

    const expected = {
      '1.0.0': [
        { timestamp: 1, crashCount: 10, version: '1.0.0' },
        { timestamp: 3, crashCount: 12, version: '1.0.0' },
      ],
      '1.0.1': [
        { timestamp: 2, crashCount: 5, version: '1.0.1' },
        { timestamp: 4, crashCount: 8, version: '1.0.1' },
      ],
      '1.0.2': [{ timestamp: 5, crashCount: 3, version: '1.0.2' }],
    };

    expect(groupChartDataByVersion(mockData)).toEqual(expected);
  });

  it('should return an empty object for empty input data', () => {
    const mockData: ChartPoint[] = [];
    const expectedOutput = {};
    expect(groupChartDataByVersion(mockData)).toEqual(expectedOutput);
  });

  it('should handle data with a single version correctly', () => {
    const mockData: ChartPoint[] = [
      { timestamp: 1, crashCount: 10, version: '1.0.0' },
      { timestamp: 3, crashCount: 12, version: '1.0.0' },
    ];
    const expectedOutput = {
      '1.0.0': [
        { timestamp: 1, crashCount: 10, version: '1.0.0' },
        { timestamp: 3, crashCount: 12, version: '1.0.0' },
      ],
    };
    expect(groupChartDataByVersion(mockData)).toEqual(expectedOutput);
  });
}); 