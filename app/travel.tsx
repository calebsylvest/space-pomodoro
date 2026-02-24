import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Link } from 'expo-router';
import { useTravelStore } from '@/store/travelStore';
import { PATHS, getPath, PathDefinition } from '@/data/paths';
import { Colors, ColorTokens } from '@/constants/colors';
import { MONO } from '@/constants/typography';
import { Starfield } from '@/components/Starfield';

const TRACK_HEIGHT = 420;

export default function TravelScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'dark'];
  const { currentPathId, distanceTraveled, shipSpeed, visitedNodeIds, choosePath, reset } =
    useTravelStore();

  const activePath = currentPathId ? getPath(currentPathId) : null;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Starfield />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.appTitle, { color: colors.textSecondary, fontFamily: MONO }]}>
          POMODORO SPACE
        </Text>

        {/* View switcher */}
        <View style={styles.navGroup}>
          <Link href="/" asChild>
            <Pressable style={styles.navButton}>
              <Text style={[styles.navInactive, { color: colors.textSecondary, fontFamily: MONO }]}>
                SHIP
              </Text>
            </Pressable>
          </Link>
          <Text style={[styles.navDot, { color: colors.border, fontFamily: MONO }]}>·</Text>
          <Text style={[styles.navActive, { color: colors.accent, fontFamily: MONO }]}>
            [ TRAVEL ]
          </Text>
        </View>

        <Link href="/settings" asChild>
          <Pressable hitSlop={12}>
            <Text style={[styles.settingsIcon, { color: colors.textSecondary }]}>⚙</Text>
          </Pressable>
        </Link>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {!activePath ? (
          <PathSelection colors={colors} choosePath={choosePath} />
        ) : (
          <TravelMap
            path={activePath}
            distanceTraveled={distanceTraveled}
            shipSpeed={shipSpeed}
            visitedNodeIds={visitedNodeIds}
            colors={colors}
            onReset={reset}
          />
        )}
      </ScrollView>
    </View>
  );
}

// ─── Path Selection ────────────────────────────────────────────────────────

function PathSelection({
  colors,
  choosePath,
}: {
  colors: ColorTokens;
  choosePath: (id: string) => void;
}) {
  return (
    <View style={styles.selectionContainer}>
      <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontFamily: MONO }]}>
        SELECT ROUTE
      </Text>

      <View style={styles.pathCards}>
        {PATHS.map((path) => (
          <View
            key={path.id}
            style={[styles.pathCard, { borderColor: colors.border, backgroundColor: colors.surface }]}
          >
            <View style={styles.pathCardCornerTL} />
            <View style={styles.pathCardCornerTR} />

            <Text style={[styles.pathLabel, { color: colors.text, fontFamily: MONO }]}>
              {path.label.toUpperCase()}
            </Text>
            <Text style={[styles.pathDescription, { color: colors.textSecondary, fontFamily: MONO }]}>
              {path.description}
            </Text>

            <View style={[styles.pathDivider, { backgroundColor: colors.border }]} />

            <View style={styles.pathMeta}>
              <Text style={[styles.pathMetaItem, { color: colors.textSecondary, fontFamily: MONO }]}>
                {path.nodes.length} nodes
              </Text>
              <Text style={[styles.pathMetaDot, { color: colors.border }]}>·</Text>
              <Text style={[styles.pathMetaItem, { color: colors.textSecondary, fontFamily: MONO }]}>
                {path.totalDistance} units
              </Text>
            </View>

            <Pressable
              style={[styles.engageButton, { borderColor: colors.accent }]}
              onPress={() => choosePath(path.id)}
            >
              <Text style={[styles.engageButtonText, { color: colors.accent, fontFamily: MONO }]}>
                [ ENGAGE ]
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Travel Map ────────────────────────────────────────────────────────────

function TravelMap({
  path,
  distanceTraveled,
  shipSpeed,
  visitedNodeIds,
  colors,
  onReset,
}: {
  path: PathDefinition;
  distanceTraveled: number;
  shipSpeed: number;
  visitedNodeIds: string[];
  colors: ColorTokens;
  onReset: () => void;
}) {
  const progress = distanceTraveled / path.totalDistance;
  const shipTop = (1 - progress) * TRACK_HEIGHT;
  const isComplete = distanceTraveled >= path.totalDistance;

  return (
    <View style={styles.mapContainer}>
      {/* Completion banner */}
      {isComplete && (
        <View style={[styles.completionBanner, { borderColor: colors.accent }]}>
          <Text style={[styles.completionTitle, { color: colors.accent, fontFamily: MONO }]}>
            // ARRIVAL
          </Text>
          <Text style={[styles.completionSub, { color: colors.textSecondary, fontFamily: MONO }]}>
            {path.label.toUpperCase()} — COMPLETE
          </Text>
        </View>
      )}

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statBlock}>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: MONO }]}>
            DISTANCE
          </Text>
          <Text style={[styles.statValue, { color: colors.accent, fontFamily: MONO }]}>
            {distanceTraveled} / {path.totalDistance}
          </Text>
          <Text style={[styles.statUnit, { color: colors.textSecondary, fontFamily: MONO }]}>
            units
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statBlock}>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: MONO }]}>
            SPEED
          </Text>
          <Text style={[styles.statValue, { color: colors.text, fontFamily: MONO }]}>
            {shipSpeed}
          </Text>
          <Text style={[styles.statUnit, { color: colors.textSecondary, fontFamily: MONO }]}>
            units/session
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statBlock}>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: MONO }]}>
            ROUTE
          </Text>
          <Text style={[styles.statValue, { color: colors.text, fontFamily: MONO }]}>
            {path.label.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Track */}
      <View style={[styles.trackWrapper, { height: TRACK_HEIGHT + 40 }]}>
        {/* Destination label */}
        <Text style={[styles.trackEndLabel, styles.trackEndTop, { color: colors.textSecondary, fontFamily: MONO }]}>
          ▲ DESTINATION
        </Text>

        {/* Track line */}
        <View style={[styles.trackLine, { backgroundColor: colors.border }]} />

        {/* Progress fill */}
        <View
          style={[
            styles.trackFill,
            {
              backgroundColor: colors.accent,
              height: progress * TRACK_HEIGHT,
              bottom: 20,
            },
          ]}
        />

        {/* Ship — positioned on left side of track to avoid overlapping right-side nodes */}
        <View style={[styles.shipMarker, { top: shipTop + 20 - 8 }]}>
          <Text style={[styles.shipGlyph, { color: colors.accent, fontFamily: MONO }]}>▲</Text>
        </View>

        {/* Nodes */}
        {path.nodes.map((node) => {
          const nodeProgress = node.distance / path.totalDistance;
          const nodeTop = (1 - nodeProgress) * TRACK_HEIGHT + 20;
          const isVisited = visitedNodeIds.includes(node.id);
          const isStore = node.type === 'store';
          const nodeColor = isVisited
            ? colors.textSecondary
            : isStore
            ? colors.shortBreak
            : colors.text;

          return (
            <View key={node.id} style={[styles.nodeRow, { top: nodeTop - 10 }]}>
              <Text style={[styles.nodeDiamond, { color: nodeColor, fontFamily: MONO }]}>
                {isVisited ? '◆' : '◇'}
              </Text>
              <View style={styles.nodeInfo}>
                <Text
                  style={[
                    styles.nodeLabel,
                    { color: nodeColor, fontFamily: MONO, opacity: isVisited ? 0.4 : 1 },
                  ]}
                >
                  {node.label.toUpperCase()}
                </Text>
                <Text style={[styles.nodeDistance, { color: colors.textSecondary, fontFamily: MONO }]}>
                  {node.distance} u {isStore ? '· STORE' : ''}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Origin label */}
        <Text style={[styles.trackEndLabel, styles.trackEndBottom, { color: colors.textSecondary, fontFamily: MONO }]}>
          ORIGIN ·
        </Text>
      </View>

      {/* Reset / complete action */}
      <Pressable
        style={[styles.resetButton, { borderColor: isComplete ? colors.accent : colors.border }]}
        onPress={onReset}
      >
        <Text style={[styles.resetButtonText, { color: isComplete ? colors.accent : colors.textSecondary, fontFamily: MONO }]}>
          {isComplete ? '[ NEW ROUTE ]' : '[ ABANDON ROUTE ]'}
        </Text>
      </Pressable>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  appTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
  navGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navActive: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  navInactive: {
    fontSize: 11,
    letterSpacing: 2,
  },
  navDot: {
    fontSize: 11,
  },
  navButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  settingsIcon: {
    fontSize: 22,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 60,
    alignItems: 'center',
  },

  // Path selection
  selectionContainer: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    gap: 24,
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 4,
  },
  pathCards: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pathCard: {
    flex: 1,
    minWidth: 200,
    maxWidth: 280,
    borderWidth: 1,
    borderRadius: 4,
    padding: 20,
    gap: 12,
    position: 'relative',
  },
  pathCardCornerTL: {
    position: 'absolute',
    top: -1,
    left: -1,
    width: 12,
    height: 12,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pathCardCornerTR: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 12,
    height: 12,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pathLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
  pathDescription: {
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 18,
    opacity: 0.7,
  },
  pathDivider: {
    height: 1,
  },
  pathMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pathMetaItem: {
    fontSize: 11,
    letterSpacing: 1,
  },
  pathMetaDot: {
    fontSize: 11,
  },
  engageButton: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  engageButtonText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },

  // Travel map
  mapContainer: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    gap: 28,
    paddingTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
  },
  statBlock: {
    alignItems: 'center',
    gap: 2,
  },
  statLabel: {
    fontSize: 9,
    letterSpacing: 2,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  statUnit: {
    fontSize: 9,
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 36,
  },

  // Track
  trackWrapper: {
    width: '100%',
    maxWidth: 320,
    position: 'relative',
    alignItems: 'center',
  },
  trackLine: {
    position: 'absolute',
    width: 1,
    top: 20,
    bottom: 20,
    left: '50%',
  },
  trackFill: {
    position: 'absolute',
    width: 1,
    left: '50%',
  },
  trackEndLabel: {
    position: 'absolute',
    fontSize: 9,
    letterSpacing: 2,
  },
  trackEndTop: {
    top: 4,
    right: 0,
    textAlign: 'right',
  },
  trackEndBottom: {
    bottom: 4,
    right: 0,
    textAlign: 'right',
  },
  shipMarker: {
    position: 'absolute',
    right: '53%',
    zIndex: 2,
  },
  shipGlyph: {
    fontSize: 16,
  },
  nodeRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '52%',
    gap: 10,
  },
  nodeDiamond: {
    fontSize: 14,
    width: 16,
  },
  nodeInfo: {
    gap: 1,
  },
  nodeLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  nodeDistance: {
    fontSize: 9,
    letterSpacing: 1,
    opacity: 0.6,
  },

  // Completion
  completionBanner: {
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    gap: 6,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 4,
  },
  completionSub: {
    fontSize: 10,
    letterSpacing: 3,
  },

  // Reset
  resetButton: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 11,
    letterSpacing: 2,
  },
});
