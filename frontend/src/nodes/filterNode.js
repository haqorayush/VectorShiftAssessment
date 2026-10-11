// filterNode.js
import React from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const FilterNode = React.memo(({ id, data }) => {
  const [filterType, handleTypeChange] = useNodeField(id, 'filterType', data?.filterType || 'Keyword');
  const [pattern, handlePatternChange] = useNodeField(id, 'pattern', data?.pattern || '');

  const isMinLength = filterType === 'MinLength';

  return (
    <BaseNode
      id={id}
      title="Data Filter"
      category="filter"
      inputs={[
        { id: 'stream', label: 'stream' },
        { id: 'rules', label: 'rules' }
      ]}
      outputs={[
        { id: 'passed', label: 'passed' },
        { id: 'rejected', label: 'rejected' }
      ]}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>Filter By:</span>
        <select
          value={filterType}
          onChange={handleTypeChange}
          className="nodrag"
        >
          <option value="Keyword">Keyword Match</option>
          <option value="Regex">Regex Expression</option>
          <option value="MinLength">Min Text Length</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>{isMinLength ? 'Minimum Length:' : 'Pattern / Keyword:'}</span>
        <input
          type={isMinLength ? 'number' : 'text'}
          placeholder={isMinLength ? 'e.g., 10' : filterType === 'Regex' ? 'e.g., ^Error:.*' : 'e.g., urgent'}
          value={pattern}
          onChange={handlePatternChange}
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
});
