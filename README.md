# Pathfinding Visualizer
Welcome to Pathfinding Visualizer! The project results from the 2-day project challenge: a Pathfinder Visualization on a Grid. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it. You can access it here: https://path-eyadlizer.netlify.app/

# Meet the Algorithms
This application supports the following algorithms:

**Dijkstra's Algorithm** (weighted): the father of pathfinding algorithms; guarantees the shortest path.

**A Search*** (weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee _(not in all cases, https://ieeexplore.ieee.org/document/9190342)_ the shortest path much faster than Dijkstra's Algorithm.

**Greedy Best-first Search** (weighted): a faster, more heuristic-heavy version of A*; does not guarantee the shortest path.

**Breath-first Search** (unweighted): a great algorithm; guarantees the shortest path.

**Bidirectional Breath-first Search** (unweighted): Breath-first Search from both sides; guarantees the shortest path.

**Depth-first Search** (unweighted): a very bad algorithm for pathfinding; it does not guarantee the shortest path.
