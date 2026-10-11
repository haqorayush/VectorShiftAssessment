// llmNode.js

import React from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = React.memo(({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      category="llm"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <div style={{ padding: '4px 0', fontSize: '12.5px' }}>
        <span>This is an LLM processing node.</span>
      </div>
    </BaseNode>
  );
});

