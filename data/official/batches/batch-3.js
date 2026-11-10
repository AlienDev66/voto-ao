(async () => {
  const names = ["Francisco Vicente Gimarães Ferreira Viana","Franco Meneses Marcolino Nhani","Gervásio Nombo Zau","Helena Bonguela Abel","Irina de Almeida Santos Diniz Ferreira","Januário Alfredo Mussambo","Jeremias Ernesto Barbosa Mahula","Jeremias Kaunda Abílio","João Baptista Vindes","João Kanda Bernardo","João Manuel","João Miguel Vahekeni","João Muzaza Caweza","Joaquim Nafoia","Joel Armando Kafuka Pacheco","Jorge Martins da Cruz","Jorge Vitorino","José do Gringo Júnior Lembe","Justino Feltro da Costa Pinto de Andrade","Lázaro de Oliveira Guelson Kakunha","Liberty Marlin Dircéu Samuel Chiaca","Lourenço Alberto Chungo Lumingo","Luís Fernandes do Nascimento","Manuel Armando da Costa Ekuikui","Manuel Domingos da Fonseca","Manuel Mbalu","Manuel Sampaio Mucanda","Marcial Adriano Dachala","Mardanês Agostinho Calunga","Maria do Espírito Santo da Silva Monteiro","Maria Emília da Silva Inácio","Maurílio Luciano Sabino Luiele","Mihaela Ezsébet Neto Webba Kopumi","Moniz Alfredo","Nuno Álvaro Dala","Olívio Fortunato Esperança Quilumbo","Pedro Francisco Tanda","Peregrino Isidro Wambu Chindondo","Piedoso Chipindo Bonga","Rafael Massanga Sakaita Savimbi","Rita Mateus Júnior","Rodrigues Manuel Tandala","Sandra Teresa Numanawa Kakunda Henriques","Saúde Victorino Luenheca Txizau","Sofia Porfírio Kasungu Mussonguela","Silvestre Gabriel Samy","Simão Albino António Dembo","Vasco Manuel Sangongo","Virgílio Pedro Samussongo","Benedito Daniel","Rui Malopa Miguel","Benjamim Manuel da Silva","Nimi A simbi","Fernando Hombo Dinis","Florbela Catarina Malaquias"];
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
  return JSON.stringify({batch:3, found:photos.length, missing:missing.length, totalFound:window.__votoaoBatch.photos.length});
})()