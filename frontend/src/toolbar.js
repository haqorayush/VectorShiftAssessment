// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodeTypes = [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'customOutput', label: 'Output' },
        { type: 'text', label: 'Text' },
        { type: 'note', label: 'Note' },
        { type: 'condition', label: 'Condition' },
        { type: 'database', label: 'Vector DB' },
        { type: 'api', label: 'API Request' },
        { type: 'filter', label: 'Filter' },
    ];

    return (
        <header className="neo-nav">
            {/* Editorial Brand Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                    Vector<em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>Shift</em>
                </div>
                <div style={{ 
                    fontFamily: 'var(--mono)', 
                    fontSize: '10.5px', 
                    fontWeight: 500, 
                    letterSpacing: '0.22em', 
                    textTransform: 'uppercase', 
                    color: 'var(--gold)', 
                    background: 'var(--paper)', 
                    padding: '3px 8px', 
                    border: '1px solid var(--rule-dk)', 
                    borderRadius: '2px' 
                }}>
                    STUDIO
                </div>
            </div>

            {/* Draggable Precision Palette */}
            <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
                {nodeTypes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </nav>
        </header>
    );
};
