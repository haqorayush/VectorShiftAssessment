// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
        event.target.style.cursor = 'grab';
    };

    return (
        <div
            className="draggable-pill"
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={onDragEnd}
            draggable
            title={`Drag ${label} node to canvas`}
        >
            <span>{label}</span>
        </div>
    );
};