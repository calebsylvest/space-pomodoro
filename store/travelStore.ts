import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';
import { getPath } from '@/data/paths';
import { useTimerStore } from '@/store/timerStore';

interface TravelState {
  currentPathId: string | null;
  distanceTraveled: number;
  shipSpeed: number; // units per completed focus session
  visitedNodeIds: string[];

  choosePath: (pathId: string) => void;
  advanceDistance: () => void;
  reset: () => void;
}

export const useTravelStore = create<TravelState>()(
  persist(
    (set, get) => ({
      currentPathId: null,
      distanceTraveled: 0,
      shipSpeed: 10,
      visitedNodeIds: [],

      choosePath: (pathId) => {
        useTimerStore.getState().setPomodorosCompleted(0);
        set({ currentPathId: pathId, distanceTraveled: 0, visitedNodeIds: [] });
      },

      advanceDistance: () => {
        const { currentPathId, distanceTraveled, shipSpeed, visitedNodeIds } = get();
        if (!currentPathId) return;

        const path = getPath(currentPathId);
        if (!path) return;

        const newDistance = Math.min(distanceTraveled + shipSpeed, path.totalDistance);
        const newlyVisited = path.nodes
          .filter((n) => n.distance <= newDistance && !visitedNodeIds.includes(n.id))
          .map((n) => n.id);

        set({
          distanceTraveled: newDistance,
          visitedNodeIds: [...visitedNodeIds, ...newlyVisited],
        });
      },

      reset: () => {
        useTimerStore.getState().setPomodorosCompleted(0);
        set({ currentPathId: null, distanceTraveled: 0, visitedNodeIds: [] });
      },
    }),
    {
      name: 'travel',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
