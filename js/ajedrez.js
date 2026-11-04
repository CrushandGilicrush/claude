/* Puzzle de ajedrez del salón: una jugada gana la partida y revela la llave. */
const Ajedrez = (() => {
  const e = { visto: false, resuelto: false };

  function examinar() {
    e.visto = true;
    UI.logImagen(Datos.ajedrez.imagen);
    UI.log(Datos.ajedrez.descripcion);
  }

  /* Devuelve true si la entrada es una jugada tipo «C5 F2» y la ha gestionado. */
  function mover(cmd) {
    const m = cmd.match(/^([a-h][1-8])\s*-?\s*([a-h][1-8])$/);
    if (!m || Juego.estado.estancia !== 'salon' || !e.visto) return false;
    if (e.resuelto) { UI.log(Datos.ajedrez.yaResuelto); return true; }
    if (!Datos.ajedrez.soluciones.includes(m[1] + ' ' + m[2])) { UI.log(Datos.ajedrez.fallo); return true; }
    e.resuelto = true;
    UI.log(Datos.ajedrez.exito);
    Juego.estado.inventario.push('llave');
    UI.inventario(Juego.estado.inventario);
    return true;
  }

  return { examinar, mover };
})();
