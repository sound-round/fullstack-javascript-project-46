const stringify = (value) => {
  if (value instanceof Object) return '[complex value]'
  if (typeof value === "string") return `'${value}'`
  if (value === null) return 'null'
  return String(value).toLowerCase()
}

const turn_path_to_string = (path) => {
  return path.join('.')
}

export default function plain (nodes) {
  const lines = []
  const path = []

  const walk = (tree, path) => {
    tree.forEach((node) => {
      const newPath = [...path, node.key]
      switch (node.type) {
        case 'nested':
          walk(node['children'], newPath)
          break

        case 'removed':
          lines.push(`Property '${turn_path_to_string(newPath)}' was removed`)
          break
        
        case 'added':
          lines.push(
            `Property '${turn_path_to_string(newPath)}' was added with value: ${stringify(node.value)}`
          )
          break
        case 'changed':
          lines.push(
            `Property '${turn_path_to_string(newPath)}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
          )
      }
    })
    return lines.join('\n')
  }
  return walk(nodes, path)
}
