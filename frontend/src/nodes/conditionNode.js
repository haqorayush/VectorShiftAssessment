// conditionNode.js
import React from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const ConditionNode = React.memo(({ id, data }) => {
  const [operator, handleOperatorChange] = useNodeField(id, 'operator', data?.operator || '==');
  const [comparisonValue, handleValueChange] = useNodeField(id, 'comparisonValue', data?.comparisonValue || '');

  return (
    <BaseNode
      id={id}
      title="Condition Router"
      category="condition"
      inputs={['input']}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' }
      ]}
    >
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <select
          value={operator}
          onChange={handleOperatorChange}
          className="nodrag"
          style={{ width: '75px' }}
        >
          <option value="==">==</option>
          <option value="!=">!=</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value="contains">contains</option>
        </select>
        <input
          type="text"
          placeholder="Value..."
          value={comparisonValue}
          onChange={handleValueChange}
          className="nodrag"
          style={{ flexGrow: 1, minWidth: '60px' }}
        />
      </div>
    </BaseNode>
  );
});
