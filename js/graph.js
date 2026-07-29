// GRAPH
function buildMaterialGraph() {
    const graph = {};

    products.forEach(product => {
        const productKey = "p:" + product.name.toLowerCase().trim();
        if (!graph[productKey]) graph[productKey] = [];

        (product.recipe || []).forEach(entry => {
            const materialKey = "m:" + entry.material.toLowerCase().trim();
            if (!graph[materialKey]) graph[materialKey] = [];

            if (!graph[productKey].includes(materialKey)) {
                graph[productKey].push(materialKey);
            }
            if (!graph[materialKey].includes(productKey)) {
                graph[materialKey].push(productKey);
            }
        });
    });

    return graph;
}
