class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const animais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"],
    };

    const b1 = brinquedosPessoa1.split(",");
    const b2 = brinquedosPessoa2.split(",");
    const ordem = ordemAnimais.split(",");

    function verificaOrdemBrinquedos(listaPessoa, listaAnimal) {
      let i = 0;
      for (const item of listaPessoa) {
        if (item === listaAnimal[i]) {
          i++;
        }
        if (i === listaAnimal.length) {
          return true;
        }
      }
      return false;
    }

    function temTodosBrinquedos(listaPessoa, listaAnimal) {

      for (let i = 0; i < listaAnimal.length; i++) {
        if (!listaPessoa.includes(listaAnimal[i])) {
          return false;
        }
      }

      return true; 
    }


    let adotados1 = 0;
    let adotados2 = 0;
    let gatosAdotados1 = 0;
    let gatosAdotados2 = 0;
    let lista = [];

    for (const nome of ordem) {
      const brinquedos = animais[nome];

      if (!brinquedos) {
        return { erro: "Animal inválido" };
      }

      let pessoa1PodeAdotar = false;
      let pessoa2PodeAdotar = false;
      let tipoGato = false;

      if (nome === "Mimi" || nome === "Fofo" || nome === "Zero") {
        tipoGato = true;
        pessoa1PodeAdotar = verificaOrdemBrinquedos(b1, brinquedos) && gatosAdotados1 < 1 ? true : false;
        pessoa2PodeAdotar = verificaOrdemBrinquedos(b2, brinquedos) && gatosAdotados2 < 1 ? true : false;
      }
      else if (nome === "Loco") {
        pessoa1PodeAdotar = temTodosBrinquedos(b1, brinquedos) && adotados1 > 0 ? true : false;
        pessoa2PodeAdotar = temTodosBrinquedos(b2, brinquedos) && adotados2 > 0 ? true : false;

      } 
      else {
        pessoa1PodeAdotar = verificaOrdemBrinquedos(b1, brinquedos) ? true : false;
        pessoa2PodeAdotar = verificaOrdemBrinquedos(b2, brinquedos) ? true : false;
      }

      let destino = "abrigo";
      if (pessoa1PodeAdotar && pessoa2PodeAdotar){
        destino = "abrigo";
      } 
      else if (pessoa1PodeAdotar && adotados1 < 3) { 
        destino = "pessoa 1"; adotados1++;
        if (tipoGato) {gatosAdotados1++;}
      }
      else if (pessoa2PodeAdotar && adotados2 < 3) { 
        destino = "pessoa 2"; adotados2++;
        if (tipoGato) {gatosAdotados2++;}
      }
      
      lista.push(nome + " - " + destino);
    }

    return { lista: lista.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
