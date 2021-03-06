class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  insertChild(value) {
    const newTree = new Tree(value);
    this.children.push(newTree);
    return newTree;
  }

  // Uses a Depth-First Traversal
  static traverse(tree, func = console.log) {
    func(tree);
    tree.children.forEach((child) => {
      Tree.traverse(child, func);
    });
  }

  contains(searchValue) {
    let result = false;
    Tree.traverse(this, (leaf) => {
      result = result || leaf.value === searchValue;
    });
    return result;
  }

  static size(tree) {
    let size = 0;
    Tree.traverse(tree, () => {
      size++;
    });
    return size;
  }

  static find(tree, value) {
    let result = false;
    Tree.traverse(tree, (leaf) => {
      if (leaf.value === value) {
        result = leaf;
      }
    });
    return result;
  }

  insert(parentTree, value) {
    let leaf = Tree.find(this, parentTree.value);
    if (leaf) {
      leaf.insertChild(value);
    }
    return leaf;
  }

  remove(value) {
    if (this.value === value) {
      delete this;
    }
    this.children.forEach((child, index) => {
      if (child.value === value) {
        this.children.splice(index, 1);
      } else {
        child.remove(value);
      }
    });
  }

  reorder(node1, node2) {
    const leaf1 = Tree.find(this, node1);
    const leaf2 = Tree.find(this, node2);

    leaf1.value = node2;
    leaf2.value = node1;
  }
}

const myTree = new Tree(1);
console.log(myTree);
// {
//     value: 1,
//     children: [],
// }

myTree.insertChild(2);

console.log(myTree);
// {
//     value: 1,
//     children: [
//                  {
//                  value: 2,
//                  children: [],
//                  }
//               ],
// }

myTree.insertChild(3);
console.log(myTree);
// {
//     value: 1,
//     children: [
//                  {
//                  value: 2,
//                  children: [],
//                  },
//                  {
//                  value: 3,
//                  children: [],
//                  }
//               ],
// }

// Insert Children of Children

console.log(`~~~~~~Insert Children of Children~~~~~~`);
const myTree2 = myTree.insertChild(4);
myTree2.insertChild(6);
const myTree3 = myTree2.insertChild(5);
console.log(myTree);
console.log(myTree2);
console.log(myTree3);

// Tree {
//     value: 1,
//     children: [
//       Tree { value: 2, children: [] },
//       Tree { value: 3, children: [] },
//       Tree { value: 4, children: [Array] }
//     ]
//   }
//   Tree {
//     value: 4,
//     children: [ Tree { value: 6, children: [] },
//                 Tree { value: 5, children: [] }
//               ]
//   }
//   Tree { value: 5, children: [] }
