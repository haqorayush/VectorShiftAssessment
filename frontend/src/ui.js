// ui.js
// Displays the drag-and-drop studio canvas in VectorShift Neo-Editorial Dark Mode
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { NoteNode } from './nodes/noteNode';
import { ConditionNode } from './nodes/conditionNode';
import { DatabaseNode } from './nodes/databaseNode';
import { APINode } from './nodes/apiNode';
import { FilterNode } from './nodes/filterNode';
import { AutoSpacedEdge } from './edges/AutoSpacedEdge';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  note: NoteNode,
  condition: ConditionNode,
  database: DatabaseNode,
  api: APINode,
  filter: FilterNode,
};

const edgeTypes = {
  smoothstep: AutoSpacedEdge,
  default: AutoSpacedEdge,
  custom: AutoSpacedEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeColor = (node) => {
  switch (node.type) {
    case 'customInput': return '#C5A562'; // Gold Accent
    case 'llm': return '#A390E4';         // Refined Violet
    case 'customOutput': return '#E4B462';// Amber
    case 'text': return '#62B8E4';        // Azure
    case 'note': return '#8B867D';        // Taupe
    case 'condition': return '#E48462';   // Coral
    case 'database': return '#62E4C5';    // Mint Cyan
    case 'api': return '#E4628E';         // Rose
    case 'filter': return '#8092E4';      // Indigo
    default: return '#54585F';
  }
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    };

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow') && reactFlowInstance) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg-alt)' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  style: { stroke: '#C5A562', strokeWidth: 2 },
                  animated: true,
                }}
            >
                <Background color="#20242C" gap={24} size={1.5} />
                <Controls style={{ backgroundColor: '#0F131A', border: '1px solid #20242C', borderRadius: '2px', boxShadow: '2px 2px 0px #06080B', overflow: 'hidden' }} />
                <MiniMap
                  nodeColor={nodeColor}
                  nodeStrokeWidth={2}
                  zoomable
                  pannable
                  style={{ backgroundColor: '#0F131A', border: '1px solid #20242C', borderRadius: '2px', boxShadow: '2px 2px 0px #06080B' }}
                />
            </ReactFlow>
        </div>
    );
};
