const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  if (value === null) return 'null';
  return String(value).toLowerCase();
};

const turnPathToString = (path) => path.join('.');

export default function plain(nodes) {
  const lines = [];
  const path = [];

  const walk = (tree, path) => {
    tree.forEach((node) => {
      const newPath = [...path, node.key];
      switch (node.type) {
        case 'nested':
          walk(node.children, newPath);
          break;

        case 'removed':
          lines.push(`Property '${turnPathToString(newPath)}' was removed`);
          break;

        case 'added':
          lines.push(
            `Property '${turnPathToString(newPath)}' was added with value: ${stringify(node.value)}`,
          );
          break;
        case 'changed':
          lines.push(
            `Property '${turnPathToString(newPath)}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
          );
          break;
        default:
          break;
      }
    });
    return lines.join('\n');
  };
  return walk(nodes, path);
}
