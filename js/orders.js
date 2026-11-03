/* Órdenes del extorsionador. Para añadir una orden: crear su definición y añadir su id a `secuencia`. */
const Ordenes = (() => {
  const secuencia = ['caldera', 'verduras'];   // orden en que se piden (provisional: aún sin órdenes 2, 3 y 5)
  let indice = -1;
  const e = { temperatura: 47, bloqueada: false, fase4: null, fotos: [] };

  const defs = {
    caldera: { pide: () => UI.log('Empecemos con algo sencillo. Sube la caldera a 70 grados.', 'dialogo') },
    verduras: { pide: () => { e.fase4 = 'examinar'; UI.log('Dime qué verduras tienes en la nevera.', 'dialogo'); } }
  };

  const activa = () => secuencia[indice];

  function siguiente() {
    indice++;
    if (indice >= secuencia.length) return Juego.terminar(Datos.finales.length - 1);
    defs[secuencia[indice]].pide();
  }

  function superar() { Juego.estado.contador++; UI.contador(Juego.estado.contador); siguiente(); }

  /* ---- Orden 1: caldera (cocina) ---- */
  function examinarCaldera() {
    UI.log(`Un panel digital marca <b>${e.temperatura} °C</b>. Una nota pegada explica: «Para subir la temperatura: +número C. Para bajarla: -número C.»`);
  }
  function ajustar(signo, n) {
    if (Juego.estado.estancia !== 'cocina') return UI.log('No hay ninguna caldera aquí para ajustar.');
    if (activa() !== 'caldera' || e.bloqueada) return UI.log('La caldera no responde.');
    const nueva = e.temperatura + (signo === '-' ? -n : n);
    if (nueva < 25 || nueva > 85) return UI.log('La caldera no reconoce esos parámetros de ajuste.');
    e.temperatura = nueva;
    if (nueva !== 70) return UI.log(`Debes poner la caldera a 70 grados, ni más ni menos. Temperatura actual: ${nueva} °C.`);
    e.bloqueada = true;
    UI.log('La caldera sube hasta los 70 °C y el panel se bloquea.');
    superar();
  }

  /* ---- Orden 4: verduras de la nevera ---- */
  function examinarNevera() {
    if (Juego.estado.estancia !== 'cocina') return;
    UI.log('Abres la nevera. Hay: ' + Datos.verduras.join(', ') + '.');
    if (activa() === 'verduras' && e.fase4 === 'examinar') e.fase4 = 'responder';
  }
  /* Respuesta libre: ignora mayúsculas, acentos, espacios y otras verduras. */
  function responder(cmd) {
    if (activa() !== 'verduras' || e.fase4 !== 'responder') return false;
    if (Juego.norm(cmd).includes('pimiento')) {
      e.fase4 = 'foto';
      UI.log('Perfecto. Haz una fotografía de esa verdura y envíamela.', 'dialogo');
    } else UI.log('No es eso lo que busco. Mira mejor.', 'dialogo');
    return true;
  }
  const verdura = t => ['zanahoria', 'judia', 'tomate', 'pimiento'].find(v => t.includes(v));

  /* ---- Fotos (comunes) ---- */
  function hacerFoto(objeto) {
    if (!objeto) return UI.log('¿De qué quieres hacer la foto?');
    const v = Juego.estado.estancia === 'cocina' && verdura(objeto);
    if (!v) return UI.log('No puedes hacer una foto de eso.');
    e.fotos.push(v);
    UI.log(`Haces una foto: ${v}.`);
  }
  function enviarFoto() {
    if (!Juego.estado.desbloqueado) return UI.log('Telegram sigue bloqueado.');
    if (!e.fotos.length) return UI.log('No tienes ninguna foto que enviar.');
    if (activa() === 'verduras' && e.fase4 === 'foto' && e.fotos[e.fotos.length - 1] === 'pimiento') {
      UI.log('Bien. Por ahora es suficiente.', 'dialogo');
      return superar();
    }
    UI.log('Eso no es lo que te he pedido.', 'dialogo');
  }

  return { siguiente, examinarCaldera, ajustar, examinarNevera, responder, hacerFoto, enviarFoto };
})();
