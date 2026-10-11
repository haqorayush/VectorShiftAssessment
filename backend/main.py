# main.py
# VectorShift Neo-Editorial Studio Backend Engine (FastAPI + Python)
# ------------------------------------------------------------------
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import deque
import json
import logging

logger = logging.getLogger("vectorshift_engine")

app = FastAPI(title="VectorShift Pipeline Engine", version="1.0.0")

# Enable CORS for React studio dev servers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]] = []
    edges: List[Dict[str, Any]] = []

def calculate_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Evaluates whether the graph constructed by nodes and edges is a Directed Acyclic Graph (DAG)
    using Kahn's algorithm (Topological Sorting).
    """
    if not nodes:
        return True

    # Build node ID map and initialize in-degree tracking
    node_ids = {str(node.get("id")): 0 for node in nodes if node.get("id")}
    adj_list = {node_id: [] for node_id in node_ids}

    for edge in edges:
        source = str(edge.get("source", ""))
        target = str(edge.get("target", ""))

        # Check valid directed links inside the active node set
        if source in node_ids and target in node_ids:
            adj_list[source].append(target)
            node_ids[target] += 1

    # Initialize queue with root nodes (in_degree == 0) using deque for O(1) pop
    queue = deque([node_id for node_id, degree in node_ids.items() if degree == 0])
    visited_nodes = 0

    while queue:
        current_node = queue.popleft()
        visited_nodes += 1

        for neighbor in adj_list.get(current_node, []):
            node_ids[neighbor] -= 1
            if node_ids[neighbor] == 0:
                queue.append(neighbor)

    # If visited_nodes matches total nodes, the graph can be topologically sorted (no directed cycles)
    return visited_nodes == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline_post(data: PipelineRequest):
    """
    Parses pipeline JSON payloads to calculate num_nodes, num_edges, and verify DAG property.
    """
    nodes = data.nodes
    edges = data.edges

    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = calculate_is_dag(nodes, edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }


@app.get('/pipelines/parse')
def parse_pipeline_get(pipeline: str = "{}"):
    try:
        data = json.loads(pipeline)
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
    except Exception as e:
        logger.exception("Failed to parse pipeline payload in GET /pipelines/parse: %s", e)
        nodes = []
        edges = []

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": calculate_is_dag(nodes, edges)
    }
