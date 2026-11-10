(async () => {
  const list = [{"fullName": "Ol\u00edvio Fortunato Esperan\u00e7a Quilumbo", "slug": "olivio-fortunato-esperanca-quilumbo"}, {"fullName": "Pedro Francisco Tanda", "slug": "pedro-francisco-tanda"}, {"fullName": "Peregrino Isidro Wambu Chindondo", "slug": "peregrino-isidro-wambu-chindondo"}, {"fullName": "Piedoso Chipindo Bonga", "slug": "piedoso-chipindo-bonga"}, {"fullName": "Rafael Massanga Sakaita Savimbi", "slug": "rafael-massanga-sakaita-savimbi"}, {"fullName": "Rita Mateus J\u00fanior", "slug": "rita-mateus-junior"}, {"fullName": "Rodrigues Manuel Tandala", "slug": "rodrigues-manuel-tandala"}, {"fullName": "Sandra Teresa Numanawa Kakunda Henriques", "slug": "sandra-teresa-numanawa-kakunda-henriques"}, {"fullName": "Sa\u00fade Victorino Luenheca Txizau", "slug": "saude-victorino-luenheca-txizau"}, {"fullName": "Sofia Porf\u00edrio Kasungu Mussonguela", "slug": "sofia-porfirio-kasungu-mussonguela"}, {"fullName": "Silvestre Gabriel Samy", "slug": "silvestre-gabriel-samy"}, {"fullName": "Sim\u00e3o Albino Ant\u00f3nio Dembo", "slug": "simao-albino-antonio-dembo"}, {"fullName": "Vasco Manuel Sangongo", "slug": "vasco-manuel-sangongo"}, {"fullName": "Virg\u00edlio Pedro Samussongo", "slug": "virgilio-pedro-samussongo"}, {"fullName": "Benedito Daniel", "slug": "benedito-daniel"}, {"fullName": "Rui Malopa Miguel", "slug": "rui-malopa-miguel"}, {"fullName": "Benjamim Manuel da Silva", "slug": "benjamim-manuel-da-silva"}, {"fullName": "Nimi A simbi", "slug": "nimi-a-simbi"}, {"fullName": "Fernando Hombo Dinis", "slug": "fernando-hombo-dinis"}, {"fullName": "Florbela Catarina Malaquias", "slug": "florbela-catarina-malaquias"}];
  const photos = [];
  const missing = [];
  for (const d of list) {
    try {
      const res = await fetch('https://pollsafrica.com/countries/angola/members/' + d.slug);
      const html = await res.text();
      const m = html.match(/https:\/\/www\.parlamento\.ao\/[^"'\\s>]+\.(?:png|jpe?g|webp)/i);
      if (m) photos.push({ fullName: d.fullName, photoUrl: m[0], source: 'parlamento.ao', slug: d.slug });
      else missing.push(d.fullName);
    } catch (e) { missing.push(d.fullName); }
  }
  window.__votoaoBatch = window.__votoaoBatch || { photos: [], missing: [] };
  window.__votoaoBatch.photos.push(...photos);
  window.__votoaoBatch.missing.push(...missing);
  return JSON.stringify({ found: photos.length, missing: missing.length, totalSoFar: window.__votoaoBatch.photos.length });
})()