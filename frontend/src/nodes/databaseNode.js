// databaseNode.js
import React from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const DatabaseNode = React.memo(({ id, data }) => {
  const [dbType, handleDbTypeChange] = useNodeField(id, 'dbType', data?.dbType || 'Pinecone');
  const [collection, handleCollectionChange] = useNodeField(id, 'collection', data?.collection || 'documents_v1');
  const [topK, handleTopKChange] = useNodeField(id, 'topK', data?.topK || 5);

  return (
    <BaseNode
      id={id}
      title="Vector DB"
      category="database"
      inputs={[
        { id: 'query', label: 'query' },
        { id: 'embeddings', label: 'embeddings' }
      ]}
      outputs={[
        { id: 'results', label: 'results' },
        { id: 'metadata', label: 'metadata' }
      ]}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>Provider:</span>
        <select
          value={dbType}
          onChange={handleDbTypeChange}
          className="nodrag"
        >
          <option value="Pinecone">Pinecone</option>
          <option value="Qdrant">Qdrant</option>
          <option value="ChromaDB">ChromaDB</option>
          <option value="Weaviate">Weaviate</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>Collection:</span>
        <input
          type="text"
          className="nodrag"
          value={collection}
          onChange={handleCollectionChange}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--ink-soft)' }}>
        <span style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
          <span>Top K:</span>
          <span style={{ color: 'var(--gold)', fontWeight: '700' }}>{topK}</span>
        </span>
        <input
          type="range"
          className="nodrag nowheel"
          min="1"
          max="20"
          value={topK}
          onChange={(e) => handleTopKChange(Number(e.target.value))}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          style={{ accentColor: 'var(--gold)', width: '100%', cursor: 'pointer', padding: 0 }}
        />
      </label>
    </BaseNode>
  );
});
