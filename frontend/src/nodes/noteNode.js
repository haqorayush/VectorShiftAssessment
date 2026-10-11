// noteNode.js
import React from 'react';
import { BaseNode, useNodeField } from './BaseNode';

export const NoteNode = React.memo(({ id, data }) => {
  const [noteText, handleNoteChange] = useNodeField(id, 'noteText', data?.noteText || 'Type comments or annotations here...');

  return (
    <BaseNode
      id={id}
      title="Note / Comment"
      category="note"
      inputs={[]}
      outputs={[]}
      style={{ borderColor: 'var(--rule-dk)', backgroundColor: 'var(--paper)' }}
    >
      <textarea
        className="nodrag nowheel"
        value={noteText}
        onChange={handleNoteChange}
        rows={3}
        style={{
          width: '100%',
          resize: 'vertical',
          fontFamily: 'var(--sans)',
          boxSizing: 'border-box',
        }}
      />
    </BaseNode>
  );
});
