import define1 from "./ddab8a15ee29c22b@444.js";

function _1(md){return(
md`# Free trees`
)}

function _FreeTree(RootedTree){return(
class FreeTree {
  
  // Constructor - an empty tree
  constructor () {
    this.tree = new Map()
  }
  
  // Defines an edge between nodes a, b
  // Throws an exception if this edge would create a cycle or an
  // unconnected component
  addEdge (a,b=[]) {
    
    //se a arvore esta vazia, adiciona o edge
    //se a arvore nao esta vazia
    //verifica se um dos elementos do edge ja existe
    //se nao existe, excecao de componente nao conectado
    //se existe, verifica se causa ciclo, se causa, excecao de ciclo
    //se existe e nao causa ciclo, adiciona o edge
    if (this.tree.size == 0) {
      this.tree.set(a,[b])
      this.tree.set(b,[a])
    }
    else if (this.tree.has(a) || this.tree.has(b)) {
      if (this.tree.has(a) && this.tree.has(b)) {
        throw "Creates a cycle"
      }
      else if (this.tree.has(a)) {
        this.tree.set(a,this.tree.get(a).concat(b))
        this.tree.set(b,[a])
      }
      else if (this.tree.has(b)) {
        this.tree.set(b,this.tree.get(b).concat(a))
        this.tree.set(a,[b])
      }
    }
    else {
      throw "Unconnected Component"
    }
    
  }

  //
  // Returns a RootedTree object corresponding to this free tree rooted at
  // the given 'root' node
  rootedTree (root, parent=null) {

    //funcao recursiva que retorna RootedTrees aninhadas com os descententes de cada node
    //se o elemento root existe na arvore, retorna a arvore aninhada
    //se nao existe, retorna uma excecao
    if (this.tree.has(root)) {
      let children = [...this.tree.get(root)] //clone do array
      let rtree = []
    
      if (parent!=null) {
        let pos = children.indexOf(parent)
        children.splice(pos,1)
      }
      
      if (children.length == 0) {     
        return new RootedTree(root)
      }
      else{
        for (let child of children) {
          rtree.push(this.rootedTree(child, root))
        }
        return new RootedTree(root,...rtree)
      }
    }
    else{
      throw "Root not in tree"
    }
  }   
}
)}

function _3(FreeTree)
{
  let t = new FreeTree()
  t.addEdge(1,2)
  t.addEdge(1,3)
  t.addEdge(2,3)
  return t
}


function _4(FreeTree)
{
  let t = new FreeTree()
  t.addEdge(1,2)
  t.addEdge(3,4)
  return t
}


function _5(FreeTree,draw)
{
  let t = new FreeTree()
  t.addEdge(1,2)
  t.addEdge(2,3)
  return draw(t.rootedTree(2))
}


function _t(FreeTree,html,draw)
{ 
  let t = new FreeTree();
  for (let [a,b] of [[4,6],[4,5],[2,4],[1,2],[1,3],[3,7],[4,8],[1,9]]) {
    t.addEdge(a,b)
  }
  let div = html`<div></div>`;
  for (let i of [1,2,3,4,5,6,7]) {
    div.append(draw(t.rootedTree(i)))
  }
  return div
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("FreeTree")).define("FreeTree", ["RootedTree"], _FreeTree);
  main.variable(observer()).define(["FreeTree"], _3);
  main.variable(observer()).define(["FreeTree"], _4);
  main.variable(observer()).define(["FreeTree","draw"], _5);
  main.variable(observer("t")).define("t", ["FreeTree","html","draw"], _t);
  const child1 = runtime.module(define1);
  main.import("RootedTree", child1);
  main.import("draw", child1);
  return main;
}
