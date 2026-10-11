// apiNode.js
import React from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const APINode = React.memo(({ id, data }) => {
  const [method, handleMethodChange] = useNodeField(id, 'method', data?.method || 'GET');
  const [url, handleUrlChange] = useNodeField(id, 'url', data?.url || 'https://api.example.com/v1');

  return (
    <BaseNode
      id={id}
      title="API Request"
      category="api"
      inputs={[
        { id: 'params', label: 'params' },
        { id: 'headers', label: 'headers' },
        { id: 'body', label: 'body' }
      ]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' }
      ]}
    >
      <div style={{ display: 'flex', gap: '6px' }}>
        <select
          value={method}
          onChange={handleMethodChange}
          className="nodrag"
          style={{ fontWeight: 'bold', width: '75px' }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DEL</option>
        </select>
        <input
          type="text"
          placeholder="URL..."
          value={url}
          onChange={handleUrlChange}
          className="nodrag"
          style={{ flexGrow: 1, minWidth: '120px' }}
        />
      </div>
    </BaseNode>
  );
});
