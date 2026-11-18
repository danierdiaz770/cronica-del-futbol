export type EraId = 'pioneros' | 'dorada' | 'moderna';
export type EraFilter = 'todas' | EraId;
export type GameMode = 'copa' | 'libre';

export interface HistoryEntry {
  id: string;
  answer: string;
  displayTitle: string;
  era: EraId;
  eraLabel: string;
  year: number;
  category: 'Mundiales' | 'Leyendas' | 'Táctica y Reglas' | 'Estadios y Clubes';
  clue: string;
  historicalHint: string;
  chronicle: string;
}

export const FOOTBALL_HISTORY: HistoryEntry[] = [
  // ORÍGENES Y PIONEROS (1848–1956) - 12 hitos
  {
    id: 'cambridge-1848',
    answer: 'CAMBRIDGE',
    displayTitle: 'Reglas de Cambridge',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1848,
    category: 'Táctica y Reglas',
    clue: 'Universidad inglesa donde se redactó el primer código unificado del juego.',
    historicalHint: 'Sus estudiantes clavaron un reglamento en los árboles de Parker’s Piece en 1848.',
    chronicle:
      'En 1848, representantes de escuelas públicas inglesas reunidos en Cambridge acordaron las primeras reglas comunes para diferenciar el fútbol del rugby, sentando las bases del código moderno de la FA.',
  },
  {
    id: 'sheffield-1857',
    answer: 'SHEFFIELD',
    displayTitle: 'Sheffield FC',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1857,
    category: 'Estadios y Clubes',
    clue: 'Ciudad inglesa sede del club de fútbol más antiguo del planeta.',
    historicalHint: 'Fundado el 24 de octubre de 1857 por Nathaniel Creswick y William Prest.',
    chronicle:
      'Reconocido por la FIFA como el club decano del fútbol mundial, el Sheffield FC nació en 1857 y creó innovaciones esenciales como el saque de esquina, el tiro libre y el travesaño rígido.',
  },
  {
    id: 'wembley-1923',
    answer: 'WEMBLEY',
    displayTitle: 'Estadio de Wembley',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1923,
    category: 'Estadios y Clubes',
    clue: 'Templo londinense inaugurado con la recordada Final del Caballo Blanco.',
    historicalHint: 'Albergó las finales de la FA Cup desde 1923 y la final del Mundial de 1966.',
    chronicle:
      'Inaugurado en abril de 1923 ante una multitud desbordada en Londres, el antiguo estadio de las Torres Gemelas se convirtió en la catedral simbólica del fútbol inglés y europeo.',
  },
  {
    id: 'zamora-1929',
    answer: 'RICARDO ZAMORA',
    displayTitle: 'Ricardo Zamora',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1929,
    category: 'Leyendas',
    clue: 'Portero español apodado El Divino cuyo apellido nombra un trofeo de LaLiga.',
    historicalHint: 'Brilló en el Espanyol, Barcelona y Real Madrid, además de los Juegos Olímpicos de Amberes 1920.',
    chronicle:
      'Ricardo Zamora fue la primera gran superestrella del arco en Europa. Su agilidad, su característica gorra y su valentía inspiraron el trofeo al guardameta menos goleado del campeonato español.',
  },
  {
    id: 'jules-rimet-1930',
    answer: 'JULES RIMET',
    displayTitle: 'Jules Rimet',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1930,
    category: 'Mundiales',
    clue: 'Dirigente francés que impulsó la creación de la primera Copa del Mundo.',
    historicalHint: 'Presidió la FIFA entre 1921 y 1954; la estatuilla original de oro llevó su nombre.',
    chronicle:
      'Gracias a la tenacidad del presidente de la FIFA, en julio de 1930 se disputó el primer Mundial en Montevideo. En homenaje a su labor, el trofeo original fue bautizado con su nombre en 1946.',
  },
  {
    id: 'centenario-1930',
    answer: 'CENTENARIO',
    displayTitle: 'Estadio Centenario',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1930,
    category: 'Estadios y Clubes',
    clue: 'Coloso de Montevideo construido en tiempo récord para el Mundial de 1930.',
    historicalHint: 'Su nombre conmemora los cien años de la primera Constitución de Uruguay.',
    chronicle:
      'Levantado en apenas nueve meses en el Parque Batlle de Montevideo, fue declarado Monumento Histórico del Fútbol Mundial por la FIFA tras ser sede de la primera final planetaria.',
  },
  {
    id: 'stabile-1930',
    answer: 'GUILLERMO STABILE',
    displayTitle: 'Guillermo Stábile',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1930,
    category: 'Mundiales',
    clue: 'Delantero argentino que se consagró como el primer máximo goleador mundialista.',
    historicalHint: 'Anotó ocho goles en cuatro partidos durante el torneo de Uruguay 1930.',
    chronicle:
      'Apodado El Filtrador, comenzó el primer Mundial como suplente pero aprovechó su oportunidad para marcar ocho tantos en cuatro encuentros y encabezar la tabla histórica inicial de artilleros.',
  },
  {
    id: 'uruguay-1930',
    answer: 'URUGUAY',
    displayTitle: 'Uruguay Campeón 1930',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1930,
    category: 'Mundiales',
    clue: 'Selección anfitriona que levantó la primera Copa Mundial tras vencer 4-2 en la final.',
    historicalHint: 'Venía de ganar dos medallas de oro olímpicas consecutivas en 1924 y 1928.',
    chronicle:
      'Tras remontar un 1-2 al descanso ante Argentina, la Celeste cerró con triunfo 4-2 en Montevideo ante casi setenta mil espectadores, coronándose como la primera campeona del mundo.',
  },
  {
    id: 'maracanazo-1950',
    answer: 'MARACANAZO',
    displayTitle: 'El Maracanazo',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1950,
    category: 'Mundiales',
    clue: 'Inolvidable remontada celeste por 2-1 en Río de Janeiro que silenció a Brasil.',
    historicalHint: 'Alcides Ghiggia marcó el segundo tanto en el minuto 79 del partido decisivo.',
    chronicle:
      'El 16 de julio de 1950, cuando Brasil solo necesitaba un empate ante su público para ser campeón, Juan Alberto Schiaffino y Alcides Ghiggia dieron la vuelta al marcador en una de las mayores gestas del deporte.',
  },
  {
    id: 'di-stefano-1953',
    answer: 'ALFREDO DI STEFANO',
    displayTitle: 'Alfredo Di Stéfano',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1953,
    category: 'Leyendas',
    clue: 'La Saeta Rubia, figura total que lideró las cinco primeras Copas de Europa.',
    historicalHint: 'Marcó en las cinco finales europeas consecutivas ganadas por el Real Madrid.',
    chronicle:
      'Nacido en Buenos Aires, Alfredo Di Stéfano transformó el juego al defender, organizar y definir en todo el campo. Su llegada a Europa en 1953 inauguró la dinastía blanca en la Copa de Europa.',
  },
  {
    id: 'puskas-1954',
    answer: 'FERENC PUSKAS',
    displayTitle: 'Ferenc Puskás',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1954,
    category: 'Leyendas',
    clue: 'Capitán de los Mágicos Magiares cuyo apellido nombra el premio al mejor gol anual.',
    historicalHint: 'Comandó a Hungría en el histórico triunfo 6-3 sobre Inglaterra en 1953.',
    chronicle:
      'Con una zurda legendaria y una precisión clínica, Ferenc Puskás lideró a la selección húngara invicta durante cuatro años y luego formó una dupla irrepetible junto a Di Stéfano.',
  },
  {
    id: 'trautmann-1956',
    answer: 'BERT TRAUTMANN',
    displayTitle: 'Bert Trautmann',
    era: 'pioneros',
    eraLabel: 'Orígenes y Pioneros',
    year: 1956,
    category: 'Leyendas',
    clue: 'Arquero alemán del Manchester City que ganó la FA Cup con el cuello fracturado.',
    historicalHint: 'Resistió los últimos diecisiete minutos de la final de 1956 tras un choque aéreo.',
    chronicle:
      'En la final de Wembley de 1956, Bert Trautmann sufrió una luxación de cinco vértebras cervicales al lanzarse a los pies de un rival, pero siguió atajando hasta asegurar el título 3-1.',
  },

  // EDAD DORADA Y LEYENDAS (1958–1994) - 12 hitos
  {
    id: 'pele-1958',
    answer: 'PELE',
    displayTitle: 'Pelé',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1958,
    category: 'Leyendas',
    clue: 'O Rei, único futbolista de la historia en conquistar tres Copas del Mundo.',
    historicalHint: 'Irrumpió en Suecia 1958 con apenas diecisiete años marcando dos goles en la final.',
    chronicle:
      'Edson Arantes do Nascimento redefinió la excelencia atlética y técnica del fútbol. Campeón en 1958, 1962 y 1970, superó el millar de goles en su carrera y llevó la camiseta número 10 al mito universal.',
  },
  {
    id: 'penarol-1960',
    answer: 'PEÑAROL',
    displayTitle: 'Peñarol',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1960,
    category: 'Estadios y Clubes',
    clue: 'Club uruguayo que conquistó la primera edición de la Copa Libertadores.',
    historicalHint: 'Derrotó a Olimpia de Paraguay en la serie final disputada en 1960.',
    chronicle:
      'Con figuras como Alberto Spencer y Juan Eduardo Hohberg, Peñarol estrenó el palmarés de la Copa de Campeones de América en 1960, iniciando una década gloriosa con tres títulos continentales.',
  },
  {
    id: 'garrincha-1962',
    answer: 'GARRINCHA',
    displayTitle: 'Garrincha',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1962,
    category: 'Leyendas',
    clue: 'Extremo brasileño apodado La Alegría del Pueblo, imparable en Chile 1962.',
    historicalHint: 'Asumió el mando ofensivo de la Canarinha tras la lesión temprana de Pelé.',
    chronicle:
      'Maestro absoluto del amague por la banda derecha, Manuel Francisco dos Santos brilló como goleador y mejor jugador del Mundial de Chile 1962, conduciendo a Brasil al bicampeonato.',
  },
  {
    id: 'lev-yashin-1963',
    answer: 'LEV YASHIN',
    displayTitle: 'Lev Yashin',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1963,
    category: 'Leyendas',
    clue: 'La Araña Negra, único guardameta galardonado con el Balón de Oro.',
    historicalHint: 'Defendió la portería de la Unión Soviética y del Dinamo de Moscú vestido de negro.',
    chronicle:
      'Lev Yashin revolucionó la posición de portero al adelantarse para cortar centros, ordenar la defensa a viva voz e iniciar contragolpes rápidos. En 1963 recibió el Balón de Oro europeo.',
  },
  {
    id: 'bobby-moore-1966',
    answer: 'BOBBY MOORE',
    displayTitle: 'Bobby Moore',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1966,
    category: 'Leyendas',
    clue: 'Elegante zaguero y capitán que alzó el único título mundial de Inglaterra.',
    historicalHint: 'Asistió a Geoff Hurst en el cuarto gol inglés durante la prórroga de Wembley 1966.',
    chronicle:
      'Admirado por su lectura táctica y juego limpio, Bobby Moore lideró a la selección inglesa en el Mundial de 1966 y protagonizó en México 1970 una recordada batalla defensiva frente a Pelé.',
  },
  {
    id: 'azteca-1970',
    answer: 'ESTADIO AZTECA',
    displayTitle: 'Estadio Azteca',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1970,
    category: 'Estadios y Clubes',
    clue: 'Recinto mexicano que albergó las consagraciones de Brasil en 1970 y Argentina en 1986.',
    historicalHint: 'Fue escenario del Partido del Siglo entre Italia y Alemania Federal en semifinales.',
    chronicle:
      'Inaugurado en 1966 en la Ciudad de México, el Coloso de Santa Úrsula se convirtió en el primer estadio en recibir dos finales mundialistas, viendo coronarse a dos de los mejores equipos de la historia.',
  },
  {
    id: 'futbol-total-1974',
    answer: 'FUTBOL TOTAL',
    displayTitle: 'Fútbol Total',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1974,
    category: 'Táctica y Reglas',
    clue: 'Revolucionaria filosofía táctica neerlandesa de intercambio constante de posiciones.',
    historicalHint: 'Impulsada por el entrenador Rinus Michels en el Ajax y la Naranja Mecánica.',
    chronicle:
      'En los años setenta, Países Bajos asombró al mundo con la presión alta, el achique de espacios y la polivalencia total de sus futbolistas, cambiando para siempre el pensamiento táctico.',
  },
  {
    id: 'johan-cruyff-1974',
    answer: 'JOHAN CRUYFF',
    displayTitle: 'Johan Cruyff',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1974,
    category: 'Leyendas',
    clue: 'El Holandés Volador, tres veces Balón de Oro e ícono del dorsal catorce.',
    historicalHint: 'Popularizó el giro que lleva su apellido en el Mundial de Alemania Federal 1974.',
    chronicle:
      'Símbolo de la elegancia y la inteligencia espacial, Johan Cruyff ganó tres Copas de Europa seguidas con el Ajax y posteriormente revolucionó el fútbol español como arquitecto del Dream Team.',
  },
  {
    id: 'beckenbauer-1974',
    answer: 'FRANZ BECKENBAUER',
    displayTitle: 'Franz Beckenbauer',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1974,
    category: 'Leyendas',
    clue: 'El Kaiser alemán, campeón mundial tanto como capitán en 1974 como seleccionador en 1990.',
    historicalHint: 'Perfeccionó la función del líbero con salida limpia desde el fondo.',
    chronicle:
      'Franz Beckenbauer dotó de autoridad y estética a la defensa alemana. Ganó tres Copas de Europa consecutivas con el Bayern de Múnich y dos Balones de Oro desde la retaguardia.',
  },
  {
    id: 'kempes-1978',
    answer: 'MARIO KEMPES',
    displayTitle: 'Mario Kempes',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1978,
    category: 'Mundiales',
    clue: 'El Matador, máximo artillero que dio a Argentina su primera estrella mundial.',
    historicalHint: 'Anotó un doblete en la final del Monumental frente a Países Bajos en 1978.',
    chronicle:
      'Potente, veloz y zurdo, Mario Alberto Kempes cargó con el gol argentino en las fases decisivas de 1978, finalizando como Bota de Oro con seis anotaciones y figura absoluta de la final.',
  },
  {
    id: 'paolo-rossi-1982',
    answer: 'PAOLO ROSSI',
    displayTitle: 'Paolo Rossi',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1982,
    category: 'Mundiales',
    clue: 'Goleador italiano que firmó un triplete inolvidable contra Brasil en España 82.',
    historicalHint: 'Marcó seis tantos en los últimos tres partidos para otorgar el tercer título a Italia.',
    chronicle:
      'Tras regresar a las canchas poco antes del torneo, Paolo Rossi despertó en la segunda fase de 1982 con un hat-trick en Sarrià y goles ante Polonia y Alemania Federal que valieron el campeonato.',
  },
  {
    id: 'maradona-1986',
    answer: 'DIEGO MARADONA',
    displayTitle: 'Diego Maradona',
    era: 'dorada',
    eraLabel: 'Edad Dorada',
    year: 1986,
    category: 'Leyendas',
    clue: 'Autor del Gol del Siglo tras eludir a medio equipo inglés en el Azteca.',
    historicalHint: 'Capitaneó a Argentina en México 1986 con cinco goles y cinco asistencias.',
    chronicle:
      'En 1986, Diego Armando Maradona firmó la actuación individual más recordada en la historia de los mundiales y llevó luego al Napoli a ganar sus dos primeros títulos de la Serie A.',
  },

  // ERA MODERNA Y GLOBAL (1995–ACTUALIDAD) - 12 hitos
  {
    id: 'ley-bosman-1995',
    answer: 'LEY BOSMAN',
    displayTitle: 'Ley Bosman',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 1995,
    category: 'Táctica y Reglas',
    clue: 'Fallo judicial europeo de 1995 que liberó los traspasos de jugadores sin contrato.',
    historicalHint: 'Lleva el apellido de un futbolista belga que demandó a su club y a la UEFA.',
    chronicle:
      'La sentencia del Tribunal de Justicia de la Unión Europea en diciembre de 1995 permitió a los futbolistas cambiar de club gratuitamente al acabar su contrato y eliminó las restricciones de extranjeros comunitarios.',
  },
  {
    id: 'zidane-1998',
    answer: 'ZINEDINE ZIDANE',
    displayTitle: 'Zinedine Zidane',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 1998,
    category: 'Leyendas',
    clue: 'Cerebro francés autor de dos goles de cabeza en la final mundialista de París 98.',
    historicalHint: 'También marcó una célebre volea en Glasgow para ganar la Liga de Campeones 2002.',
    chronicle:
      'Con un control orientado inconfundible, Zinedine Zidane condujo a Francia a su primer Mundial en 1998 y a la Eurocopa 2000, cerrando décadas después un ciclo histórico como técnico tricampeón de Europa.',
  },
  {
    id: 'ronaldo-2002',
    answer: 'RONALDO NAZARIO',
    displayTitle: 'Ronaldo Nazário',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2002,
    category: 'Mundiales',
    clue: 'El Fenómeno, Bota de Oro con ocho tantos en Corea-Japón 2002.',
    historicalHint: 'Superó graves lesiones de rodilla para anotar un doblete en la final de Yokohama.',
    chronicle:
      'Explosivo y letal en el mano a mano, Ronaldo Nazário completó una resurrección deportiva admirable en 2002 al darle a Brasil su quinto título mundial y ganar su segundo Balón de Oro.',
  },
  {
    id: 'marta-2007',
    answer: 'MARTA VIEIRA',
    displayTitle: 'Marta Vieira',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2007,
    category: 'Leyendas',
    clue: 'Máxima goleadora histórica de los Mundiales Femeninos y seis veces mejor del mundo.',
    historicalHint: 'Atacante brasileña que brilló en la final olímpica y en China 2007.',
    chronicle:
      'Marta Vieira da Silva elevó la técnica y la visibilidad global del fútbol femenino durante más de dos décadas, acumulando diecisiete goles en fases finales de la Copa Mundial.',
  },
  {
    id: 'tiki-taka-2010',
    answer: 'TIKI TAKA',
    displayTitle: 'Tiki-Taka',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2010,
    category: 'Táctica y Reglas',
    clue: 'Estilo de posesión corta y triángulos continuos que dominó entre 2008 y 2012.',
    historicalHint: 'Llevó a España y al FC Barcelona a conquistar un ciclo irrepetible de títulos.',
    chronicle:
      'Basado en pases cortos, movilidad constante y recuperación inmediata tras pérdida, el fútbol asociativo español encadenó Eurocopa, Mundial y Eurocopa en un lapso de cuatro años.',
  },
  {
    id: 'iniesta-2010',
    answer: 'ANDRES INIESTA',
    displayTitle: 'Andrés Iniesta',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2010,
    category: 'Mundiales',
    clue: 'Autor del derechazo en el minuto 116 que dio a España su primera Copa del Mundo.',
    historicalHint: 'Celebró el gol de Johannesburgo dedicándolo a su amigo Dani Jarque.',
    chronicle:
      'En la prórroga de la final de Sudáfrica 2010 ante Países Bajos, Andrés Iniesta controló un pase de Cesc Fàbregas y definió cruzado para sellar el mayor triunfo en la historia de la selección española.',
  },
  {
    id: 'maracana-2014',
    answer: 'MARACANA',
    displayTitle: 'Estadio Maracaná',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2014,
    category: 'Estadios y Clubes',
    clue: 'Mítico estadio de Río de Janeiro que volvió a acoger una final mundialista en 2014.',
    historicalHint: 'Alemania derrotó 1-0 a Argentina con gol de Mario Götze en la prórroga.',
    chronicle:
      'Sesenta y cuatro años después de 1950, el estadio Jornalista Mário Filho fue remodelado para recibir la final de Brasil 2014, consagrando a la primera selección europea campeona en América.',
  },
  {
    id: 'leicester-2016',
    answer: 'LEICESTER CITY',
    displayTitle: 'Leicester City',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2016,
    category: 'Estadios y Clubes',
    clue: 'Club inglés que desafió probabilidades de 5000 a 1 para ganar la Premier League.',
    historicalHint: 'Dirigido por Claudio Ranieri con Jamie Vardy, Riyad Mahrez y N’Golo Kanté.',
    chronicle:
      'Tras salvarse milagrosamente del descenso el curso anterior, los Foxes sorprendieron al mundo en la temporada 2015-16 conquistando la máxima categoría inglesa por primera vez en sus 132 años.',
  },
  {
    id: 'cristiano-2016',
    answer: 'CRISTIANO RONALDO',
    displayTitle: 'Cristiano Ronaldo',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2016,
    category: 'Leyendas',
    clue: 'Máximo goleador histórico de selecciones y campeón de la Eurocopa 2016 con Portugal.',
    historicalHint: 'Ganó cinco Ligas de Campeones y cinco Balones de Oro en su trayectoria.',
    chronicle:
      'Cristiano Ronaldo transformó el registro goleador del fútbol contemporáneo tanto en clubes como con la selección portuguesa, a la que guio hacia sus primeros grandes títulos oficiales.',
  },
  {
    id: 'var-2018',
    answer: 'VIDEOARBITRAJE',
    displayTitle: 'Videoarbitraje (VAR)',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2018,
    category: 'Táctica y Reglas',
    clue: 'Tecnología de revisión en pantalla que debutó en un Mundial durante Rusia 2018.',
    historicalHint: 'Se utiliza exclusivamente en goles, penaltis, rojas directas y confusión de identidad.',
    chronicle:
      'Aprobado por la IFAB en 2018, el sistema de asistencia arbitral por video modificó la toma de decisiones en momentos determinantes del juego, estrenándose a gran escala en la Copa Mundial de Rusia.',
  },
  {
    id: 'alexia-2021',
    answer: 'ALEXIA PUTELLAS',
    displayTitle: 'Alexia Putellas',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2021,
    category: 'Leyendas',
    clue: 'Centrocampista española ganadora de dos Balones de Oro consecutivos.',
    historicalHint: 'Capitana del FC Barcelona y campeona mundial en Sídney 2023.',
    chronicle:
      'Alexia Putellas simbolizó la explosión competitiva del fútbol femenino europeo al encadenar los Balones de Oro de 2021 y 2022 y liderar un ciclo hegemónico tanto en clubes como con España.',
  },
  {
    id: 'messi-2022',
    answer: 'LIONEL MESSI',
    displayTitle: 'Lionel Messi',
    era: 'moderna',
    eraLabel: 'Era Moderna',
    year: 2022,
    category: 'Mundiales',
    clue: 'Máximo ganador del Balón de Oro, alzó la copa mundial en Lusail en 2022.',
    historicalHint: 'Anotó siete goles en Catar 2022 y dos tantos en la inolvidable final ante Francia.',
    chronicle:
      'Tras una carrera récord de ocho Balones de Oro, Lionel Messi completó su palmarés en diciembre de 2022 capitaneando a Argentina hacia su tercera estrella mundial en una final definida por penaltis.',
  },
];

export const ERA_DESCRIPTIONS: Record<EraId, { title: string; span: string; summary: string }> = {
  pioneros: {
    title: 'Orígenes y Pioneros',
    span: '1848–1956',
    summary: 'Del código de Cambridge y los primeros balones de cuero cosidos al Maracanazo.',
  },
  dorada: {
    title: 'Edad Dorada',
    span: '1958–1994',
    summary: 'El reinado de Pelé, la revolución del Fútbol Total y la magia de Maradona.',
  },
  moderna: {
    title: 'Era Moderna',
    span: '1995–Actualidad',
    summary: 'La Ley Bosman, la globalización de las ligas, el VAR y las figuras del siglo XXI.',
  },
};
