// BaseNode.js
// Core abstraction for all ReactFlow nodes in VectorShift Neo-Editorial Dark Mode Studio.
// -------------------------------------------------------------------------
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

/**
 * Custom hook to cleanly synchronize local node form field state with the Zustand store.
 */
export const useNodeField = (nodeId, fieldName, initialValue) => {
  const [value, setValue] = useState(initialValue);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleChange = (e) => {
    let newValue;
    if (e && e.target) {
      if (e.target.type === 'checkbox') {
        newValue = e.target.checked;
      } else if (e.target.value !== undefined) {
        newValue = e.target.value;
      } else {
        newValue = e;
      }
    } else {
      newValue = e;
    }
    setValue(newValue);
    updateNodeField(nodeId, fieldName, newValue);
  };

  return [value, handleChange, setValue];
};

// Executive Neo-Editorial Dark Mode Category Tokens
const categoryStyles = {
  input: { color: '#C5A562' },     // Gold Accent
  llm: { color: '#A390E4' },       // Refined Violet/Lavender
  output: { color: '#E4B462' },    // Amber Gold
  text: { color: '#62B8E4' },      // Azure Sky
  note: { color: '#8B867D' },      // Dim Taupe
  condition: { color: '#E48462' }, // Warm Coral
  database: { color: '#62E4C5' },  // Mint Cyan
  api: { color: '#E4628E' },       // Rose
  filter: { color: '#8092E4' },    // Indigo
  default: { color: '#8B867D' },
};

/**
 * BaseNode Component
 * Automatically places connection handles and labels below the node title/labels, aligned beside their connection ports.
 */
export const BaseNode = React.memo(({
  id,
  title,
  category = 'default',
  inputs = [],
  outputs = [],
  style = {},
  headerRight = null,
  children,
}) => {
  const catKey = category.toLowerCase();
  const theme = categoryStyles[catKey] || categoryStyles.default;

  const normalizeHandles = (handleArray, defaultPosition) => {
    const total = handleArray.length;
    const hasLabels = handleArray.some((h) => typeof h === 'object' && h !== null && h.label);

    return handleArray.map((handle, index) => {
      const isObj = typeof handle === 'object' && handle !== null;
      const handleId = isObj ? handle.id : handle;
      const handleLabel = isObj ? (handle.label !== undefined && handle.label !== null ? handle.label : handle.id) : handle;
      const customStyle = isObj && handle.style ? handle.style : {};
      const position = isObj && handle.position ? handle.position : defaultPosition;

      // When handles have labels or multiple parameters, position them strictly below the header and field labels (starting at 82px)
      // For single unlabeled connection wires, center vertically at 50%
      const calculatedTop =
        customStyle.top !== undefined
          ? customStyle.top
          : hasLabels || total > 1
          ? `${82 + index * 40}px`
          : '50%';

      return {
        key: `${id}-${handleId}`,
        handleId: handleId,
        name: handleId,
        label: handleLabel,
        position,
        style: {
          backgroundColor: '#C5A562',
          width: '10px',
          height: '10px',
          borderRadius: '2px',
          border: '1px solid #06080B',
          zIndex: 20,
          ...customStyle,
          top: calculatedTop,
        },
      };
    });
  };

  const normalizedInputs = normalizeHandles(inputs, Position.Left);
  const normalizedOutputs = normalizeHandles(outputs, Position.Right);

  // Determine how many rows we need to render handles side-by-side
  const maxHandlesCount = Math.max(normalizedInputs.length, normalizedOutputs.length);
  const handleRows = [];
  
  for (let i = 0; i < maxHandlesCount; i++) {
    const input = normalizedInputs[i];
    const output = normalizedOutputs[i];
    
    handleRows.push(
      <div 
        key={`handle-row-${i}`} 
        style={{ 
          position: 'relative', 
          width: '100%', 
          minHeight: '26px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: i < maxHandlesCount - 1 ? '10px' : '0px'
        }}
      >
        {/* Left Input Area */}
        <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
          {input && (
            <>
              <Handle
                type="target"
                position={input.position}
                id={input.handleId}
                style={{ ...input.style, left: '-5px', top: '50%', transform: 'translateY(-50%)' }}
              />
              {input.label && (
                <span
                  style={{
                    marginLeft: '14px',
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    backgroundColor: 'var(--bg-alt)',
                    padding: '3px 8px',
                    borderRadius: '2px',
                    border: '1px solid var(--rule-dk)',
                    boxShadow: '1px 1px 0px var(--gold)',
                    whiteSpace: 'nowrap',
                    zIndex: 15,
                  }}
                >
                  {input.label}
                </span>
              )}
            </>
          )}
        </div>
        
        {/* Right Output Area */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '50%' }}>
          {output && (
            <>
              {output.label && (
                <span
                  style={{
                    marginRight: '14px',
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    backgroundColor: 'var(--bg-alt)',
                    padding: '3px 8px',
                    borderRadius: '2px',
                    border: '1px solid var(--rule-dk)',
                    boxShadow: '1px 1px 0px var(--gold)',
                    whiteSpace: 'nowrap',
                    zIndex: 15,
                  }}
                >
                  {output.label}
                </span>
              )}
              <Handle
                type="source"
                position={output.position}
                id={output.handleId}
                style={{ ...output.style, right: '-5px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`base-node base-node-${category}`}
      style={{
        minWidth: '240px',
        height: 'auto',
        border: '1px solid var(--rule-dk)',
        borderRadius: '2px',
        backgroundColor: 'var(--bg)',
        color: 'var(--ink)',
        boxShadow: '3px 3px 0px var(--bg-alt)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
        ...style,
      }}
    >
      {/* Editorial Node Header */}
      <div
        className="base-node-header"
        style={{
          padding: '10px 14px',
          borderBottom: '1px solid var(--rule)',
          backgroundColor: 'var(--paper)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--sans)',
          fontWeight: '600',
          fontSize: '13.5px',
          color: 'var(--ink)',
          letterSpacing: '-0.01em',
          flexShrink: 0,
        }}
      >
        <span>{title}</span>
        {headerRight || (
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '9.5px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: theme.color,
              backgroundColor: 'var(--bg-alt)',
              padding: '2px 6px',
              borderRadius: '2px',
              border: '1px solid var(--rule)',
            }}
          >
            {category}
          </span>
        )}
      </div>

      {/* Handles and Labels (Stacked at the top, below header) */}
      {handleRows.length > 0 && (
        <div style={{ paddingTop: '14px', paddingBottom: children ? '0px' : '14px', display: 'flex', flexDirection: 'column' }}>
          {handleRows}
        </div>
      )}

      {/* Node Body Content */}
      {children && (
        <div
          className="base-node-body nodrag"
          style={{
            padding: '14px 14px 16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flexGrow: 1,
            fontSize: '12.5px',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--sans)',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
});
