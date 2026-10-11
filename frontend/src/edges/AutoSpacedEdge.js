// AutoSpacedEdge.js
// Custom intelligent edge routing for ReactFlow to eliminate path overlaps via systematic lane separation.
// ---------------------------------------------------------------------------------------------

import React, { useMemo } from 'react';
import { getSmoothStepPath, BaseEdge, useEdges } from 'reactflow';

export const AutoSpacedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const allEdges = useEdges();

  // Sort edge IDs deterministically to establish consistent routing lane indexes
  const sortedEdgeIds = useMemo(() => {
    return [...allEdges].map((e) => e.id).sort((a, b) => a.localeCompare(b));
  }, [allEdges]);

  const totalEdges = sortedEdgeIds.length || 1;
  const laneIndex = sortedEdgeIds.indexOf(id);

  // Center alignment offset: distributes routing lanes symmetrically around natural midpoints
  const laneCentered = laneIndex !== -1 ? laneIndex - (totalEdges - 1) / 2 : 0;

  // Calculate distinct geometric routing parameters per edge to prevent any overlapping segments
  // 1. offset: Stagger turnaround loop distances from ports (26px up to 116px)
  const dynamicOffset = 26 + ((laneIndex !== -1 ? laneIndex : 0) % 6) * 18;

  // 2. centerX: Displace vertical transit corridors by 28px per lane
  const defaultCenterX = (sourceX + targetX) / 2;
  const computedCenterX = defaultCenterX + laneCentered * 28;

  // 3. centerY: Displace horizontal transit corridors by 28px per lane
  const defaultCenterY = (sourceY + targetY) / 2;
  const computedCenterY = defaultCenterY + laneCentered * 28;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 14,
    offset: dynamicOffset,
    centerX: computedCenterX,
    centerY: computedCenterY,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: '#C5A562',
        strokeWidth: 2,
        transition: 'stroke-width 0.15s ease',
        ...style,
      }}
      markerEnd={markerEnd}
    />
  );
};
