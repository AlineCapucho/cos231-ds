function _1(md){return(
md`# Splay Trees`
)}

function _Node(){return(
class Node {
  
  constructor (key, left, right) {
    Object.assign(this,{key,left,right})
  }
  
}
)}

function _SplayTree(Node){return(
class SplayTree {
  
  
  constructor (node = null) {
    this.node = node
  }

  updateKeys (k,op) {
    if(op=="n"){
      window.keys = [k];
    }
      
    else if(op=="i"){
      window.keys.push(k);
    }
      
    else if(op=="r"){
      window.keys.splice((window.keys.indexOf(k)),1);
    }
      
    else if(op=="s"){
      if(k>window.keys.length){
        throw `A árvore só tem ${window.keys.length} elementos`;
      }
      else{
        window.keys.sort((a,b)=>a-b);
        return window.keys[k-1]
      }
    }
      
    else if(op=="q"){
      
      if(window.keys.includes(k[0]) && window.keys.includes(k[1])){
        window.keys.sort((a,b)=>a-b);
        let sum = 0;
        let report = [];
        for(let i=window.keys.indexOf(k[0]);i<=window.keys.indexOf(k[1]);i++){
          sum += window.keys[i];
          report.push(window.keys[i]);
        }
        return [report.length, sum, report]
      }
      else{
        throw `Key invalida`;
      }
    }
  
  }
  
  rotateRight () {
    let [d, b, C] = [this.node, this.node.left.node, this.node.left.node.right.node];
    [this.node, b.right.node, d.left.node] = [b, d, C];
  }
  
  rotateLeft () {
    let [b, d, C] = [this.node, this.node.right.node, this.node.right.node.left.node];
    [this.node, d.left.node, b.right.node] = [d, b, C];
  }
  
  splay (key) {
    
    function sp (p, q = null, r = null, path = "") {
      
      let result = 0;
      if (p.node && p.node.key != key) {
        if (p.node.key > key) {
          if (p.node.left.node) result = sp (p.node.left, p, q, path+"L") + 1
        }
        else {
          if (p.node.right.node) result = sp (p.node.right, p, q, path+"R") + 1
        }
      }
      if (result%2 == 0) {
        switch (path.slice(-2)) {
          case "LL" : r.rotateRight(); r.rotateRight(); break;
          case "RR" : r.rotateLeft(); r.rotateLeft(); break;
          case "RL" : q.rotateRight(); r.rotateLeft(); break;
          case "LR" : q.rotateLeft(); r.rotateRight(); break;
          case "R" : q.rotateLeft(); break;
          case "L" : q.rotateRight(); break;
        }
      }
      return result
    }
    
    if (this.node) sp (this)
    
  }
  
  insert (key) {
    if (this.node == null) {
      this.node = new Node (key, new SplayTree(), new SplayTree())
      this.updateKeys(key,"n");
    }
    else {
      this.splay(key)
      if (this.node.key == key) {
        throw `Key ${key} already exists`;
      }
      if (this.node.key < key) {
        let root = new Node (key, new SplayTree(this.node), this.node.right);
        this.node.right = new SplayTree()
        this.node = root;
      }
      else {
        let root = new Node (key, this.node.left, new SplayTree(this.node));
        this.node.left = new SplayTree();
        this.node = root
      }
      this.updateKeys(key,"i")
    }
  }
  
  
  remove (key) {
    this.splay (key)
    if (this.node == null || this.node.key != key) {
       throw `Key ${key} does not exist`;
    }
    else {
      if (this.node.left.node == null) {
        this.node = this.node.right.node
      }
      else if (this.node.right.node == null) {
        this.node = this.node.left.node
      }
      else {
        this.node.right.splay(key)
        this.node.right.node.left.node = this.node.left.node
        this.node = this.node.right.node
      }
      this.updateKeys(key,"r");
    }
  }
  
  statisticOrderQuery (k) {
    return this.updateKeys(k,"s")
  }

  //retorna um array com [count, sum, report]
  rangeQuery (k1,k2) {
    return this.updateKeys([k1,k2],"q")
  }

//retorna um objeto contendo as duas arvores
//left é a arvore com as chaves menores
//right é a arvore com as chaves maiores
//altera a arvore inicial
  split (key) {
    let left = null;
    let right = null;

    this.splay(key);
    if (this.node.key==key) {
      left = this.node.left;
      left.insert(key);
      right = this.node.right;
      right.insert(key);
    }
    else if (this.node.key<key) {
      right = this.node.right;
      left = this.node.left;
      left.insert(this.node.key);
    }
    else if (this.node.key>key) {
      left = this.node.left;
      right = this.node.right;
      right.insert(this.node.key);
    }
    return {left, right}
    
  }

//recebe a arvore que tera o merge feito com essa
//nao possui um retorno, caso Stree seja null nao faz modificacoes
//caso nao seja null, faz um splay com infinity na arvore atual e 
//Stree e compara seus maiores valores
//altera a arvore inicial
  merge (Stree) {
    if (Stree != null){
      this.splay(Infinity);
      Stree.splay(Infinity);
      let keyA = this.node.key;
      let keyB = Stree.node.key;
      if(keyA > keyB){
        this.node.right = Stree;
      }
      else{
        Stree.node.right = new SplayTree(this.node);
        this.node = Stree.node;
        this.node.right = Stree.node.right;
        this.node.left = Stree.node.left;
      }
    }
  }
  
    
}
)}

function _4(md){return(
md`## Demo`
)}

function _refresh(html){return(
html`<button>Refresh</button>`
)}

function _6(refresh,SplayTree,html,shuffle,dot,graphViz)
{ 
  refresh;
  let t = new SplayTree()
  let keys = [0,1,2,3,4,5];
  let div= html`<div></div>`;
  shuffle(keys)
  for (let i of keys) {
    t.insert(i);
  }
  div.append(dot`${graphViz(t)}`);
  
  let menor = t.statisticOrderQuery(5);
  let intervalo = t.rangeQuery(0,5);
  div.append(dot`${graphViz(t)}`);
  console.log(menor);

  
  return [menor,intervalo]
}


function _7(refresh,SplayTree,html,shuffle,dot,graphViz)
{ 
  refresh;
  let t = new SplayTree()
  let keys = [0,1,2,4,5];
  let div= html`<div></div>`;
  shuffle(keys)
  for (let i of keys) {
    t.insert(i);
  }
  div.append(html`<br>Arvore Inicial<br>`);
  div.append(dot`${graphViz(t)}`);
  
  let objeto = t.split(3);
  
  div.append(html`<br>Arvore Esquerda apos Split<br>`);
  div.append(dot`${graphViz(objeto.left)}`);
  div.append(html`<br>Arvore Direita apos Split<br>`);
  div.append(dot`${graphViz(objeto.right)}`);
  
  return div
}


function _8(refresh,SplayTree,shuffle,html,dot,graphViz)
{ 
  refresh;
  let t = new SplayTree()
  let keys1 = [3,4,5];
  shuffle(keys1)
  for (let i of keys1) {
    t.insert(i);
  }
  let t2 = new SplayTree()
  let keys2 = [0,1,2];
  shuffle(keys2)
  for (let i of keys2) {
    t2.insert(i);
  }
  t.merge(t2);
  let div= html`<div></div>`;
  div.append(dot`${graphViz(t)}`);
  return div
}


function _9(refresh,SplayTree,shuffle,html,dot,graphViz)
{ 
  refresh;
  let t = new SplayTree()
  let keys1 = [0,1,2];
  shuffle(keys1)
  for (let i of keys1) {
    t.insert(i);
  }
  let t2 = new SplayTree()
  let keys2 = [7,8,9];
  shuffle(keys2)
  for (let i of keys2) {
    t2.insert(i);
  }
  t.merge(t2);
  let div= html`<div></div>`;
  div.append(dot`${graphViz(t)}`);
  return div
}


function _10(md){return(
md`## Drawing code`
)}

function _graphViz(SplayTree){return(
function graphViz (tree) {
  let count = 0;
  let nodeMap = new Map();
  let result = "";
  let getNodeId = (tree) => {
    if (nodeMap.has(tree.node)) return nodeMap.get(tree.node);
    let nodeId = "node"+(++count);
    if (tree.node==null) {
      result += `${nodeId} [label="" shape=point width=0];`
      return nodeId;
    }
    let label = tree.node.key;
    result += `${nodeId} [label="${label}"];\n`;
    nodeMap.set (tree.node,nodeId);
    return nodeId
  }
  let nullNode = new SplayTree()
  let traverse = (tree) => {
    if (tree.node==null) return;
    let nodeId = getNodeId (tree);
    if (tree.node.left.node == null && tree.node.right.node == null) return;
    for (let child of [tree.node.left, nullNode, tree.node.right]) {
      let childId = getNodeId(child);
      let style = (child.node == null) ? "[style=invis]" : "";
      result += `${nodeId} -- ${childId} ${style};\n`;
      traverse(child);
    }
  }
  traverse(tree)
  return `graph {graph [ordering="out"];
                   node [shape=circle fixedsize=true width=0.5];
          ${result}\n }`;
}
)}

function _12(md){return(
md`## Libraries`
)}

function _shuffle(){return(
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
)}

function _dot(require){return(
require("@observablehq/graphviz")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("Node")).define("Node", _Node);
  main.variable(observer("SplayTree")).define("SplayTree", ["Node"], _SplayTree);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof refresh")).define("viewof refresh", ["html"], _refresh);
  main.variable(observer("refresh")).define("refresh", ["Generators", "viewof refresh"], (G, _) => G.input(_));
  main.variable(observer()).define(["refresh","SplayTree","html","shuffle","dot","graphViz"], _6);
  main.variable(observer()).define(["refresh","SplayTree","html","shuffle","dot","graphViz"], _7);
  main.variable(observer()).define(["refresh","SplayTree","shuffle","html","dot","graphViz"], _8);
  main.variable(observer()).define(["refresh","SplayTree","shuffle","html","dot","graphViz"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("graphViz")).define("graphViz", ["SplayTree"], _graphViz);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("shuffle")).define("shuffle", _shuffle);
  main.variable(observer("dot")).define("dot", ["require"], _dot);
  return main;
}
