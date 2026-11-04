/* Capa de interfaz: terminal, visor, inventario y contador. */
const UI = (() => {
  const $ = id => document.getElementById(id);

  /* tipo: 'narrativo' (naranja), 'dialogo' (azul frío), 'usuario', 'final' */
  function log(texto, tipo = 'narrativo') {
    const t = $('terminal'), e = document.createElement('div');
    e.className = 'mb-2 leading-relaxed txt-' + tipo;
    if (tipo === 'usuario') e.textContent = '> ' + texto;
    else e.innerHTML = tipo === 'dialogo' ? '<b>Desconocido:</b> ' + texto : texto;
    t.appendChild(e);
    t.scrollTop = t.scrollHeight;
  }

  function logImagen(src) {
    const t = $('terminal'), e = document.createElement('div');
    e.className = 'mb-2';
    e.innerHTML = `<img src="${src}" alt="Imagen" class="max-h-72 rounded border border-retro-border">`;
    e.firstChild.onload = () => { t.scrollTop = t.scrollHeight; };
    t.appendChild(e);
    t.scrollTop = t.scrollHeight;
  }

  function vista(titulo, imagen, bloqueado = false, grande = false) {
    $('visor').classList.toggle('visor-grande', grande);
    $('room-title').innerText = titulo;
    $('room-bg').style.backgroundImage = `url('${imagen}')`;
    $('room-bg').classList.toggle('bg-contain', imagen !== Datos.imagenSala);
    $('room-bg').classList.toggle('bg-no-repeat', imagen !== Datos.imagenSala);
    $('bloqueo').classList.toggle('hidden', !bloqueado);
  }

  function contador(n) { $('contador-subm').innerText = n; }

  function inventario(items) {
    $('inventory-count').innerText = items.length + ' objetos';
    $('inventory-list').innerHTML = items.length
      ? items.map(i => `<div class="text-xs text-retro-amber p-2 border border-retro-border rounded">${i}</div>`).join('')
      : '<div class="text-xs text-retro-dim italic p-2">Inventario vacío</div>';
  }

  function bloquearEntrada() { $('command-input').disabled = true; $('btn-ejecutar').disabled = true; }

  return { log, logImagen, vista, contador, inventario, bloquearEntrada, $ };
})();
