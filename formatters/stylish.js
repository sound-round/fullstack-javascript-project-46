const mapTypeToSign = {
  unchanged: ' ',
  nested: ' ',
  removed: '-',
  added: '+',
};

function getIndent(depth, indentType = ' ', indentSize = 4, offset = 0) {
  const currentIndentSize = depth * indentSize;
  return indentType.repeat(currentIndentSize) + (indentType.repeat(offset));
}

const stringify = (tree, depth) => {
  if (tree instanceof Object) {
    const braceIndent = getIndent(depth + 1);
    const deepIndent = getIndent(depth + 1, ' ', 4, 3); // why offset is 3?
    const formattedValues = [];
    Object.entries(tree).forEach(([key, value]) => {
      formattedValues.push(
        `${deepIndent} ${key}: ${stringify(value, depth + 1)}`,
      );
    });
    return `{\n${formattedValues.join('\n')}\n${braceIndent}}`;
  }

  if (tree === null) return 'null';
  if (tree instanceof String) return tree;
  return String(tree);
};

const walk = (tree, depth) => {
  const braceIndent = getIndent(depth);
  const deepIndent = getIndent(depth, ' ', 4, 2);
  const lines = [];

  if (!(tree instanceof Array) && !(tree instanceof Object)) {
    return String(tree);
  }

  tree.forEach((node) => {
    if (node.type === 'nested') {
      lines.push(
        `${deepIndent}${mapTypeToSign.nested} ${node.key}: ${walk(node.children, depth + 1)}`,
      );
      return;
    }
    if (node.type === 'changed') {
      lines.push(
        `${deepIndent}${mapTypeToSign.removed} ${node.key}: ${stringify(node.oldValue, depth)}`,
      );
      lines.push(
        `${deepIndent}${mapTypeToSign.added} ${node.key}: ${stringify(node.newValue, depth)}`,
      );
      return;
    }
    lines.push(
      `${deepIndent}${mapTypeToSign[node.type]} ${node.key}: ${stringify(node.value, depth)}`,
    );
  });
  const joinedLines = lines.join('\n');
  const formattedDiff = ['{', joinedLines, `${braceIndent}}`];
  return formattedDiff.join('\n');
};

export default function stylish(nodes) {
  return walk(nodes, 0);
}
