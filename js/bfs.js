import { graph } from "./graph.js";

export function bfs(start) {
  const key = start.toLowerCase().trim();

  const visited = new Set();
  const queue = [key];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();

    if (!visited.has(node)) {
      visited.add(node);

      const neighbors = graph[node];

      if (neighbors) {
        result.push(...neighbors);
        queue.push(...neighbors);
      }
    }
  }

  return result;
}