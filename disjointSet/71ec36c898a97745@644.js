function _1(md){return(
md`# Disjoint Set`
)}

function _2(md){return(
md`# Disjoint Set`
)}

function _DisjointSet(){return(
class DisjointSet {

  constructor () {
    this.arrayVisualizacao = [];
  }

  
  //cria um novo conjunto com o objeto X, que não pertence a nenhum outro conjunto
  //rep é o identificador único de cada set, que é uma referencia à um objeto do set
  //como os sets sao disjoints, dessa forma a ID sempre sera unica para cada set
  //element.size indica quantos elementos tem aquele como seu rep
  makeSet(element){
    this.arrayVisualizacao.push(element);
    element.rep = element;
    element.size = 1;
  }
  

  //retorna o identificador único para o conjunto do objeto X
  //enquanto nao encontra, atualiza os reps dos objetos pelos quais vai passando
  //caso o elemento nao esteja em nenhum set, retorna null
  find(element){  
    try{
      if(element != element.rep){
        element.rep =  this.find(element.rep);
      }
      return element.rep
    }
    catch(error){
      return null
    }
  }

  
  //combina os conjuntos dos objetos A e B
  //a combinacao é tal que o conjunto menor é "adicionado" ao conjunto maior
  //só atualiza ativamente o representante (identificador unico) do representante do conjunto menor
  //os demais elementos continuaram apontando para seu representante anterior 
  //(a nao ser que em algum momento sejam atualizados no find)
  //o representante anterior apontara para o novo representante
  //retorna null caso um dos objetos nao pertença a nenhum conjunto
  union(elementA,elementB){
    let smaller = this.find(elementA);
    let larger = this.find(elementB);
    
    if(!null){
      return null
    }
    else if(smaller == larger){
      return false
    }
    else if(smaller.size > larger.size){
      let aux = smaller;
      smaller = larger;
      larger = aux;
    }
    smaller.rep = larger;
    larger.size += smaller.size;
    return true
  }
    
}
)}

function _4(md){return(
md`## Demo`
)}

function _refresh(html){return(
html`<button>Refresh</button>`
)}

function _6(refresh,DisjointSet)
{
  refresh;
  let d = new DisjointSet;
  const elem1 = {objeto: 'elem1'};
  const elem2 = {objeto: 'elem2'};
  const elem3 = {objeto: 'elem3'};
  const elem4 = {nome: 'elem4'};
  const elem5 = {nome: 'elem5'};
  d.makeSet(elem1);
  d.makeSet(elem2);
  d.makeSet(elem3);
  d.makeSet(elem4);
  return d
}


function _7(refresh,DisjointSet)
{
  refresh;
  let d = new DisjointSet;
  const elem1 = {objeto: 'elem1'};
  const elem2 = {objeto: 'elem2'};
  const elem3 = {objeto: 'elem3'};
  const elem4 = {nome: 'elem4'};
  const elem5 = {nome: 'elem5'};
  d.makeSet(elem1);
  d.makeSet(elem2);
  d.makeSet(elem3);
  d.makeSet(elem4);
  let find1 = d.find(elem1);
  return find1
}


function _8(refresh,DisjointSet)
{
  refresh;
  let d = new DisjointSet;
  const elem1 = {objeto: 'elem1'};
  const elem2 = {objeto: 'elem2'};
  const elem3 = {objeto: 'elem3'};
  const elem4 = {nome: 'elem4'};
  const elem5 = {nome: 'elem5'};
  d.makeSet(elem1);
  d.makeSet(elem2);
  d.makeSet(elem3);
  d.makeSet(elem4);
  let find5 = d.find(elem5);
  return find5
}


function _9(refresh,DisjointSet)
{
  refresh;
  let d = new DisjointSet;
  const elem1 = {objeto: 'elem1'};
  const elem2 = {objeto: 'elem2'};
  const elem3 = {objeto: 'elem3'};
  const elem4 = {nome: 'elem4'};
  const elem5 = {nome: 'elem5'};
  d.makeSet(elem1);
  d.makeSet(elem2);
  d.makeSet(elem3);
  d.makeSet(elem4);
  d.union(elem1,elem2);
  d.union(elem1,elem4);
  return d
}


function _10(refresh,DisjointSet)
{
  refresh;
  let d = new DisjointSet;
  const elem1 = {objeto: 'elem1'};
  const elem2 = {objeto: 'elem2'};
  const elem3 = {objeto: 'elem3'};
  const elem4 = {nome: 'elem4'};
  const elem5 = {nome: 'elem5'};
  d.makeSet(elem1);
  d.makeSet(elem2);
  d.makeSet(elem3);
  d.makeSet(elem4);
  let uniao = d.union(elem1, elem5);
  return uniao
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("DisjointSet")).define("DisjointSet", _DisjointSet);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof refresh")).define("viewof refresh", ["html"], _refresh);
  main.variable(observer("refresh")).define("refresh", ["Generators", "viewof refresh"], (G, _) => G.input(_));
  main.variable(observer()).define(["refresh","DisjointSet"], _6);
  main.variable(observer()).define(["refresh","DisjointSet"], _7);
  main.variable(observer()).define(["refresh","DisjointSet"], _8);
  main.variable(observer()).define(["refresh","DisjointSet"], _9);
  main.variable(observer()).define(["refresh","DisjointSet"], _10);
  return main;
}
