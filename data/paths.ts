export type NodeType = 'milestone' | 'store';

export type PathNode = {
  id: string;
  distance: number; // units from origin
  type: NodeType;
  label: string;
};

export type PathDefinition = {
  id: string;
  label: string;
  description: string;
  nodes: PathNode[];
  totalDistance: number;
};

export const PATHS: PathDefinition[] = [
  {
    id: 'alpha',
    label: 'Alpha Route',
    description: 'Direct corridor. Focused, efficient.',
    totalDistance: 50,
    nodes: [
      { id: 'alpha-1', distance: 10, type: 'milestone', label: 'Waypoint Alpha' },
      { id: 'alpha-2', distance: 22, type: 'store', label: 'Supply Depot' },
      { id: 'alpha-3', distance: 36, type: 'milestone', label: 'Deep Marker' },
      { id: 'alpha-4', distance: 50, type: 'milestone', label: 'Alpha Station' },
    ],
  },
  {
    id: 'beta',
    label: 'Beta Route',
    description: 'Longer passage. More stops, greater reward.',
    totalDistance: 70,
    nodes: [
      { id: 'beta-1', distance: 12, type: 'milestone', label: 'Beta Relay' },
      { id: 'beta-2', distance: 25, type: 'store', label: 'Outpost Kilo' },
      { id: 'beta-3', distance: 38, type: 'milestone', label: 'Nebula Edge' },
      { id: 'beta-4', distance: 54, type: 'store', label: 'Drift Station' },
      { id: 'beta-5', distance: 70, type: 'milestone', label: 'Beta Terminal' },
    ],
  },
];

export function getPath(id: string): PathDefinition | undefined {
  return PATHS.find((p) => p.id === id);
}
