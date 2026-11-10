(async () => {
  const names = ["Jorge Inocêncio Dombolo","Jorge Ribeiro Uefu","José António Lopes Semedo","José Artur Carmo Manuel","José Miúdo Ndambuca","Julieta Carlos Baptista Vicente","Kilamba Kiuyma Sebastião Van-Dúnem","Leonor da Silva Ferreira Garibaldi de Lima e Cruz","Lizete da Conceição Manuel Gonga","Lotti Nolika","Lúcia Yoleni Sincopela","Luciana Mona Cachiangui","Luís Filipe da Fonseca Sottomayor Pizarro","Luisa da Conceição António Bunga Liunda","Luísa Pedro Francisco Damião Santos","Luzia Pereira de Sousa Inglês Van-Dúnem","Manuel Franessa","Manuel Lopes Moniz Dembo","Mara Regina da Silva Baptista Domingos Quiosa","Maria Ângela Teixeira de Alva Sequeira Bragança","Maria Antonieta Josefina Sabina Baptista","Maria Carolina Manuel Fiel Maria Fortes","Maria da Conceição Mendonça Caldeira de Palma","Maria de Lourdes Roque Caposso Fernandes","Maria Esperança Pires dos Santos","Maria Fonseca","Maria Idalina de Oliveira Valente","Maria Odete Sanches Tavares","Maria Rosa Antónina Gilberta Tyipinge Escovalo","Maria Salomé Taveya","Maricel Marinho da Silva Capama","Mário Pinto de Andrade","Mbamby Keane Victória dos Santos","Milonga Manuel Bernardo","Nádia Agostinho Borges da Conceição Monteiro","Nani Ascenção dos Santos Vontade","Narciso Damásio dos Santos Benedito","Nary Cajica Manuel Aguiar","Nazaré dos Anjos Mendes","Nazário Pedro Vilhena Bomba Vilhena","Norberto Fernandes dos Santos","Nvunda Benvindo das Neves Salucombo","Osvaldo António José Caculo","Paciência Amélia Albertina Caxita Secuma","Paula Cristina Inácio Contreiras","Paula Regina Simões de Oliveira","Paulo Horácio de Sequeira e Carvalho","Paulo Pombolo","Pedro Agostinho de Neri","Pedro de Morais Neto","Pedro Makita Armando Júlia","Pedro Sebastião","Raúl Augusto Lima","Ricardina Inocência dos Santos Chilombo","Rosa Branca da Cunha Cardoso Albino"];
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
  return JSON.stringify({batch:1, found:photos.length, missing:missing.length, totalFound:window.__votoaoBatch.photos.length});
})()