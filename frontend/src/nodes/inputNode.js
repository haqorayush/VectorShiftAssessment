// inputNode.js

import React from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const InputNode = React.memo(({ id, data }) => {
  const [currName, handleNameChange] = useNodeField(id, 'inputName', data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, handleTypeChange] = useNodeField(id, 'inputType', data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      category="input"
      outputs={['value']}
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
          value={inputType} 
          onChange={handleTypeChange}
          className="nodrag"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
});

