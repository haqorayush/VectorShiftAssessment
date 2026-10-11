// outputNode.js

import React from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const OutputNode = React.memo(({ id, data }) => {
  const [currName, handleNameChange] = useNodeField(id, 'outputName', data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, handleTypeChange] = useNodeField(id, 'outputType', data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      category="output"
      inputs={['value']}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>Name:</span>
        <input
          type="text"
          className="nodrag"
          value={currName}
          onChange={handleNameChange}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>Type:</span>
        <select 
          value={outputType} 
          onChange={handleTypeChange}
          className="nodrag"
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
});

