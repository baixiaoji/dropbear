const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];

const apply = (node) => {
  const fn = environment[node.name];

  const args = node.arguments.map(evaluate);

  if (typeof fn !== 'function') {
    throw TypeError(`${node.name} is not a function`);
  }

  return fn.apply(null, args);
}

const getIndentifier = (node) => {
  const identifier = environment[node.name];

  if (typeof identifier === 'undefined') {
    throw new ReferenceError(`${node.name} is not defined`);
  }

  return identifier;
}

const evaluate = (node) => {
  if (node.type === 'CallExpression') return apply(node);
  if (node.type === 'Identifier') return getIndentifier(node);
  if (node.value) return node.value;
};

module.exports = { evaluate };
