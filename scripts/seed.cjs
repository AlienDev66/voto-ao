"use strict";

// prisma/seed.ts
var import_client = require("@prisma/client");

// data/seed/deputies.ts
var PARTIES = [
  {
    "slug": "mpla",
    "name": "MPLA",
    "fullName": "Movimento Popular de Liberta\xE7\xE3o de Angola",
    "seats": 124,
    "color": "#E30613",
    "kind": "grupo",
    "sortOrder": 1,
    "logoUrl": "/parties/mpla.png"
  },
  {
    "slug": "unita",
    "name": "UNITA",
    "fullName": "Uni\xE3o Nacional para a Independ\xEAncia Total de Angola",
    "seats": 90,
    "color": "#009A44",
    "kind": "grupo",
    "sortOrder": 2,
    "logoUrl": "/parties/unita.png"
  },
  {
    "slug": "prs",
    "name": "PRS",
    "fullName": "Partido de Renova\xE7\xE3o Social",
    "seats": 2,
    "color": "#F5A623",
    "kind": "representacao",
    "sortOrder": 3,
    "logoUrl": "/parties/prs.png"
  },
  {
    "slug": "fnla",
    "name": "FNLA",
    "fullName": "Frente Nacional de Liberta\xE7\xE3o de Angola",
    "seats": 2,
    "color": "#1B4F9C",
    "kind": "representacao",
    "sortOrder": 4,
    "logoUrl": "/parties/fnla.png"
  },
  {
    "slug": "pha",
    "name": "PHA",
    "fullName": "Partido Humanista de Angola",
    "seats": 2,
    "color": "#7B2D8E",
    "kind": "representacao",
    "sortOrder": 5,
    "logoUrl": "/parties/pha.png"
  }
];
var DEPUTIES = [
  { fullName: "Ad\xE3o Francisco Correia de Almeida", partySlug: "mpla", electoralCircle: "Nacional", mesaRole: "Presidente da Assembleia Nacional", photoUrl: "https://www.parlamento.ao/Adao_Francisco_Correia_de_Almeida/img/2etaREp5rwxxrojlwK4ueQoSb4muCAqe3jbzwPxG.png" },
  { fullName: "Adriano Meireles Patroc\xEDnio", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Aia-Eza Nac\xEDlia Gomes da Silva Troso", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Alcides Severino Mbole Maiacala", partySlug: "mpla", electoralCircle: "U\xEDge" },
  { fullName: "\xC1lvaro Manuel de Boavida Neto", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Am\xE9lia de Jesus Alberto Camunheira Pinto", partySlug: "mpla", electoralCircle: "Namibe", gender: "F" },
  { fullName: "Am\xE9lia Lave Dias Manuel", partySlug: "mpla", electoralCircle: "Cuando Cubango", gender: "F" },
  { fullName: "Am\xE9rico Ant\xF3nio Cuononoca", partySlug: "mpla", electoralCircle: "Nacional", mesaRole: "1.\xBA Vice-Presidente da Assembleia Nacional", photoUrl: "https://www.parlamento.ao/Americo_Antonio_Cuononoca/img/XvPvavaes7ZdrlQKVANzLtwlCnmsFdXzmnm9PUaU.png" },
  { fullName: "Ana Ant\xF3nio Maria Jos\xE9", partySlug: "mpla", electoralCircle: "Malanje", gender: "F" },
  { fullName: "Ana da Purifica\xE7\xE3o Lara de Abreu Pires Delgado", partySlug: "mpla", electoralCircle: "Malanje", gender: "F" },
  { fullName: "Ana Maria Cordeiro Alves Jo\xE3o", partySlug: "mpla", electoralCircle: "Luanda", gender: "F" },
  { fullName: "Anabela Caiovo Gunga", partySlug: "mpla", electoralCircle: "Bi\xE9", gender: "F" },
  { fullName: "Anast\xE1cio Severino Sambowe", partySlug: "mpla", electoralCircle: "Bi\xE9" },
  { fullName: "Anilda Mariana Chivucuvucu", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Ant\xF3nio Domingos Pitra Costa Neto", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Ant\xF3nio Rodrigues Afonso Paulo", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Arlete da Visita\xE7\xE3o Francisco e Castro Borges", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Armando Capunda", partySlug: "mpla", electoralCircle: "Huambo" },
  { fullName: "Ars\xE9nio Orlando Satyohamba", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Bento Joaquim Sebasti\xE3o Francisco Bento", partySlug: "mpla", electoralCircle: "Luanda" },
  { fullName: "Bernardete de Lassalete Gourgel da Silva Santana", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Carla Maria Leit\xE3o Ribeiro de Sousa", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Deolinda Tchocondoca Valiangula", partySlug: "mpla", electoralCircle: "Benguela", gender: "F" },
  { fullName: "Djamila Huguette da Silva de Almeida", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Dolina Nassoc\xF3pia Miguel Tchinhama", partySlug: "mpla", electoralCircle: "Huambo", gender: "F" },
  { fullName: "Edna Beneque Queximalunga da Costa", partySlug: "mpla", electoralCircle: "Lunda-Norte", gender: "F" },
  { fullName: "Elisa Solanje de Almeida Paxe", partySlug: "mpla", electoralCircle: "Lunda-Norte", gender: "F" },
  { fullName: "Elisandra M\xF4nica Rodrigues Coelho", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Elizandra Janete Gourgel Wassuca", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Em\xEDlia Carlota Sebasti\xE3o Celestino Dias", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Em\xEDlia da Concei\xE7\xE3o Panjimba Paulo", partySlug: "mpla", electoralCircle: "Bi\xE9", gender: "F" },
  { fullName: "Em\xEDlia Cambundo Tchinawalile Ant\xF3nio Salles Camuh\xF4to", partySlug: "mpla", electoralCircle: "Cuanza-Sul" },
  { fullName: "Esperan\xE7a Luzia Jackson Pembele da Concei\xE7\xE3o", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Esteves Carlos Hil\xE1rio", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Eva Gon\xE7alves da Costa", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Felino Job", partySlug: "mpla", electoralCircle: "Moxico" },
  { fullName: "Felizmina Maria Valentim Lutucuta de Sousa", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Fernanda Deolinda Sumbo Guerra", partySlug: "mpla", electoralCircle: "Zaire", gender: "F" },
  { fullName: "Fernanda Filomena dos Santos", partySlug: "mpla", electoralCircle: "Hu\xEDla", gender: "F" },
  { fullName: "Gilberto Manuel Pereira", partySlug: "mpla", electoralCircle: "Cuanza-Sul" },
  { fullName: "Gon\xE7alves Manuel Muandumba", partySlug: "mpla", electoralCircle: "Moxico" },
  { fullName: "Helena Berta Buca Vando Marciano", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Hemingarda Jo\xE3o Fernandes", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Ilda de F\xE1tima da Silva Almeida Martins", partySlug: "mpla", electoralCircle: "Hu\xEDla", gender: "F" },
  { fullName: "Ireno Nauta Domingos Nambalo", partySlug: "mpla", electoralCircle: "Cunene" },
  { fullName: "Isolina Teresa Pinto", partySlug: "mpla", electoralCircle: "Moxico", gender: "F" },
  { fullName: "Jo\xE3o Ant\xF3nio Lineha Muhembo", partySlug: "mpla", electoralCircle: "Cuando Cubango" },
  { fullName: "Jo\xE3o de Almeida Azevedo Martins", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Jo\xE3o Jos\xE9 Guerra de Freitas", partySlug: "mpla", electoralCircle: "Namibe" },
  { fullName: "Jo\xE3o Mpilamosi Domingos", partySlug: "mpla", electoralCircle: "Bengo" },
  { fullName: "Jo\xE3o Segunda Ungaji", partySlug: "mpla", electoralCircle: "Lunda-Sul" },
  { fullName: "Joaquim Ant\xF3nio Carlos dos Reis J\xFAnior", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Joaquim Frederico D'Almeida", partySlug: "mpla", electoralCircle: "Benguela" },
  { fullName: "Joaquim Jos\xE9 Migu\xE9is", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Job Pedro Castelo Capapinha", partySlug: "mpla", electoralCircle: "Cuanza-Sul" },
  { fullName: "Jorge Inoc\xEAncio Dombolo", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Jorge Ribeiro Uefu", partySlug: "mpla", electoralCircle: "Lunda-Norte" },
  { fullName: "Jos\xE9 Ant\xF3nio Lopes Semedo", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Jos\xE9 Artur Carmo Manuel", partySlug: "mpla", electoralCircle: "Cabinda" },
  { fullName: "Jos\xE9 Mi\xFAdo Ndambuca", partySlug: "mpla", electoralCircle: "Hu\xEDla" },
  { fullName: "Julieta Carlos Baptista Vicente", partySlug: "mpla", electoralCircle: "Namibe", gender: "F" },
  { fullName: "Kilamba Kiuyma Sebasti\xE3o Van-D\xFAnem", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Leonor da Silva Ferreira Garibaldi de Lima e Cruz", partySlug: "mpla", electoralCircle: "Cuanza-Norte" },
  { fullName: "Lizete da Concei\xE7\xE3o Manuel Gonga", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Lotti Nolika", partySlug: "mpla", electoralCircle: "Huambo", gender: "F" },
  { fullName: "L\xFAcia Yoleni Sincopela", partySlug: "mpla", electoralCircle: "Cunene", gender: "F" },
  { fullName: "Luciana Mona Cachiangui", partySlug: "mpla", electoralCircle: "Benguela", gender: "F" },
  { fullName: "Lu\xEDs Filipe da Fonseca Sottomayor Pizarro", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Luisa da Concei\xE7\xE3o Ant\xF3nio Bunga Liunda", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Lu\xEDsa Pedro Francisco Dami\xE3o Santos", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Luzia Pereira de Sousa Ingl\xEAs Van-D\xFAnem", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Manuel Franessa", partySlug: "mpla", electoralCircle: "Cuando Cubango" },
  { fullName: "Manuel Lopes Moniz Dembo", partySlug: "mpla", electoralCircle: "Bengo", mesaRole: "1.\xBA Secret\xE1rio da Mesa", photoUrl: "https://www.parlamento.ao/Manuel_Lopes_Moniz_Dembo/img/HzgXUIAxFR20g4UIzAei5yI0FtD6Ds5vsWfxyaSb.png" },
  { fullName: "Mara Regina da Silva Baptista Domingos Quiosa", partySlug: "mpla", electoralCircle: "Bengo", gender: "F" },
  { fullName: "Maria \xC2ngela Teixeira de Alva Sequeira Bragan\xE7a", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria Antonieta Josefina Sabina Baptista", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria Carolina Manuel Fiel Maria Fortes", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria da Concei\xE7\xE3o Mendon\xE7a Caldeira de Palma", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria de Lourdes Roque Caposso Fernandes", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria Esperan\xE7a Pires dos Santos", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria Fonseca", partySlug: "mpla", electoralCircle: "Cuanza-Sul", gender: "F" },
  { fullName: "Maria Idalina de Oliveira Valente", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria Odete Sanches Tavares", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria Rosa Ant\xF3nina Gilberta Tyipinge Escovalo", partySlug: "mpla", electoralCircle: "Hu\xEDla", gender: "F" },
  { fullName: "Maria Salom\xE9 Taveya", partySlug: "mpla", electoralCircle: "Cunene", gender: "F" },
  { fullName: "Maricel Marinho da Silva Capama", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "M\xE1rio Pinto de Andrade", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Mbamby Keane Vict\xF3ria dos Santos", partySlug: "mpla", electoralCircle: "Cunene" },
  { fullName: "Milonga Manuel Bernardo", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "N\xE1dia Agostinho Borges da Concei\xE7\xE3o Monteiro", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Nani Ascen\xE7\xE3o dos Santos Vontade", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Narciso Dam\xE1sio dos Santos Benedito", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Nary Cajica Manuel Aguiar", partySlug: "mpla", electoralCircle: "Cuanza-Norte", gender: "F" },
  { fullName: "Nazar\xE9 dos Anjos Mendes", partySlug: "mpla", electoralCircle: "U\xEDge", gender: "F" },
  { fullName: "Naz\xE1rio Pedro Vilhena Bomba Vilhena", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Norberto Fernandes dos Santos", partySlug: "mpla", electoralCircle: "Malanje" },
  { fullName: "Nvunda Benvindo das Neves Salucombo", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Osvaldo Ant\xF3nio Jos\xE9 Caculo", partySlug: "mpla", electoralCircle: "Cuanza-Norte" },
  { fullName: "Paci\xEAncia Am\xE9lia Albertina Caxita Secuma", partySlug: "mpla", electoralCircle: "Lunda-Sul", gender: "F" },
  { fullName: "Paula Cristina In\xE1cio Contreiras", partySlug: "mpla", electoralCircle: "Namibe", gender: "F" },
  { fullName: "Paula Regina Sim\xF5es de Oliveira", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Paulo Hor\xE1cio de Sequeira e Carvalho", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Paulo Pombolo", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Pedro Agostinho de Neri", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Pedro de Morais Neto", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Pedro Makita Armando J\xFAlia", partySlug: "mpla", electoralCircle: "Zaire" },
  { fullName: "Pedro Sebasti\xE3o", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Ra\xFAl Augusto Lima", partySlug: "mpla", electoralCircle: "Nacional", mesaRole: "3.\xBA Vice-Presidente da Assembleia Nacional", photoUrl: "https://www.parlamento.ao/Raul_Augusto_Lima/img/9iYZWQzNPSZr8mrcU6OEbS5741iLU4ZUsqONz22T.png" },
  { fullName: "Ricardina Inoc\xEAncia dos Santos Chilombo", partySlug: "mpla", electoralCircle: "Lunda-Sul", gender: "F" },
  { fullName: "Rosa Branca da Cunha Cardoso Albino", partySlug: "mpla", electoralCircle: "Nacional", mesaRole: "3.\xAA Secret\xE1ria da Mesa", gender: "F" },
  { fullName: "Rosa Cacuhu", partySlug: "mpla", electoralCircle: "Cuando Cubango", gender: "F" },
  { fullName: "Ruth Adriano Mendes", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Santiago Lino Vunge Primeiro", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Sara Rodrigues Fialho da Costa", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "S\xE9rgio Leonardo Vaz", partySlug: "mpla", electoralCircle: "Cunene" },
  { fullName: "Suzana Augusta de Melo", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Teresa Afonso Pinto", partySlug: "mpla", electoralCircle: "U\xEDge", gender: "F" },
  { fullName: "Teresa Cholimba Mateus Mulumbila", partySlug: "mpla", electoralCircle: "Moxico", gender: "F" },
  { fullName: "Teresa de Jesus Ferreira Gon\xE7alves", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Teresa Jos\xE9 Adelina da Silva Neto", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Victor M\xE1rio Chicua Kajibanga", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Vig\xEDlio da Ressurrei\xE7\xE3o Bernardo Adriano Tyova", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Virg\xEDlio Ferreira de Fontes Pereira", partySlug: "mpla", electoralCircle: "Nacional" },
  { fullName: "Yolanda Br\xEDgida Domingos de Sousa Gaspar", partySlug: "mpla", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Adalberto Costa J\xFAnior", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Adriano Abel Sapin\xE3la", partySlug: "unita", electoralCircle: "Benguela" },
  { fullName: "Albertina Navemba Ngolo Felisberto", partySlug: "unita", electoralCircle: "Huambo", gender: "F" },
  { fullName: "Alcides Sakala Sim\xF5es", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Alcino Jonas Kuvalela", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "\xC1lvaro Chikwamanga Daniel", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Am\xE9lia Judith Ernesto", partySlug: "unita", electoralCircle: "Nacional", mesaRole: "2.\xAA Secret\xE1ria da Mesa", gender: "F", photoUrl: "https://www.parlamento.ao/Amelia_Judith_Ernesto/img/14LAUhhYeRqznbDSQsQcp8RQmmY6tFqtUKvpFYoo.png" },
  { fullName: "Am\xE9rico Carlos Wongo Samoma", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Anabela Valentina Sapalalo", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Anast\xE1cio R\xFAben Sicato", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Ant\xF3nio Kalandula B\xE2ndua", partySlug: "unita", electoralCircle: "Zaire" },
  { fullName: "Ant\xF3nio Sa\xFAde Cabina", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Apolo Pedro Felino Yakuvela", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Ariane Rebeca Lusadisu Nhany", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Arlete Leona Chimbinda", partySlug: "unita", electoralCircle: "Nacional", mesaRole: "2.\xAA Vice-Presidente da Assembleia Nacional", gender: "F", photoUrl: "https://www.parlamento.ao/Arlete_Leona_Chimbinda/img/NfafHwjoevdFYo5lCFzY2pjmDqjfbUoOaRecYReN.png" },
  { fullName: "Arlindo Luemba Miranda", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Armando Manuel Caquepa", partySlug: "unita", electoralCircle: "Cuanza-Sul" },
  { fullName: "Augusto Samuel", partySlug: "unita", electoralCircle: "Hu\xEDla" },
  { fullName: "Avelino Canjamba Jos\xE9", partySlug: "unita", electoralCircle: "Benguela" },
  { fullName: "Celso Eduardo Torres Caping\xE3la", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Cic\xEDlia de Sousa Portalegre de Barros", partySlug: "unita", electoralCircle: "Cuanza-Norte" },
  { fullName: "Clarice Mukinda", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Clarisse Matilde Munga Kaputu", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Clementina Jos\xE9 da Silva", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Concei\xE7\xE3o Jo\xE3o Faria Paulo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Cust\xF3dio Agostinho Kamuango Lopes", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "David \xC1lvaro", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "David Kisadila", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Domingos Eduardo Palanga", partySlug: "unita", electoralCircle: "Luanda" },
  { fullName: "Domingos Oliveira", partySlug: "unita", electoralCircle: "Lunda-Norte" },
  { fullName: "Eduardo Dumbo Delfino", partySlug: "unita", electoralCircle: "Huambo" },
  { fullName: "Ernesto da Costa Kassongo", partySlug: "unita", electoralCircle: "Nacional", mesaRole: "4.\xBA Secret\xE1rio da Mesa", photoUrl: "https://www.parlamento.ao/Ernesto_Da_Costa_Kassongo/img/wsRdzXE37xilgNC9Cjp12UU4cKDq774MTPcKy7oL.png" },
  { fullName: "Estev\xE3o Neto Pedro", partySlug: "unita", electoralCircle: "Cabinda" },
  { fullName: "Esteves Ant\xF3nio Diavova", partySlug: "unita", electoralCircle: "U\xEDge" },
  { fullName: "Eug\xE9nio Antonino Ngolo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Faustino Morais Ant\xF3nio Manuel", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "F\xE9lix Sim\xE3o Lucas", partySlug: "unita", electoralCircle: "U\xEDge" },
  { fullName: "Fernanda Lurdes Nguissi", partySlug: "unita", electoralCircle: "Cuanza-Norte", gender: "F" },
  { fullName: "Fernando Domingos Pedro Muanza", partySlug: "unita", electoralCircle: "Lunda-Norte" },
  { fullName: "Francisco Fernandes", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Francisco Gaio Kakoma Ant\xF3nino", partySlug: "unita", electoralCircle: "Cuando Cubango" },
  { fullName: "Francisco Vicente Gimar\xE3es Ferreira Viana", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Franco Meneses Marcolino Nhani", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Gerv\xE1sio Nombo Zau", partySlug: "unita", electoralCircle: "Cabinda" },
  { fullName: "Helena Bonguela Abel", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Irina de Almeida Santos Diniz Ferreira", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Janu\xE1rio Alfredo Mussambo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Jeremias Ernesto Barbosa Mahula", partySlug: "unita", electoralCircle: "Luanda" },
  { fullName: "Jeremias Kaunda Ab\xEDlio", partySlug: "unita", electoralCircle: "Bi\xE9" },
  { fullName: "Jo\xE3o Baptista Vindes", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Jo\xE3o Kanda Bernardo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Jo\xE3o Manuel", partySlug: "unita", electoralCircle: "Cabinda" },
  { fullName: "Jo\xE3o Miguel Vahekeni", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Jo\xE3o Muzaza Caweza", partySlug: "unita", electoralCircle: "Moxico" },
  { fullName: "Joaquim Nafoia", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Joel Armando Kafuka Pacheco", partySlug: "unita", electoralCircle: "Bengo" },
  { fullName: "Jorge Martins da Cruz", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Jorge Vitorino", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Jos\xE9 do Gringo J\xFAnior Lembe", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Justino Feltro da Costa Pinto de Andrade", partySlug: "unita", electoralCircle: "Nacional", mesaRole: "4.\xBA Vice-Presidente da Assembleia Nacional", photoUrl: "https://www.parlamento.ao/Justino_Feltro_da_Costa__Pinto_de_Andrade/img/xazDosUXuFvNx1kQ2EswVbuWeejRQVfrX2yazwSh.png" },
  { fullName: "L\xE1zaro de Oliveira Guelson Kakunha", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Liberty Marlin Dirc\xE9u Samuel Chiaca", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Louren\xE7o Alberto Chungo Lumingo", partySlug: "unita", electoralCircle: "Cabinda" },
  { fullName: "Lu\xEDs Fernandes do Nascimento", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Manuel Armando da Costa Ekuikui", partySlug: "unita", electoralCircle: "Luanda" },
  { fullName: "Manuel Domingos da Fonseca", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Manuel Mbalu", partySlug: "unita", electoralCircle: "Zaire" },
  { fullName: "Manuel Sampaio Mucanda", partySlug: "unita", electoralCircle: "Namibe" },
  { fullName: "Marcial Adriano Dachala", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Mardan\xEAs Agostinho Calunga", partySlug: "unita", electoralCircle: "Malanje" },
  { fullName: "Maria do Esp\xEDrito Santo da Silva Monteiro", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maria Em\xEDlia da Silva In\xE1cio", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Maur\xEDlio Luciano Sabino Luiele", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Mihaela Ezs\xE9bet Neto Webba Kopumi", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Moniz Alfredo", partySlug: "unita", electoralCircle: "Bengo" },
  { fullName: "Nuno \xC1lvaro Dala", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Ol\xEDvio Fortunato Esperan\xE7a Quilumbo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Pedro Francisco Tanda", partySlug: "unita", electoralCircle: "Zaire" },
  { fullName: "Peregrino Isidro Wambu Chindondo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Piedoso Chipindo Bonga", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Rafael Massanga Sakaita Savimbi", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Rita Mateus J\xFAnior", partySlug: "unita", electoralCircle: "Malanje", gender: "F" },
  { fullName: "Rodrigues Manuel Tandala", partySlug: "unita", electoralCircle: "Bi\xE9" },
  { fullName: "Sandra Teresa Numanawa Kakunda Henriques", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Sa\xFAde Victorino Luenheca Txizau", partySlug: "unita", electoralCircle: "Lunda-Sul" },
  { fullName: "Sofia Porf\xEDrio Kasungu Mussonguela", partySlug: "unita", electoralCircle: "Nacional", gender: "F" },
  { fullName: "Silvestre Gabriel Samy", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Sim\xE3o Albino Ant\xF3nio Dembo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Vasco Manuel Sangongo", partySlug: "unita", electoralCircle: "Lunda-Sul" },
  { fullName: "Virg\xEDlio Pedro Samussongo", partySlug: "unita", electoralCircle: "Nacional" },
  { fullName: "Benedito Daniel", partySlug: "prs", electoralCircle: "Nacional" },
  { fullName: "Rui Malopa Miguel", partySlug: "prs", electoralCircle: "Nacional" },
  { fullName: "Benjamim Manuel da Silva", partySlug: "fnla", electoralCircle: "Nacional" },
  { fullName: "Nimi A simbi", partySlug: "fnla", electoralCircle: "Nacional" },
  { fullName: "Fernando Hombo Dinis", partySlug: "pha", electoralCircle: "Nacional" },
  { fullName: "Florbela Catarina Malaquias", partySlug: "pha", electoralCircle: "Nacional", gender: "F", photoUrl: "https://www.parlamento.ao/Florbela_Catarina_Malaquias/img/HGy5Mxr993t2RcZfJ97xSdtFKxZCpSpKEXB9QccV.png" }
];

// prisma/seed.ts
var prisma = new import_client.PrismaClient();
function slugify(name) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
async function main() {
  await prisma.votePosition.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.proposalTheme.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.committeeMembership.deleteMany();
  await prisma.committee.deleteMany();
  await prisma.deputy.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.agendaItem.deleteMany();
  await prisma.glossaryTerm.deleteMany();
  await prisma.party.deleteMany();
  const partyIds = {};
  for (const party of PARTIES) {
    const created = await prisma.party.create({
      data: {
        slug: party.slug,
        name: party.name,
        fullName: party.fullName,
        seats: party.seats,
        color: party.color,
        kind: party.kind,
        sortOrder: party.sortOrder,
        logoUrl: party.logoUrl ?? null
      }
    });
    partyIds[party.slug] = created.id;
  }
  const usedSlugs = /* @__PURE__ */ new Set();
  for (const d of DEPUTIES) {
    let slug = slugify(d.fullName);
    if (usedSlugs.has(slug)) slug = `${slug}-${d.partySlug}`;
    usedSlugs.add(slug);
    await prisma.deputy.create({
      data: {
        slug,
        fullName: d.fullName,
        partyId: partyIds[d.partySlug],
        inOffice: true,
        electoralCircle: d.electoralCircle ?? null,
        mesaRole: d.mesaRole ?? null,
        gender: d.gender ?? null,
        photoUrl: d.photoUrl ?? null
      }
    });
  }
  const themes = [
    { slug: "direitos-e-protecao-de-dados", name: "Direitos e protec\xE7\xE3o de dados" },
    { slug: "partidos-e-eleicoes", name: "Partidos e elei\xE7\xF5es" },
    { slug: "orcamento-e-financas", name: "Or\xE7amento e finan\xE7as" },
    { slug: "justica-e-seguranca", name: "Justi\xE7a e seguran\xE7a" },
    { slug: "parlamento-e-transparencia", name: "Parlamento e transpar\xEAncia" }
  ];
  const themeIds = {};
  for (const t of themes) {
    const created = await prisma.theme.create({ data: t });
    themeIds[t.slug] = created.id;
  }
  const p1 = await prisma.proposal.create({
    data: {
      slug: "alteracao-lei-proteccao-dados-pessoais",
      officialTitle: "Projecto de Lei de altera\xE7\xE3o \xE0 Lei n.\xBA 22/11, de 17 de Junho \u2014 Lei da Protec\xE7\xE3o de Dados Pessoais",
      plainTitle: "Altera\xE7\xE3o \xE0 lei da protec\xE7\xE3o de dados pessoais",
      plainSummary: "Iniciativa do Grupo Parlamentar da UNITA. Os autores defendiam aumentar o acesso dos cidad\xE3os e dos partidos pol\xEDticos a dados pessoais de natureza eleitoral, com garantias de autenticidade e fiabilidade. O Plen\xE1rio rejeitou o projecto.",
      status: "rejeitada",
      authorPartyId: partyIds.unita,
      authorLabel: "Grupo Parlamentar da UNITA",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional \u2014 Not\xEDcia (25 jun)",
      themes: {
        create: [
          { themeId: themeIds["direitos-e-protecao-de-dados"] },
          { themeId: themeIds["partidos-e-eleicoes"] }
        ]
      }
    }
  });
  await prisma.vote.create({
    data: {
      proposalId: p1.id,
      date: /* @__PURE__ */ new Date("2024-06-25"),
      stage: "Plen\xE1rio",
      votesFor: 75,
      votesAgainst: 95,
      abstentions: 1,
      result: "rejeitada",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional \u2014 Not\xEDcia (25 jun)",
      positions: {
        create: [
          { partyId: partyIds.unita, stance: "desconhecido" },
          { partyId: partyIds.mpla, stance: "desconhecido" },
          { partyId: partyIds.prs, stance: "desconhecido" },
          { partyId: partyIds.fnla, stance: "desconhecido" },
          { partyId: partyIds.pha, stance: "desconhecido" }
        ]
      }
    }
  });
  const p2 = await prisma.proposal.create({
    data: {
      slug: "alteracao-lei-financiamento-partidos",
      officialTitle: "Projecto de Lei de altera\xE7\xE3o \xE0 Lei do Financiamento aos Partidos Pol\xEDticos",
      plainTitle: "Altera\xE7\xE3o \xE0 lei do financiamento dos partidos pol\xEDticos",
      plainSummary: "Iniciativa do Grupo Parlamentar da UNITA. Os autores defendiam tornar o financiamento aos partidos mais justo e equitativo. O Plen\xE1rio rejeitou o projecto.",
      status: "rejeitada",
      authorPartyId: partyIds.unita,
      authorLabel: "Grupo Parlamentar da UNITA",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional \u2014 Not\xEDcia (25 jun)",
      themes: {
        create: [{ themeId: themeIds["partidos-e-eleicoes"] }]
      }
    }
  });
  await prisma.vote.create({
    data: {
      proposalId: p2.id,
      date: /* @__PURE__ */ new Date("2024-06-25"),
      stage: "Plen\xE1rio",
      votesFor: 70,
      votesAgainst: 95,
      abstentions: 1,
      result: "rejeitada",
      sourceUrl: "https://parlamento.ao/Noticia_72135",
      sourceLabel: "Assembleia Nacional \u2014 Not\xEDcia (25 jun)",
      positions: {
        create: [
          { partyId: partyIds.unita, stance: "desconhecido" },
          { partyId: partyIds.mpla, stance: "desconhecido" },
          { partyId: partyIds.prs, stance: "desconhecido" },
          { partyId: partyIds.fnla, stance: "desconhecido" },
          { partyId: partyIds.pha, stance: "desconhecido" }
        ]
      }
    }
  });
  const p3 = await prisma.proposal.create({
    data: {
      slug: "composicao-v-legislatura-2022",
      officialTitle: "Constitui\xE7\xE3o da V Legislatura da Assembleia Nacional (2022\u20132027)",
      plainTitle: "Como ficou a Assembleia depois das elei\xE7\xF5es de 2022",
      plainSummary: "Nas elei\xE7\xF5es gerais de 24 de Agosto de 2022, a Assembleia Nacional ficou com 220 deputados: MPLA 124, UNITA 90, PRS 2, FNLA 2 e PHA 2. A 1.\xAA Reuni\xE3o Constitutiva realizou-se a 16 de Setembro de 2022.",
      status: "publicada",
      authorLabel: "Resultado eleitoral / Constitui\xE7\xE3o da legislatura",
      sourceUrl: "https://parlamento.ao/Historia_V_Legislatura",
      sourceLabel: "Assembleia Nacional \u2014 V Legislatura",
      themes: {
        create: [
          { themeId: themeIds["partidos-e-eleicoes"] },
          { themeId: themeIds["parlamento-e-transparencia"] }
        ]
      }
    }
  });
  await prisma.vote.create({
    data: {
      proposalId: p3.id,
      date: /* @__PURE__ */ new Date("2022-08-24"),
      stage: "Elei\xE7\xE3o / constitui\xE7\xE3o",
      votesFor: 220,
      votesAgainst: 0,
      abstentions: 0,
      result: "aprovada",
      sourceUrl: "https://resultados2022eleicoesgerais.cne.ao/",
      sourceLabel: "CNE \u2014 Resultados 2022",
      positions: {
        create: [
          // Resultado eleitoral global — sem «voto parlamentar» partido a partido nesta ficha
          { partyId: partyIds.mpla, stance: "desconhecido" },
          { partyId: partyIds.unita, stance: "desconhecido" },
          { partyId: partyIds.prs, stance: "desconhecido" },
          { partyId: partyIds.fnla, stance: "desconhecido" },
          { partyId: partyIds.pha, stance: "desconhecido" }
        ]
      }
    }
  });
  await prisma.committee.createMany({
    data: [
      { slug: "mesa-da-assembleia", name: "Mesa da Assembleia Nacional" },
      {
        slug: "comissao-assuntos-constitucionais-juridicos",
        name: "Comiss\xE3o de Assuntos Constitucionais e Jur\xEDdicos"
      },
      {
        slug: "comissao-economia-financas",
        name: "Comiss\xE3o de Economia e Finan\xE7as"
      }
    ]
  });
  await prisma.agendaItem.create({
    data: {
      date: /* @__PURE__ */ new Date("2022-09-16"),
      title: "1.\xAA Reuni\xE3o Constitutiva da V Legislatura",
      description: "Presta\xE7\xE3o de juramento dos deputados eleitos e aprova\xE7\xE3o da constitui\xE7\xE3o da Mesa da Assembleia Nacional.",
      sourceUrl: "https://parlamento.ao/Historia_V_Legislatura",
      sourceLabel: "Assembleia Nacional \u2014 V Legislatura"
    }
  });
  const glossary = [
    {
      slug: "assembleia-nacional",
      term: "Assembleia Nacional",
      definition: "\xD3rg\xE3o legislativo unicameral da Rep\xFAblica de Angola, composto por 220 deputados eleitos."
    },
    {
      slug: "grupo-parlamentar",
      term: "Grupo parlamentar",
      definition: "Organiza\xE7\xE3o dos deputados de um partido com representa\xE7\xE3o suficiente para formar grupo. Na V Legislatura: MPLA e UNITA."
    },
    {
      slug: "representacao-parlamentar",
      term: "Representa\xE7\xE3o parlamentar",
      definition: "Forma de organiza\xE7\xE3o dos partidos com menor n\xFAmero de deputados. Na V Legislatura: PRS, FNLA e PHA."
    },
    {
      slug: "plenario",
      term: "Plen\xE1rio",
      definition: "Reuni\xE3o de todos os deputados para debate e vota\xE7\xE3o de iniciativas."
    },
    {
      slug: "iniciativa-legislativa",
      term: "Iniciativa legislativa",
      definition: "Proposta ou projecto apresentado para se tornar lei, segundo as regras do processo legislativo."
    },
    {
      slug: "v-legislatura",
      term: "V Legislatura",
      definition: "Legislatura em curso (2022\u20132027), iniciada ap\xF3s as elei\xE7\xF5es gerais de 24 de Agosto de 2022."
    }
  ];
  for (const g of glossary) {
    await prisma.glossaryTerm.create({ data: g });
  }
  const counts = await prisma.deputy.groupBy({
    by: ["partyId"],
    _count: true
  });
  console.log("Seed OK");
  console.log("Partidos:", await prisma.party.count());
  console.log("Deputados:", await prisma.deputy.count());
  console.log("Por partido:", counts);
  console.log("Propostas:", await prisma.proposal.count());
  console.log("Vota\xE7\xF5es:", await prisma.vote.count());
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
