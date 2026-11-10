(async () => {
  const names = ["Rosa Cacuhu","Ruth Adriano Mendes","Santiago Lino Vunge Primeiro","Sara Rodrigues Fialho da Costa","Sérgio Leonardo Vaz","Suzana Augusta de Melo","Teresa Afonso Pinto","Teresa Cholimba Mateus Mulumbila","Teresa de Jesus Ferreira Gonçalves","Teresa José Adelina da Silva Neto","Victor Mário Chicua Kajibanga","Vigílio da Ressurreição Bernardo Adriano Tyova","Virgílio Ferreira de Fontes Pereira","Yolanda Brígida Domingos de Sousa Gaspar","Adalberto Costa Júnior","Adriano Abel Sapinãla","Albertina Navemba Ngolo Felisberto","Alcides Sakala Simões","Alcino Jonas Kuvalela","Álvaro Chikwamanga Daniel","Amélia Judith Ernesto","Américo Carlos Wongo Samoma","Anabela Valentina Sapalalo","Anastácio Rúben Sicato","António Kalandula Bândua","António Saúde Cabina","Apolo Pedro Felino Yakuvela","Ariane Rebeca Lusadisu Nhany","Arlete Leona Chimbinda","Arlindo Luemba Miranda","Armando Manuel Caquepa","Augusto Samuel","Avelino Canjamba José","Celso Eduardo Torres Capingãla","Cicília de Sousa Portalegre de Barros","Clarice Mukinda","Clarisse Matilde Munga Kaputu","Clementina José da Silva","Conceição João Faria Paulo","Custódio Agostinho Kamuango Lopes","David Álvaro","David Kisadila","Domingos Eduardo Palanga","Domingos Oliveira","Eduardo Dumbo Delfino","Ernesto da Costa Kassongo","Estevão Neto Pedro","Esteves António Diavova","Eugénio Antonino Ngolo","Faustino Morais António Manuel","Félix Simão Lucas","Fernanda Lurdes Nguissi","Fernando Domingos Pedro Muanza","Francisco Fernandes","Francisco Gaio Kakoma Antónino"];
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
  return JSON.stringify({batch:2, found:photos.length, missing:missing.length, totalFound:window.__votoaoBatch.photos.length});
})()