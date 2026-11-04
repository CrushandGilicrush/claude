/* Motor: estado, intérprete de comandos y arranque. */
const Juego = (() => {
  const estado = { estancia: 'salon', inventario: [], contador: 0, desbloqueado: false, dispositivo: null, esperandoCodigo: false, terminado: false };
  const norm = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  const sinArticulo = t => t.replace(/^(a|al|la|el|los|las|un|una|de|del)\s+/, '').replace(/^(a|al|la|el|de|del)\s+/, '');

  function mostrarSala() {
    const s = Datos.estancias[estado.estancia];
    estado.dispositivo = null;
    UI.vista(s.nombre, Datos.imagenSala);
    UI.log(`Te encuentras en <b>${s.nombre}</b>. ${s.desc}`);
  }

  function ir(arg) {
    const destino = sinArticulo(arg);
    if (!Datos.estancias[destino]) return UI.log('No puedes ir a ese lugar o no existe.');
    estado.estancia = destino;
    mostrarSala();
  }

  function examinar(arg) {
    const nombre = sinArticulo(arg);
    if (!nombre) return UI.log('¿Qué quieres examinar?');
    const clave = Datos.alias[nombre] || nombre;
    const desc = Datos.objetos[estado.estancia][clave];
    if (desc === undefined) return UI.log('No ves nada parecido por aquí.');
    if (clave === 'tablero') return Ajedrez.examinar();
    if (clave === 'nevera') return Ordenes.examinarNevera();
    if (clave === 'caldera') return Ordenes.examinarCaldera();
    UI.log(desc);
  }

  function abrir(arg) {
    const pc = /ordenador|pc/.test(arg), movil = /movil/.test(arg);
    if (!pc && !movil) return UI.log('No puedes abrir eso.');
    if (pc && estado.estancia !== 'despacho') return UI.log('El ordenador está en el despacho.');
    estado.dispositivo = pc ? 'ordenador' : 'movil';
    UI.vista(pc ? 'Ordenador' : 'Móvil', Datos.imagenes[estado.dispositivo], !estado.desbloqueado);
    if (estado.desbloqueado) return UI.log('Telegram está abierto. El desconocido espera.');
    estado.esperandoCodigo = true;
    UI.log('Telegram está protegido con un código de 3 cifras. Escríbelo (o «cancelar»):');
  }

  function comprobarCodigo(cmd) {
    estado.esperandoCodigo = false;
    if (cmd === 'cancelar') return UI.log('Apartas la vista de la pantalla.');
    if (cmd !== Datos.codigo) return UI.log('Código incorrecto.');
    estado.desbloqueado = true;
    UI.vista(UI.$('room-title').innerText, Datos.imagenes[estado.dispositivo]);
    UI.log('Telegram se abre.');
    Ordenes.siguiente();
  }

  function llamar(cmd) {
    if (cmd.includes('policia')) return terminar(estado.contador);
    UI.log('Parece que no hay nadie al otro lado.');
  }

  function terminar(i) {
    estado.terminado = true;
    UI.log(`<b>FIN DE LA PARTIDA</b><br>${Datos.finales[i]}<br><br>Pulsa el botón ↻ para volver a empezar.`, 'final');
    UI.bloquearEntrada();
  }

  /* Comandos de texto: globales o ligados a una estancia y un objeto. */
  function comandoTexto(verbo, arg) {
    const c = Datos.comandosTexto.find(c => c.verbos.includes(verbo) && (!c.objetos || c.objetos.includes(sinArticulo(arg))));
    if (!c) return false;
    UI.log(c.estancia && c.estancia !== estado.estancia ? c.fuera : c.texto);
    return true;
  }

  function ayuda() {
    UI.log('Comandos: «ir a [estancia]», «examinar [objeto]», «abrir móvil», «abrir ordenador», «cerrar», «hacer foto [objeto]», «enviar foto», «llamar a la policía».');
  }

  function ejecutar(entrada) {
    if (estado.terminado || !entrada.trim()) return;
    UI.log(entrada, 'usuario');
    const cmd = norm(entrada);
    if (estado.esperandoCodigo) return comprobarCodigo(cmd);
    const ajuste = cmd.match(/^([+-])\s*(\d+)\s*[º°]?\s*c?$/);
    if (ajuste) return Ordenes.ajustar(ajuste[1], parseInt(ajuste[2], 10));
    if (Ajedrez.mover(cmd)) return;
    const [verbo, ...resto] = cmd.split(' ');
    const arg = resto.join(' ');
    if (verbo === 'ir') return ir(arg);
    if (verbo === 'examinar' || verbo === 'ver') return examinar(arg);
    if (verbo === 'abrir' || verbo === 'encender') return abrir(arg);
    if (verbo === 'cerrar' && estado.dispositivo) return mostrarSala();
    if (/^llam/.test(verbo)) return llamar(cmd);
    if (verbo === 'ayuda') return ayuda();
    if ((verbo === 'hacer' || verbo === 'sacar') && /^foto/.test(arg)) return Ordenes.hacerFoto(sinArticulo(arg.replace(/^foto\s*/, '')));
    if (verbo === 'enviar' && /^foto/.test(arg)) return Ordenes.enviarFoto();
    if (comandoTexto(verbo, arg)) return;
    if (!Ordenes.responder(cmd)) UI.log('No entiendo ese comando.');
  }

  function iniciar() {
    Datos.intro.forEach(([tipo, texto]) => UI.log(texto, tipo));
    mostrarSala();
    UI.inventario(estado.inventario);
    const input = UI.$('command-input');
    const lanzar = () => { const v = input.value; input.value = ''; ejecutar(v); };
    input.addEventListener('keypress', ev => { if (ev.key === 'Enter') lanzar(); });
    UI.$('btn-ejecutar').addEventListener('click', lanzar);
  }

  window.addEventListener('load', iniciar);
  return { estado, norm, terminar };
})();
