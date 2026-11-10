(async () => {
  const names = ["Adão Francisco Correia de Almeida","Adriano Meireles Patrocínio","Aia-Eza Nacília Gomes da Silva Troso","Alcides Severino Mbole Maiacala","Álvaro Manuel de Boavida Neto","Amélia de Jesus Alberto Camunheira Pinto","Amélia Lave Dias Manuel","Américo António Cuononoca","Ana António Maria José","Ana da Purificação Lara de Abreu Pires Delgado","Ana Maria Cordeiro Alves João","Anabela Caiovo Gunga","Anastácio Severino Sambowe","Anilda Mariana Chivucuvucu","António Domingos Pitra Costa Neto","António Rodrigues Afonso Paulo","Arlete da Visitação Francisco e Castro Borges","Armando Capunda","Arsénio Orlando Satyohamba","Bento Joaquim Sebastião Francisco Bento","Bernardete de Lassalete Gourgel da Silva Santana","Carla Maria Leitão Ribeiro de Sousa","Deolinda Tchocondoca Valiangula","Djamila Huguette da Silva de Almeida","Dolina Nassocópia Miguel Tchinhama","Edna Beneque Queximalunga da Costa","Elisa Solanje de Almeida Paxe","Elisandra Mônica Rodrigues Coelho","Elizandra Janete Gourgel Wassuca","Emília Carlota Sebastião Celestino Dias","Emília da Conceição Panjimba Paulo","Emília Cambundo Tchinawalile António Salles Camuhôto","Esperança Luzia Jackson Pembele da Conceição","Esteves Carlos Hilário","Eva Gonçalves da Costa","Felino Job","Felizmina Maria Valentim Lutucuta de Sousa","Fernanda Deolinda Sumbo Guerra","Fernanda Filomena dos Santos","Gilberto Manuel Pereira","Gonçalves Manuel Muandumba","Helena Berta Buca Vando Marciano","Hemingarda João Fernandes","Ilda de Fátima da Silva Almeida Martins","Ireno Nauta Domingos Nambalo","Isolina Teresa Pinto","João António Lineha Muhembo","João de Almeida Azevedo Martins","João José Guerra de Freitas","João Mpilamosi Domingos","João Segunda Ungaji","Joaquim António Carlos dos Reis Júnior","Joaquim Frederico D'Almeida","Joaquim José Miguéis","Job Pedro Castelo Capapinha"];
  function variants(fullName) {
    const base = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[''`]/g,'').replace(/-/g,'_').replace(/\s+/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'');
    const parts = base.split('_');
    const set = new Set();
    set.add(base + '_');
    if (parts.length > 3) set.add(parts.slice(0,-1).join('_') + '_');
    if (parts.length > 4) set.add(parts.slice(0,-2).join('_') + '_');
    set.add(base.replace(/_da_([A-Z])/g, '_da__$1') + '_');
    set.add(base.replace(/_(da|de|do|dos|das)_([A-Z])/g, '_$1__$2') + '_');
    // e Castro / e something
    set.add(base.replace(/_e_/g, '_e_') + '_');
    return [...set];
  }
  const photos = [];
  const missing = [];
  for (const name of names) {
    let found = null;
    for (const s of variants(name)) {
      try {
        const json = await (await fetch('https://portaladmin.parlamento.ao/api/info/' + encodeURIComponent(s))).json();
        const img = json?.data?.entity?.imgCapa;
        if (img) {
          found = {
            fullName: name,
            entitySlug: s,
            photoUrl: 'https://portaladmin.parlamento.ao/storage/' + String(img).replace(/^\/+/, ''),
            apiName: json.data.entity.keyMenu || null
          };
          break;
        }
      } catch (e) {}
    }
    if (found) photos.push(found); else missing.push(name);
  }
  window.__votoaoBatch = window.__votoaoBatch || {photos:[], missing:[]};
  window.__votoaoBatch.photos.push(...photos);
  window.__votoaoBatch.missing.push(...missing);
  return JSON.stringify({batch:0, found:photos.length, missing:missing.length, totalFound:window.__votoaoBatch.photos.length});
})()