// https://observablehq.com/@esperanc/trees@444
function _1(md){return(
md`# Trees

JavaScript implementations of trees mentioned in Lecture 3 of [David Mount's course on Data Structures (CMSC420)](https://www.cs.umd.edu/class/fall2019/cmsc420-0201/lectures.html)
`
)}

function _2(md){return(
md`<hr>
## Rooted tree`
)}

function _RootedTree(){return(
class RootedTree {
  constructor (data, ...descendants) {
    this.data = data;
    this.descendants = descendants;
  }
  *preorder () {
    yield this;
    for (let d of this.descendants) yield* d.preorder()
  }
  *postorder () {
    for (let d of this.descendants) yield* d.postorder()
    yield this;
  }
}
)}

function _4(md){return(
md`** A helper function to instantiate RootedTree objects **`
)}

function _RT(RootedTree){return(
function (...args) { return new RootedTree (...args) }
)}

function _6(md){return(
md`** An example of a rooted tree **`
)}

function _rt1(RT){return(
RT("A",RT("B",RT("C"),RT("D")),RT("E"),RT("F",RT("G"),RT("H",RT("I"),RT("J"),RT("K"))))
)}

function _8(md){return(
md`** Drawing of \`rt1\` using the GraphViz package**`
)}

function _9(draw,rt1){return(
draw(rt1)
)}

function _10(md){return(
md`** Arrays with preorder and postorder traversals of the tree **`
)}

function _11(rt1){return(
[...rt1.preorder()].map(node => node.data)
)}

function _12(rt1){return(
[...rt1.postorder()].map(node => node.data)
)}

function _13(md){return(
md`<hr>
## Rooted tree (binary nodes)`
)}

function _RootedTreeBinary(){return(
class RootedTreeBinary {
  constructor (data,firstChild=null,nextSibling=null) {
    [this.data,this.firstChild,this.nextSibling] = [data,firstChild,nextSibling]
  }
  *preorder () { 
    yield this;
    let child = this.firstChild;
    while (child != null) {
      yield* child.preorder();
      child = child.nextSibling;
    }
  }
  *postorder () { 
    let child = this.firstChild;
    while (child != null) {
      yield* child.postorder();
      child = child.nextSibling;
    }
    yield this;
  }
}
)}

function _15(md){return(
md`** A helper function to instantiate \`RootedTreeBinary\` objects **`
)}

function _RTB(RootedTreeBinary){return(
(d,f,n) => new RootedTreeBinary (d,f,n)
)}

function _17(md){return(
md`** An example of a rooted tree stored as binary nodes **`
)}

function _rtb1(RTB){return(
RTB("A",RTB("B", RTB("C", null, RTB("D")), RTB("E",null,RTB("F",RTB("G",null,RTB("H",RTB("I",null,RTB("J",null,RTB("K")))))))))
)}

function _19(rt1){return(
[...rt1.postorder()].map(node => node.data)
)}

function _20(md){return(
md`** Drawing of \`rtb1\` using the GraphViz package**`
)}

function _21(draw,rtb1){return(
draw(rtb1)
)}

function _22(md){return(
md`<hr>
## Binary tree`
)}

function _BinaryTree(){return(
class BinaryTree {
  constructor (entry,left=null,right=null) {
    // Alternative to line below: Object.assign(this,{entry,left,right})
    [this.entry,this.left,this.right] = [entry,left,right]
  }
  *inorder () {
    if (this.left) yield* this.left.inorder()
    yield this;
    if (this.right) yield* this.right.inorder()
  }
  *preorder () {
    yield this;
    if (this.left) yield* this.left.preorder()
    if (this.right) yield* this.right.preorder()
  }
  *postorder () {
    if (this.left) yield* this.left.postorder()
    if (this.right) yield* this.right.postorder()
    yield this;
  }
}
)}

function _24(md){return(
md`** A helper function to instantiate \`BinaryTree\` objects **`
)}

function _BT(BinaryTree){return(
(e,l,r) => new BinaryTree (e,l,r)
)}

function _26(md){return(
md`** Example binary tree **`
)}

function _bt1(BT){return(
BT("a",BT("b",BT("d", BT("g"),BT("h"))),BT("c",BT("e",null,BT("i")),BT("f")))
)}

function _28(md){return(
md`** Drawing of \`bt1\` using the GraphViz package**`
)}

function _29(draw,bt1){return(
draw(bt1)
)}

function _30(md){return(
md`** Arrays with inorder, preorder and postorder traversals of the tree **`
)}

function _31(bt1){return(
[...bt1.inorder()].map(node => node.entry)
)}

function _32(bt1){return(
[...bt1.preorder()].map(node => node.entry)
)}

function _33(bt1){return(
[...bt1.postorder()].map(node => node.entry)
)}

function _34(md){return(
md`<hr>
## Threaded Binary Tree`
)}

function _Link(){return(
class Link {
  constructor (to, isThread = false) {
    [this.to, this.isThread] = [to, isThread];
  }
}
)}

function _ThreadedBinaryTree(Link){return(
class ThreadedBinaryTree {
  constructor (entry, left=null, right=null) {
    [this.entry,this.left,this.right] = [entry,left,right]
  }
  *inorder () {
    if (this.left && !this.left.isThread) yield* this.left.to.inorder()
    yield this;
    if (this.right && !this.right.isThread) yield* this.right.to.inorder()
  }
  thread () {
    let a = [...this.inorder()];
    for (let i = 0; i < a.length; i++) {
      if (i > 0 && !a[i].left) a[i].left = new Link(a[i-1], true);
      if (i+1 < a.length && !a[i].right) a[i].right = new Link(a[i+1], true);
    }
    return this
  }
  inorderSuccessor () {
    let u = this.right;
    if (!u) return null;
    if (u.isThread) return u.to;
    while (u.to.left && !u.to.left.isThread) {
      u = u.to.left
    }
    if (u) return u.to
    return null
  }
  inorderPredecessor () {
    
  }
}
)}

function _37(md){return(
md`** Helper functions to instantiate \`Link\` and \`ThreadedBinaryTree\` objects **`
)}

function _L(Link){return(
(to) => to ? new Link(to) : null
)}

function _TBT(ThreadedBinaryTree,L){return(
(e,l,r) => new ThreadedBinaryTree (e, L(l), L(r))
)}

function _40(md){return(
md`** Example threaded binary tree **`
)}

function _tbt1(TBT){return(
TBT("a",TBT("b",TBT("d", TBT("g"),TBT("h"))),TBT("c",TBT("e",null,TBT("i")),TBT("f"))).thread()
)}

function _42(tbt1){return(
[...tbt1.inorder()].map(x => x.entry)
)}

function _43(tbt1){return(
tbt1.inorderSuccessor().inorderSuccessor().inorderSuccessor()
)}

function _44(md){return(
md`** Drawing of \`tbt1\` using GraphViz **`
)}

function _45(draw,tbt1){return(
draw(tbt1)
)}

function _46(md){return(
md`<hr>
## Complete Binary Trees (array storage)`
)}

function _CompleteBinaryTree(){return(
class CompleteBinaryTree {
  constructor (array, index = 0) {
    [this.array,this.index] = [array,index];
  }
  get left () {
    return new CompleteBinaryTree (this.array, this.index*2+1)
  }
  get right () {
    return new CompleteBinaryTree (this.array, this.index*2+2)
  }
  get parent () {
    return new CompleteBinaryTree (this.array, ~~((this.index-1)/2))
  }
  get entry () {
    return this.array[this.index]
  }
  set entry (value) { 
    this.array [this.index] = value
  }
  *inOrder () {
    if (this.entry != undefined) {
      yield* this.left.inOrder();
      yield this;
      yield* this.right.inOrder()
    }
  }
}
)}

function _48(md){return(
md`** An example complete binary tree stored in an array **`
)}

function _cbt1(CompleteBinaryTree){return(
new CompleteBinaryTree([0,1,2,3,4,5,6,7])
)}

function _50()
{
  let a = []
  a [100] = 3
  a[0] = undefined
  return a
}


function _51(md){return(
md`** Array with inorder traversal of \`cbt1\` **`
)}

function _52(cbt1){return(
[...cbt1.inOrder()].map(x => x.entry)
)}

function _53(md){return(
md`** Drawing of \`cbt1\` using graphViz **`
)}

function _54(draw,cbt1){return(
draw(cbt1)
)}

function _55(CompleteBinaryTree)
{
  let cbt = new CompleteBinaryTree([0,1,2,3,4,5,6,7]);
  cbt.entry="root";
  cbt.left.entry = "leftSubtree";
  cbt.left.parent.entry="ROOT";
  cbt.left.right.parent.entry = "Left";
  return [...cbt.inOrder()].map(x => x.entry)
}


function _56(md){return(
md`<hr>
## GraphViz Drawing`
)}

function _graphViz(RootedTree,RootedTreeBinary,BinaryTree,ThreadedBinaryTree,CompleteBinaryTree){return(
(tree) => {
  
  if (tree instanceof RootedTree) {
    let result = `digraph{`;
    let traverse = (root, descendants) => {
      if (descendants) {
        for (let d of descendants) { 
          result += root+" -> "+d.data+";";
          if (d.descendants) traverse(d.data,d.descendants);
        }
      }
      else {
        result += root + ";"
      }
    }
    traverse (tree.data,tree.descendants);
    return result + "}"
  }
  
  else if (tree instanceof RootedTreeBinary) {
    let same = [];
    let result = "digraph { node [shape=box] ;\n";
    let count = 0;
    let traverse = (node,level) => {
      result += node.data+";\n";
      if (!same[level]) same[level] = [];
      same[level].push (node.data);
      if (node.firstChild) {
        result += node.data+ " -> " + node.firstChild.data + ";";
        traverse(node.firstChild, level+1);
      }
      else {
        result += 'null'+(++count)+'[shape = none, label=""];\n';
        result += node.data+" -> "+'null'+count+'[arrowhead="tee"];\n';
      }
      while (node.nextSibling) {
        result += node.data + " -> " + node.nextSibling.data + ";\n";
        node = node.nextSibling;
        if (node.firstChild) {
          result += node.data+ " -> " + node.firstChild.data + ";\n";
          traverse(node.firstChild, level+1);
        }
        else {
          result += 'null'+(++count)+'[shape = none, label=""];\n';
          result += node.data+" -> "+'null'+count+'[arrowhead="tee"];\n';
        }
        same[level].push(node.data);
      }
      result += 'null'+(++count)+'[shape = none, label=""];\n';
      result += node.data+" -> "+'null'+count+'[arrowhead="tee"];\n';
      same[level].push('null'+count);
    }
    traverse (tree,0);
    for (let rank of same) {
      result += "{ rank=same ";
      for (let data of rank) result += data + " ";
      result += "};\n";
    }
    return result+"}"
  }
  
  else if (tree instanceof BinaryTree) {
    let result = `digraph{ `; 
    let count = 0;
    let traverse = (node) => {
      if (node.left) {
        result += node.entry+" -> "+node.left.entry+";\n";
        traverse(node.left)
      }
      else {
        result += 'null'+(++count)+'[shape = none, label=""];\n';
        result += node.entry+" -> "+'null'+count+'[arrowhead="tee"];\n';
      }
      if (node.right) {
        result += node.entry+" -> "+node.right.entry+";\n";
        traverse(node.right);
      }
      else {
        result += 'null'+(++count)+'[shape = none, label=""];\n';
        result += node.entry+" -> "+'null'+count+'[arrowhead="tee"];\n';
      }
    }
    traverse (tree);
    return result + "}"
  }
  
  else if (tree instanceof ThreadedBinaryTree) {
    let result = `digraph{ graph [ nodesep="0.5"]; `; 
    let count = 0;
    let traverse = (node) => {
      if (node.left) {
        if (node.left.isThread) {
          result += node.entry+" -> "+node.left.to.entry+"[ style=dashed tailport=sw ];\n";
        } else {
          result += node.entry+" -> "+node.left.to.entry+";\n";
          traverse(node.left.to)
        }
      }
      else {
        result += 'null'+(++count)+'[shape = none, label=""];\n';
        result += node.entry+" -> "+'null'+count+'[ arrowhead="tee"];\n';
      }
      if (node.right) {
        if (node.right.isThread) {
          result += node.entry+" -> "+node.right.to.entry+"[ style=dashed tailport=se ];\n";
        } else {
          result += node.entry+" -> "+node.right.to.entry+";\n";
          traverse(node.right.to)
        }
      }
      else {
        result += 'null'+(++count)+'[shape = none, label=""];\n';
        result += node.entry+" -> "+'null'+count+'[ arrowhead="tee"];\n';
      }
    }
    traverse (tree);
    return result + "}"
  }
  
  else if (tree instanceof CompleteBinaryTree) {
    let result = `digraph{ `; 
    let count = 0;
    let traverse = (node) => {
      if (node.left.entry != undefined) {
        result += node.entry+" -> "+node.left.entry+";\n";
        traverse(node.left)
      }
      else {
        result += 'null'+(++count)+'[shape = none, label=""];\n';
        result += node.entry+" -> "+'null'+count+'[arrowhead="tee"];\n';
      }
      if (node.right.entry != undefined) {
        result += node.entry+" -> "+node.right.entry+";\n";
        traverse(node.right);
      }
      else {
        result += 'null'+(++count)+'[shape = none, label=""];\n';
        result += node.entry+" -> "+'null'+count+'[arrowhead="tee"];\n';
      }
    }
    traverse (tree);
    return result + "}"
  }
}
)}

function _draw(dot,graphViz){return(
(tree) => dot`${graphViz(tree)}`
)}

function _59(md){return(
md`## Libraries`
)}

function _60(md){return(
md`### GraphViz`
)}

function _dot(require){return(
require("@observablehq/graphviz@0.2")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("RootedTree")).define("RootedTree", _RootedTree);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("RT")).define("RT", ["RootedTree"], _RT);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("rt1")).define("rt1", ["RT"], _rt1);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["draw","rt1"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["rt1"], _11);
  main.variable(observer()).define(["rt1"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("RootedTreeBinary")).define("RootedTreeBinary", _RootedTreeBinary);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("RTB")).define("RTB", ["RootedTreeBinary"], _RTB);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("rtb1")).define("rtb1", ["RTB"], _rtb1);
  main.variable(observer()).define(["rt1"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["draw","rtb1"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("BinaryTree")).define("BinaryTree", _BinaryTree);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("BT")).define("BT", ["BinaryTree"], _BT);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("bt1")).define("bt1", ["BT"], _bt1);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["draw","bt1"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["bt1"], _31);
  main.variable(observer()).define(["bt1"], _32);
  main.variable(observer()).define(["bt1"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("Link")).define("Link", _Link);
  main.variable(observer("ThreadedBinaryTree")).define("ThreadedBinaryTree", ["Link"], _ThreadedBinaryTree);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("L")).define("L", ["Link"], _L);
  main.variable(observer("TBT")).define("TBT", ["ThreadedBinaryTree","L"], _TBT);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("tbt1")).define("tbt1", ["TBT"], _tbt1);
  main.variable(observer()).define(["tbt1"], _42);
  main.variable(observer()).define(["tbt1"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["draw","tbt1"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("CompleteBinaryTree")).define("CompleteBinaryTree", _CompleteBinaryTree);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("cbt1")).define("cbt1", ["CompleteBinaryTree"], _cbt1);
  main.variable(observer()).define(_50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["cbt1"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["draw","cbt1"], _54);
  main.variable(observer()).define(["CompleteBinaryTree"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("graphViz")).define("graphViz", ["RootedTree","RootedTreeBinary","BinaryTree","ThreadedBinaryTree","CompleteBinaryTree"], _graphViz);
  main.variable(observer("draw")).define("draw", ["dot","graphViz"], _draw);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("dot")).define("dot", ["require"], _dot);
  return main;
}
