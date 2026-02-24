export type NodeType = 'milestone' | 'store';

export type PathNode = {
  id: string;
  distance: number; // units from origin — each node is at a multiple of shipSpeed (10)
  type: NodeType;
  label: string;
};

export type PathDefinition = {
  id: string;
  label: string;
  description: string;
  nodes: PathNode[];
  totalDistance: number; // always nodes.length * 10
};

// Each route's totalDistance = nodes.length × 10, so one node is reached per focus session.
// nodes.length also determines the long-break cycle (pomodorosBeforeLong).

export const PATHS: PathDefinition[] = [
  {
    id: 'gamma',
    label: 'Gamma Route',
    description: 'Short sprint. High intensity, quick reward.',
    totalDistance: 30,
    nodes: [
      { id: 'gamma-1', distance: 10, type: 'milestone', label: 'Checkpoint Gamma' },
      { id: 'gamma-2', distance: 20, type: 'store',     label: 'Fuel Cache' },
      { id: 'gamma-3', distance: 30, type: 'milestone', label: 'Gamma Station' },
    ],
  },
  {
    id: 'alpha',
    label: 'Alpha Route',
    description: 'Direct corridor. Focused, efficient.',
    totalDistance: 40,
    nodes: [
      { id: 'alpha-1', distance: 10, type: 'milestone', label: 'Waypoint Alpha' },
      { id: 'alpha-2', distance: 20, type: 'store',     label: 'Supply Depot' },
      { id: 'alpha-3', distance: 30, type: 'milestone', label: 'Deep Marker' },
      { id: 'alpha-4', distance: 40, type: 'milestone', label: 'Alpha Station' },
    ],
  },
  {
    id: 'beta',
    label: 'Beta Route',
    description: 'Standard passage. Balanced pace.',
    totalDistance: 50,
    nodes: [
      { id: 'beta-1', distance: 10, type: 'milestone', label: 'Beta Relay' },
      { id: 'beta-2', distance: 20, type: 'store',     label: 'Outpost Kilo' },
      { id: 'beta-3', distance: 30, type: 'milestone', label: 'Nebula Edge' },
      { id: 'beta-4', distance: 40, type: 'store',     label: 'Drift Station' },
      { id: 'beta-5', distance: 50, type: 'milestone', label: 'Beta Terminal' },
    ],
  },
  {
    id: 'delta',
    label: 'Delta Route',
    description: 'Extended run. More ground to cover.',
    totalDistance: 60,
    nodes: [
      { id: 'delta-1', distance: 10, type: 'milestone', label: 'Delta Approach' },
      { id: 'delta-2', distance: 20, type: 'store',     label: 'Trading Post' },
      { id: 'delta-3', distance: 30, type: 'milestone', label: 'Asteroid Field' },
      { id: 'delta-4', distance: 40, type: 'milestone', label: 'Void Crossing' },
      { id: 'delta-5', distance: 50, type: 'store',     label: 'Research Outpost' },
      { id: 'delta-6', distance: 60, type: 'milestone', label: 'Delta Prime' },
    ],
  },
  {
    id: 'omega',
    label: 'Omega Route',
    description: 'Long haul. For the most ambitious sessions.',
    totalDistance: 80,
    nodes: [
      { id: 'omega-1', distance: 10, type: 'milestone', label: 'Omega Threshold' },
      { id: 'omega-2', distance: 20, type: 'store',     label: 'Transit Hub' },
      { id: 'omega-3', distance: 30, type: 'milestone', label: 'Pulsar Ring' },
      { id: 'omega-4', distance: 40, type: 'store',     label: 'Dark Matter Reef' },
      { id: 'omega-5', distance: 50, type: 'milestone', label: 'Gravity Well' },
      { id: 'omega-6', distance: 60, type: 'store',     label: 'Ion Depot' },
      { id: 'omega-7', distance: 70, type: 'milestone', label: 'Outer Marker' },
      { id: 'omega-8', distance: 80, type: 'milestone', label: 'Omega Prime' },
    ],
  },
];

export function getPath(id: string): PathDefinition | undefined {
  return PATHS.find((p) => p.id === id);
}
