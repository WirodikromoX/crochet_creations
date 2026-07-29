// BREADTH-FIRST SEARCH — O(V + E)
function bfs(graph, startKey) {
    const visited = new Set([startKey]);
    const queue = [startKey];
    const order = [];

    while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);

        const neighbors = graph[node] || [];
        neighbors.forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        });
    }

    return order;
}

function findRelatedByProduct(productName) {
    const graph = buildMaterialGraph();
    const startKey = "p:" + productName.toLowerCase().trim();

    const visited = bfs(graph, startKey);

    const materials = visited
        .filter(key => key.startsWith("m:") && graph[startKey].includes(key))
        .map(key => key.slice(2));

    const relatedProducts = visited
        .filter(key => key.startsWith("p:") && key !== startKey)
        .map(key => key.slice(2));

    return { materials, relatedProducts };
}
