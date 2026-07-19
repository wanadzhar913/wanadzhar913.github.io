---
title: "Implementing K-Nearest Neighbours from Scratch: Brute Force vs KD-tree"
description: "Notes from building brute-force and KD-tree KNN in NumPy/SciPy, then timing both on the Iris dataset."
date: 2026-07-19
tags: ["Python", "NumPy", "KD-tree"]
categories: Machine Learning
ShowToc: true
TocOpen: true
---

{{< katex >}}

All code for this experiment can be found [here](https://github.com/wanadzhar913/interview_prep/tree/master/ml_concepts/00_k_nearest_neighbours).

---

Hi semua! Wanted to start this blog off to just share some experiments and learnings as I aim for a transition into ML Engineering. Hope y'all enjoy learn something!

I've been trying to implement all the classical ML algorithms from scratch and decided that [K-Nearest Neighbours](https://www.geeksforgeeks.org/machine-learning/k-nearest-neighbours/) was the perfect start. It's intuition was simple enough, and the [scikit-learn implementation](https://github.com/scikit-learn/scikit-learn/blob/d3898d9d5/sklearn/neighbors/_classification.py#L71-L78) made use of a special data structure called a [KD-tree](https://en.wikipedia.org/wiki/K-d_tree).

Hence, I implemented a classification and regression with NumPy, then swapped the distance search for SciPy’s [`KDTree`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.KDTree.html) to see whether that actually helped (in terms of accuracy/speed) on a small dataset.

**Main question for me:** do we get a meaningful speedup on classification, or is Iris too small to care?

I also include a [from-scratch KD-tree build/query](#appendix-kd-tree-from-scratch) at the end as an appendix — useful for intuition, even though the timed “fast” path uses SciPy.

## How KNN works

Given a query point:

1. Measure its distance to every training point.
2. Keep the closest \(k\) neighbours.
3. Aggregate those neighbours:
   - **Classification:** majority label among the \(k\) neighbours.
   - **Regression:** mean of the neighbours’ target values (not distances).

I used [Euclidean distance](https://www.datacamp.com/tutorial/euclidean-distance)*:

$$
d(x, y) = \sqrt{(x_1 - y_1)^2 + (x_2 - y_2)^2 + \cdots + (x_n - y_n)^2}
$$

After skimming [scikit-learn’s neighbours code](https://github.com/scikit-learn/scikit-learn/blob/d3898d9d5/sklearn/neighbors/_classification.py#L71-L78), the interesting bit is not the vote itself — it’s how they avoid a full scan when they can. That pushed me to compare brute force against a KD-tree.

***NOTE:** Super sorry if the LaTeX doesn't render!*

## Helpers

Majority vote is a one-liner with `Counter`:

```python
from collections import Counter

def majority_vote(labels: list) -> str:
    """Return the most frequent label."""
    return Counter(labels).most_common(1)[0][0]
```

Distance in NumPy:

```python
import numpy as np

def euclidean_distance(x1: np.ndarray, x2: np.ndarray) -> float:
    return np.sqrt(np.sum((x1 - x2) ** 2))
```

## Brute-force KNN

Fit just stores the training set. Predict scans every row, takes the \(k\) nearest, then votes (classification) or averages (regression).

```python
class KNNClassification:
    def __init__(self, k: int):
        self.k = k

    def fit(self, X: np.ndarray, y: np.ndarray):
        self.X_train = X
        self.y_train = y

    def predict(self, X: np.ndarray):
        predictions = [self._predict(x) for x in X]
        return np.array(predictions)

    def _predict(self, x: np.ndarray):
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]
        k_indices = np.argsort(distances)[: self.k]
        k_nearest_labels = [self.y_train[i] for i in k_indices]
        return majority_vote(k_nearest_labels)


class KNNRegression:
    def __init__(self, k: int):
        self.k = k

    def fit(self, X: np.ndarray, y: np.ndarray):
        self.X_train = X
        self.y_train = y

    def predict(self, X: np.ndarray):
        predictions = [self._predict(x) for x in X]
        return np.array(predictions)

    def _predict(self, x: np.ndarray):
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]
        k_indices = np.argsort(distances)[: self.k]
        k_nearest_targets = [self.y_train[i] for i in k_indices]
        return np.mean(k_nearest_targets)
```

This is the baseline I care about understanding. It is also \(O(n)\) per query before you even sort, so it gets expensive once \(n\) grows.

## Faster search with SciPy’s KDTree

Same API, different neighbour lookup. On `fit`, build a tree over `X`; on predict, `query` for the \(k\) nearest indices.

```python
from scipy.spatial import KDTree

class KNNClassificationFast:
    def __init__(self, k: int):
        self.k = k

    def fit(self, X: np.ndarray, y: np.ndarray):
        self.tree = KDTree(X)
        self.y_train = y

    def predict(self, X: np.ndarray):
        predictions = [self._predict(x) for x in X]
        return np.array(predictions)

    def _predict(self, x: np.ndarray):
        _, indices = self.tree.query(x, k=self.k)
        k_nearest_labels = [self.y_train[i] for i in indices]
        return majority_vote(k_nearest_labels)


class KNNRegressionFast:
    def __init__(self, k: int):
        self.k = k

    def fit(self, X: np.ndarray, y: np.ndarray):
        self.tree = KDTree(X)
        self.y_train = y

    def predict(self, X: np.ndarray):
        predictions = [self._predict(x) for x in X]
        return np.array(predictions)

    def _predict(self, x: np.ndarray):
        _, indices = self.tree.query(x, k=self.k)
        k_nearest_targets = [self.y_train[i] for i in indices]
        return np.mean(k_nearest_targets)
```

I did not reimplement tree search in the timed path — SciPy is enough to answer “does spatial indexing help here?” The appendix is where I build a tree myself.

## Iris run

Training script (classification only for the timing comparison):

```bash
python3 ml_concepts/00_k_nearest_neighbours/train.py
```

```python
import time

import numpy as np
from matplotlib.colors import ListedColormap
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.model_selection import train_test_split

from models import KNNClassification, KNNClassificationFast

cmap = ListedColormap(["#FF0000", "#00FF00", "#0000FF"])

iris = datasets.load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=1234
)

start_time = time.time()
knn = KNNClassification(k=5)
knn.fit(X_train, y_train)
predictions = knn.predict(X_test)
time_taken_knn = time.time() - start_time
accuracy_knn = np.sum(y_test == predictions) / len(y_test)
print(f"Accuracy for KNNClassification: {accuracy_knn:.6f}")
print(f"Time taken for KNNClassification: {time_taken_knn:.6f} seconds")

start_time = time.time()
knn = KNNClassificationFast(k=5)
knn.fit(X_train, y_train)
predictions = knn.predict(X_test)
time_taken_kd_tree = time.time() - start_time
accuracy_kd_tree = np.sum(y_test == predictions) / len(y_test)
print(f"Accuracy for KNNClassification with KDTree: {accuracy_kd_tree:.6f}")
print(
    f"Time taken for KNNClassification with KDTree: {time_taken_kd_tree:.6f} seconds"
)

plt.figure(figsize=(12, 6))
plt.scatter(
    X_test[:, 0],
    X_test[:, 1],
    c=predictions,
    cmap=cmap,
    edgecolors="k",
    s=20,
    label="Predicted Labels",
)
plt.xlabel("Sepal Length")
plt.ylabel("Sepal Width")
plt.title("KNN Classification")
plt.savefig("knn_classification.png")
plt.close()
```

Results on this machine:

| Method | Accuracy | Time (s) |
|--------|----------|----------|
| Brute force | 0.966667 | 0.007194 |
| SciPy `KDTree` | 0.966667 | 0.000671 |

Same accuracy, roughly an order of magnitude faster with the tree — even on Iris (~120 train rows). I would not over-read a single `time.time()` run, but the gap is large enough that I believe the direction.

![KNN Classification Output](/knn_classification_outcome.png)

## Takeaways

- Brute-force KNN is short and honest about what the algorithm is doing.
- Regression vs classification only changes the aggregate step (mean vs majority vote).
- KD-trees are worth wiring in when neighbour search dominates; SciPy makes that a small change if you already have a `fit` / `predict` shell.
- Next time I would time on a larger \(n\), and average over a few runs (or use `timeit`), before claiming a speedup number.

Thanks so much for reading gang!

## Resources

- [KDTree implementation in Python](https://medium.com/@isurangawarnasooriya/exploring-kd-trees-a-comprehensive-guide-to-implementation-and-applications-in-python-3385fd56a246)
- [Search and Insertion in a K-Dimensional Tree](https://www.geeksforgeeks.org/dsa/search-and-insertion-in-k-dimensional-tree/)
- [KNN implementation step-by-step (video)](https://youtu.be/rTEtEy5o3X0?si=KamJLclr2qKkLaaA)

---

## Appendix: KD-tree from scratch

Below is a minimal build + nearest-neighbour query I used to understand the structure SciPy is hiding. It finds a single nearest neighbour (not the full \(k\)-NN heap you’d want in production), and it works on a small 2D example.

- **Build idea:** at each depth, sort on one axis, put the median in the node, recurse left/right on the remaining points.
- **Query idea:** walk the promising child first, then only check the other child if the splitting plane is close enough that a nearer point could still live there.

```python
class KDNode:
    def __init__(self, point, k, left=None, right=None):
        self.point = point
        self.k = k  # axis used at this node
        self.left = left
        self.right = right


def build_kd_tree(points: list[tuple[float, float]], depth: int = 0) -> KDNode | None:
    if not points:
        return None

    k = len(points[0])
    axis = depth % k
    sorted_points = sorted(points, key=lambda p: p[axis])
    median_idx = len(sorted_points) // 2
    median_point = sorted_points[median_idx]

    node = KDNode(median_point, axis)
    node.left = build_kd_tree(sorted_points[:median_idx], depth + 1)
    node.right = build_kd_tree(sorted_points[median_idx + 1 :], depth + 1)
    return node


def distance_squared(point1: tuple[float, float], point2: tuple[float, float]) -> float:
    return sum((x - y) ** 2 for x, y in zip(point1, point2))


def nearest_neighbor(
    root: KDNode,
    target: tuple[float, float],
    depth: int = 0,
    best: KDNode | None = None,
) -> KDNode | None:
    if root is None:
        return best

    k = len(target)
    axis = depth % k

    if best is None or distance_squared(target, root.point) < distance_squared(
        target, best.point
    ):
        next_best = root
    else:
        next_best = best

    if target[axis] < root.point[axis]:
        next_branch, other_branch = root.left, root.right
    else:
        next_branch, other_branch = root.right, root.left

    best = nearest_neighbor(next_branch, target, depth + 1, next_best)
    if distance_squared(target, best.point) > abs(target[axis] - root.point[axis]) ** 2:
        best = nearest_neighbor(other_branch, target, depth + 1, best)

    return best


def main():
    points = [(3, 6), (17, 15), (13, 15), (6, 12), (9, 1), (2, 7)]
    root = build_kd_tree(points)
    nearest = nearest_neighbor(root, (9, 2))
    print("Nearest neighbor:", nearest.point)


if __name__ == "__main__":
    main() # Nearest neighbor: (9, 1)
```
