(async () => {
  function norm(s){
    return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  }
  function variants(fullName){
    const base = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[''`]/g,'').replace(/-/g,'_').replace(/\s+/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'');
    const parts = base.split('_').filter(Boolean);
    const set = new Set();
    const add = (s) => { if (s && s.length>3) set.add(s.endsWith('_')?s:s+'_'); };
    add(base);
    // double underscore particles
    add(base.replace(/_(da|de|do|dos|das|e)_([A-Z])/g, '_$1__$2'));
    // capitalize particles
    add(base.replace(/_(da|de|do|dos|das)_/g, (_,p)=>'_'+p[0].toUpperCase()+p.slice(1)+'_'));
    // drop trailing tokens
    for (let drop=1; drop<=3 && parts.length-drop>=2; drop++) add(parts.slice(0,-drop).join('_'));
    // first + last
    if (parts.length>=2) add(parts[0]+'_'+parts[parts.length-1]);
    // first two + last
    if (parts.length>=3) add(parts[0]+'_'+parts[1]+'_'+parts[parts.length-1]);
    return [...set];
  }
  async function fetchEntity(slug){
    for (let attempt=0; attempt<2; attempt++){
      try {
        const j = await (await fetch('https://portaladmin.parlamento.ao/api/info/'+slug)).json();
        const e = j?.data?.entity;
        if (e?.imgCapa) {
          return {
            apiName: e.keyMenu || e.title || null,
            entitySlug: e.object_iuu || slug,
            photoUrl: 'https://portaladmin.parlamento.ao/storage/' + String(e.imgCapa).replace(/^\/+/, ''),
            id: e.id
          };
        }
      } catch(err) {}
      await new Promise(r=>setTimeout(r, 80));
    }
    return null;
  }

  // catalogs
  const catalogs = [];
  for (const key of ['PerfilGMP','V_legislatura','V_Legislatura']) {
    try {
      const j = await (await fetch('https://portaladmin.parlamento.ao/api/info/'+key)).json();
      if (Array.isArray(j.data)) catalogs.push(...j.data);
    } catch(e){}
  }
  const catalogByNorm = new Map();
  for (const e of catalogs) {
    const name = e.keyMenu || e.title;
    if (!name || !e.imgCapa) continue;
    const photo = {
      fullName: name,
      entitySlug: e.object_iuu,
      photoUrl: 'https://portaladmin.parlamento.ao/storage/' + String(e.imgCapa).replace(/^\/+/, ''),
      id: e.id,
      source: 'catalog'
    };
    catalogByNorm.set(norm(name), photo);
    // also index by first+last
    const toks = norm(name).split(' ');
    if (toks.length>=2) catalogByNorm.set(toks[0]+' '+toks[toks.length-1], photo);
  }

  const seedNames = ["Adão Francisco Correia de Almeida","Adriano Meireles Patrocínio","Aia-Eza Nacília Gomes da Silva Troso","Alcides Severino Mbole Maiacala","Álvaro Manuel de Boavida Neto","Amélia de Jesus Alberto Camunheira Pinto","Amélia Lave Dias Manuel","Américo António Cuononoca","Ana António Maria José","Ana da Purificação Lara de Abreu Pires Delgado","Ana Maria Cordeiro Alves João","Anabela Caiovo Gunga","Anastácio Severino Sambowe","Anilda Mariana Chivucuvucu","António Domingos Pitra Costa Neto","António Rodrigues Afonso Paulo","Arlete da Visitação Francisco e Castro Borges","Armando Capunda","Arsénio Orlando Satyohamba","Bento Joaquim Sebastião Francisco Bento","Bernardete de Lassalete Gourgel da Silva Santana","Carla Maria Leitão Ribeiro de Sousa","Deolinda Tchocondoca Valiangula","Djamila Huguette da Silva de Almeida","Dolina Nassocópia Miguel Tchinhama","Edna Beneque Queximalunga da Costa","Elisa Solanje de Almeida Paxe","Elisandra Mônica Rodrigues Coelho","Elizandra Janete Gourgel Wassuca","Emília Carlota Sebastião Celestino Dias","Emília da Conceição Panjimba Paulo","Emília Cambundo Tchinawalile António Salles Camuhôto","Esperança Luzia Jackson Pembele da Conceição","Esteves Carlos Hilário","Eva Gonçalves da Costa","Felino Job","Felizmina Maria Valentim Lutucuta de Sousa","Fernanda Deolinda Sumbo Guerra","Fernanda Filomena dos Santos","Gilberto Manuel Pereira","Gonçalves Manuel Muandumba","Helena Berta Buca Vando Marciano","Hemingarda João Fernandes","Ilda de Fátima da Silva Almeida Martins","Ireno Nauta Domingos Nambalo","Isolina Teresa Pinto","João António Lineha Muhembo","João de Almeida Azevedo Martins","João José Guerra de Freitas","João Mpilamosi Domingos","João Segunda Ungaji","Joaquim António Carlos dos Reis Júnior","Joaquim Frederico D'Almeida","Joaquim José Miguéis","Job Pedro Castelo Capapinha","Jorge Inocêncio Dombolo","Jorge Ribeiro Uefu","José António Lopes Semedo","José Artur Carmo Manuel","José Miúdo Ndambuca","Julieta Carlos Baptista Vicente","Kilamba Kiuyma Sebastião Van-Dúnem","Leonor da Silva Ferreira Garibaldi de Lima e Cruz","Lizete da Conceição Manuel Gonga","Lotti Nolika","Lúcia Yoleni Sincopela","Luciana Mona Cachiangui","Luís Filipe da Fonseca Sottomayor Pizarro","Luisa da Conceição António Bunga Liunda","Luísa Pedro Francisco Damião Santos","Luzia Pereira de Sousa Inglês Van-Dúnem","Manuel Franessa","Manuel Lopes Moniz Dembo","Mara Regina da Silva Baptista Domingos Quiosa","Maria Ângela Teixeira de Alva Sequeira Bragança","Maria Antonieta Josefina Sabina Baptista","Maria Carolina Manuel Fiel Maria Fortes","Maria da Conceição Mendonça Caldeira de Palma","Maria de Lourdes Roque Caposso Fernandes","Maria Esperança Pires dos Santos","Maria Fonseca","Maria Idalina de Oliveira Valente","Maria Odete Sanches Tavares","Maria Rosa Antónina Gilberta Tyipinge Escovalo","Maria Salomé Taveya","Maricel Marinho da Silva Capama","Mário Pinto de Andrade","Mbamby Keane Victória dos Santos","Milonga Manuel Bernardo","Nádia Agostinho Borges da Conceição Monteiro","Nani Ascenção dos Santos Vontade","Narciso Damásio dos Santos Benedito","Nary Cajica Manuel Aguiar","Nazaré dos Anjos Mendes","Nazário Pedro Vilhena Bomba Vilhena","Norberto Fernandes dos Santos","Nvunda Benvindo das Neves Salucombo","Osvaldo António José Caculo","Paciência Amélia Albertina Caxita Secuma","Paula Cristina Inácio Contreiras","Paula Regina Simões de Oliveira","Paulo Horácio de Sequeira e Carvalho","Paulo Pombolo","Pedro Agostinho de Neri","Pedro de Morais Neto","Pedro Makita Armando Júlia","Pedro Sebastião","Raúl Augusto Lima","Ricardina Inocência dos Santos Chilombo","Rosa Branca da Cunha Cardoso Albino","Rosa Cacuhu","Ruth Adriano Mendes","Santiago Lino Vunge Primeiro","Sara Rodrigues Fialho da Costa","Sérgio Leonardo Vaz","Suzana Augusta de Melo","Teresa Afonso Pinto","Teresa Cholimba Mateus Mulumbila","Teresa de Jesus Ferreira Gonçalves","Teresa José Adelina da Silva Neto","Victor Mário Chicua Kajibanga","Vigílio da Ressurreição Bernardo Adriano Tyova","Virgílio Ferreira de Fontes Pereira","Yolanda Brígida Domingos de Sousa Gaspar","Adalberto Costa Júnior","Adriano Abel Sapinãla","Albertina Navemba Ngolo Felisberto","Alcides Sakala Simões","Alcino Jonas Kuvalela","Álvaro Chikwamanga Daniel","Amélia Judith Ernesto","Américo Carlos Wongo Samoma","Anabela Valentina Sapalalo","Anastácio Rúben Sicato","António Kalandula Bândua","António Saúde Cabina","Apolo Pedro Felino Yakuvela","Ariane Rebeca Lusadisu Nhany","Arlete Leona Chimbinda","Arlindo Luemba Miranda","Armando Manuel Caquepa","Augusto Samuel","Avelino Canjamba José","Celso Eduardo Torres Capingãla","Cicília de Sousa Portalegre de Barros","Clarice Mukinda","Clarisse Matilde Munga Kaputu","Clementina José da Silva","Conceição João Faria Paulo","Custódio Agostinho Kamuango Lopes","David Álvaro","David Kisadila","Domingos Eduardo Palanga","Domingos Oliveira","Eduardo Dumbo Delfino","Ernesto da Costa Kassongo","Estevão Neto Pedro","Esteves António Diavova","Eugénio Antonino Ngolo","Faustino Morais António Manuel","Félix Simão Lucas","Fernanda Lurdes Nguissi","Fernando Domingos Pedro Muanza","Francisco Fernandes","Francisco Gaio Kakoma Antónino","Francisco Vicente Gimarães Ferreira Viana","Franco Meneses Marcolino Nhani","Gervásio Nombo Zau","Helena Bonguela Abel","Irina de Almeida Santos Diniz Ferreira","Januário Alfredo Mussambo","Jeremias Ernesto Barbosa Mahula","Jeremias Kaunda Abílio","João Baptista Vindes","João Kanda Bernardo","João Manuel","João Miguel Vahekeni","João Muzaza Caweza","Joaquim Nafoia","Joel Armando Kafuka Pacheco","Jorge Martins da Cruz","Jorge Vitorino","José do Gringo Júnior Lembe","Justino Feltro da Costa Pinto de Andrade","Lázaro de Oliveira Guelson Kakunha","Liberty Marlin Dircéu Samuel Chiaca","Lourenço Alberto Chungo Lumingo","Luís Fernandes do Nascimento","Manuel Armando da Costa Ekuikui","Manuel Domingos da Fonseca","Manuel Mbalu","Manuel Sampaio Mucanda","Marcial Adriano Dachala","Mardanês Agostinho Calunga","Maria do Espírito Santo da Silva Monteiro","Maria Emília da Silva Inácio","Maurílio Luciano Sabino Luiele","Mihaela Ezsébet Neto Webba Kopumi","Moniz Alfredo","Nuno Álvaro Dala","Olívio Fortunato Esperança Quilumbo","Pedro Francisco Tanda","Peregrino Isidro Wambu Chindondo","Piedoso Chipindo Bonga","Rafael Massanga Sakaita Savimbi","Rita Mateus Júnior","Rodrigues Manuel Tandala","Sandra Teresa Numanawa Kakunda Henriques","Saúde Victorino Luenheca Txizau","Sofia Porfírio Kasungu Mussonguela","Silvestre Gabriel Samy","Simão Albino António Dembo","Vasco Manuel Sangongo","Virgílio Pedro Samussongo","Benedito Daniel","Rui Malopa Miguel","Benjamim Manuel da Silva","Nimi A simbi","Fernando Hombo Dinis","Florbela Catarina Malaquias"];
  const photos = [];
  const missing = [];
  for (let i=0; i<seedNames.length; i++){
    const name = seedNames[i];
    const n = norm(name);
    const toks = n.split(' ');
    let found = catalogByNorm.get(n) || (toks.length>=2 ? catalogByNorm.get(toks[0]+' '+toks[toks.length-1]) : null);
    // fuzzy: catalog name contained / contains
    if (!found) {
      for (const [k,p] of catalogByNorm) {
        if (k.includes(n) || n.includes(k)) { found = p; break; }
        const kt = k.split(' ');
        if (kt[0]===toks[0] && kt[kt.length-1]===toks[toks.length-1]) { found = p; break; }
      }
    }
    if (found) {
      photos.push({ fullName: name, matchedApiName: found.fullName, entitySlug: found.entitySlug, photoUrl: found.photoUrl, source: found.source||'catalog' });
      continue;
    }
    let hit = null;
    for (const s of variants(name)) {
      hit = await fetchEntity(s);
      if (hit) break;
    }
    if (hit) photos.push({ fullName: name, matchedApiName: hit.apiName, entitySlug: hit.entitySlug, photoUrl: hit.photoUrl, source: 'slug' });
    else missing.push(name);
    if ((i+1)%25===0) console.log('progress', i+1, photos.length, missing.length);
  }
  window.__votoaoAllPhotos = { fetchedAt: new Date().toISOString(), photos, missing };
  return JSON.stringify({ found: photos.length, missing: missing.length, missingSample: missing.slice(0,30) });
})()