// textNode.js
// Enhanced Text Node featuring real-time auto-resizing and dynamic variable handle layout without overlaps.
// ---------------------------------------------------------------------------------------------------------

import React, { useMemo } from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const TextNode = React.memo(({ id, data }) => {
  const [currText, handleTextChange] = useNodeField(id, 'text', data?.text || '{{input}}');

  // Parse valid JavaScript variables enclosed in {{ varName }}
  const variableHandles = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const uniqueVars = new Set();
    let match;
    const textToScan = typeof currText === 'string' ? currText : String(currText || '');

    while ((match = regex.exec(textToScan)) !== null) {
      if (match[1]) {
        uniqueVars.add(match[1]);
      }
    }

    // Map deduplicated variable names into labeled handle objects for BaseNode positioning
    return Array.from(uniqueVars).map((varName) => ({
      id: varName,
      label: varName,
    }));
  }, [currText]);

  // Calculate dynamic dimensions accounting for both text contents AND handle label column widths
  const dimensions = useMemo(() => {
    const text = typeof currText === 'string' ? currText : String(currText || '');
    const lines = text.split('\n');
    const maxLineLen = Math.max(...lines.map((l) => l.length), 0);
    const maxVarLen = Math.max(...variableHandles.map((v) => v.label.length), 0);

    // Baseline content width constraint
    const baseWidth = 250;
    const textContentWidth = maxLineLen > 20 ? Math.min(520, baseWidth + (maxLineLen - 20) * 7.8) : baseWidth;
    const totalWidth = textContentWidth;

    // Calculate required rows and minimum height to prevent vertical collisions between multiple handles
    const approxRows = lines.reduce((acc, line) => {
      const wraps = Math.ceil(line.length / Math.max(22, Math.floor(textContentWidth / 8.5)));
      return acc + Math.max(1, wraps);
    }, 0);

    const handlesRequiredHeight = variableHandles.length > 0 ? 82 + (variableHandles.length - 1) * 40 + 48 : 100;

    return {
      width: Math.round(totalWidth),
      minHeight: Math.max(100, Math.round(handlesRequiredHeight)),
      rows: Math.max(3, approxRows),
    };
  }, [currText, variableHandles]);

  return (
    <BaseNode
      id={id}
      title="Text"
      category="text"
      inputs={variableHandles}
      outputs={['output']}
      style={{
        width: `${dimensions.width}px`,
        minHeight: `${dimensions.minHeight}px`,
        height: 'auto',
        transition: 'width 0.12s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', flexGrow: 1 }}>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--ink-soft)',
            display: 'block',
          }}
        >
          Prompt Template:
        </span>

        <textarea
          className="nodrag nowheel"
          rows={dimensions.rows}
          value={currText}
          onChange={handleTextChange}
          placeholder="Type or enter variables like {{ input }}..."
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'auto',
            lineHeight: '1.55',
            fontFamily: 'var(--mono)',
            fontSize: '12.5px',
            padding: '8px 10px',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </BaseNode>
  );
});
