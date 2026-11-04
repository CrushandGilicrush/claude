/* Contenido del juego: textos, estancias, objetos y finales. Aquí se edita la narrativa. */
const Datos = {
  codigo: '885',
  imagenSala: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
  imagenes: { movil: 'img/movil.svg', ordenador: 'img/ordenador.svg' },
  intro: [
    ['narrativo', 'Despierta... Giras a un lado y a otro de la cama, abrazada a la almohada con fuerza, abrigada del frío. Tu único esfuerzo es abrir los ojos. Tal vez, después de tomarte un café, reunas energía suficiente como para procrastinar con mayor entusiasmo.'],
    ['dialogo', "«Sé muy bien lo que hiciste. Y tengo las fotos para demostrarlo. Si no quieres que salgan a la luz, háblame por Telegram de inmediato.»"]
  ],
  estancias: {
    salon: { nombre: 'Salón', desc: 'Estancia principal. Hay un sofá, una biblioteca, radiadores y un mueble antiguo.' },
    habitacion: { nombre: 'Habitación', desc: 'Tu espacio privado. Contiene la cama, el armario, un espejo y una cómoda con cajón.' },
    despacho: { nombre: 'Despacho', desc: 'Zona de trabajo con un ordenador de sobremesa, escritorio, juegos de mesa y un cuadro.' },
    cocina: { nombre: 'Cocina', desc: 'Equipada con cocina, cafetera, nevera y una caldera con panel digital.' },
    bano: { nombre: 'Baño', desc: 'Dispone de inodoro, lavabo, ducha y un pequeño mueble.' },
    terraza: { nombre: 'Terraza', desc: 'Espacio exterior con macetas y una tumbona cómoda.' }
  },
  /* Descripciones provisionales de «examinar»: reescribir a gusto. */
  objetos: {
    salon: { sofa: 'Un sofá mullido, con una manta arrugada.', biblioteca: 'Estantes llenos de libros que no has abierto en meses.', radiador: 'Un radiador de hierro, ahora apagado.', luz: 'Una lámpara de pie con luz cálida.', mueble: 'Un mueble antiguo de madera oscura. Encima hay un tablero de ajedrez con una partida a medias.', tablero: '' },
    habitacion: { cama: 'La cama deshecha, aún tibia.', armario: 'Un armario de dos puertas, repleto de ropa.', espejo: 'Tu reflejo te devuelve una cara cansada.', comoda: 'Una cómoda de madera con un cajón.' },
    despacho: { ordenador: 'Un ordenador de sobremesa. Lo mismo que el móvil, pero con pantalla grande.', escritorio: 'Un escritorio con papeles revueltos.', 'juegos de mesa': 'Varias cajas de juegos de mesa, apiladas.', cuadro: 'Un panel lleno de rosas y espinas, con placas numeradas.' },
    cocina: { cocina: 'Una cocina limpia, sin nada al fuego.', cafetera: 'Una cafetera que huele a café viejo.', nevera: '', caldera: '' },
    bano: { inodoro: 'Un inodoro corriente.', lavabo: 'Un lavabo con el grifo goteando.', ducha: 'Una ducha con mampara.', mueble: 'Un pequeño mueble con toallas.' },
    terraza: { macetas: 'Macetas con plantas algo secas.', tumbona: 'Una tumbona cómoda, al sol.' }
  },
  alias: { ajedrez: 'tablero', radiadores: 'radiador', juegos: 'juegos de mesa', maceta: 'macetas', pc: 'ordenador' },
  /* Comandos con respuesta de texto. Sin `estancia`/`objetos`: funcionan en cualquier lugar.
     Con ellos: solo funcionan en esa estancia y nombrando uno de sus objetos. */
  comandosTexto: [
    { verbos: ['bostezar', 'bosteza'], texto: 'Te llevas la mano a la boca y bostezas. Esta situación, más que inquietarte, te da sueño.' },
    { verbos: ['gritar', 'grita'], texto: 'Gritas de impotencia, pero nadie parece oírte (o quizá sí).' },
    { verbos: ['limpiar', 'limpia'], estancia: 'bano', objetos: ['inodoro', 'taza', 'wc'], texto: 'Te pones de rodillas y limpias el borde de la taza.', fuera: 'No ves ningún inodoro por aquí.' }
  ],
  /* Puzzle de ajedrez. `soluciones`: jugadas ganadoras en minúsculas, «origen destino». */
  ajedrez: {
    imagen: 'img/tablero.png',
    soluciones: ['c5 f2'],
    descripcion: 'Una partida de ajedrez a medias. Puedes ganar con un solo movimiento. Escribe la jugada con la casilla de origen y la de destino, por ejemplo «A2 B3».',
    fallo: 'Ese movimiento no te da la victoria. Devuelves las piezas a su sitio.',
    exito: 'Mueves la pieza y la partida queda ganada. Al apoyar la mano en el mueble, el tablero cojea: hay algo debajo. Lo levantas y encuentras una llave.',
    yaResuelto: 'Ya has ganado esta partida.'
  },
  verduras: ['zanahorias', 'judías verdes', 'tomates', 'un pimiento rojo'],
  /* Un final por cada valor del contador (0-4) y el de las consecuencias (5). */
  finales: [
    'Final 1 (texto pendiente).', 'Final 2 (texto pendiente).', 'Final 3 (texto pendiente).',
    'Final 4 (texto pendiente).', 'Final 5 (texto pendiente).', 'Final 6: consecuencias (texto pendiente).'
  ]
};
