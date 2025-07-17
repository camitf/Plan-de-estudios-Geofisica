// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
    'refe': ['algebra'],
    'anyp': ['AM1', 'algebra'],
    'AM2': ['AM1','algebra'],
    'fisica1': ['AM1'],
    'mates1': ['AM2'],
    'fisica2': ['fisica1'],
    'geoest': ['fundamentos', 'geogral'],
    'mates2': ['mates1'],
    'fisica3': ['AM2','fisica2'],
    'estadistica': ['AM2'],
    'geodesia': ['geogral','refe','fisica2','mates2','estadistica'],
    'mecanica': ['anyp','AM2','fisica2'],
    'analisisseñales': ['anyp', 'mates2', 'estadistica'],
    'sismo':['refe','geoest','mecanica','analisisseñales'],
    'geomag':['fisica3','mecanica'],
    'gravi':['geodesia','analisisseñales'],
    'FAM':['geogral','mates2','mecanica'],
    'FIT':['geogral','refe','geoest','mates2','mecanica'],
    'geoarg':['geogral','geoest'],
    'MSisP':['sismo','geoarg'],
    'MPotP':['geomag','gravi','geoarg'],
    'MElecP':['analisisseñales','geoarg'],
    'instgeof':['geogral','fisica3'],
    'seminario':['MSisP','MPotP','MElecP','instgeof'],
    'tesis':['MSisP','MPotP','MElecP','instgeof'],
  };

  // Funciones para guardar y cargar progreso en localStorage
  function obtenerAprobados() {
    const data = localStorage.getItem('mallaAprobados');
    return data ? JSON.parse(data) : [];
  }

  function guardarAprobados(aprobados) {
    localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
  }

  // Actualiza qué ramos están desbloqueados o bloqueados según prerrequisitos
  function actualizarDesbloqueos() {
    const aprobados = obtenerAprobados();

    for (const [destino, reqs] of Object.entries(prerequisitos)) {
      const elem = document.getElementById(destino);
      if (!elem) continue;

      // Verificar si se cumplen prerrequisitos normales
      let puedeDesbloquear = reqs.every(r => aprobados.includes(r));

      if (!elem.classList.contains('aprobado')) {
        if (puedeDesbloquear) elem.classList.remove('bloqueado');
        else elem.classList.add('bloqueado');
      } else {
        // Si está aprobado, no debe estar bloqueado
        elem.classList.remove('bloqueado');
      }
    }
  }

  // Maneja el clic para aprobar o desaprobar un ramo (solo si no está bloqueado)
  function aprobar(e) {
    const ramo = e.currentTarget;
    if (ramo.classList.contains('bloqueado')) return;

    ramo.classList.toggle('aprobado');

    const aprobados = obtenerAprobados();
    if (ramo.classList.contains('aprobado')) {
      if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
    } else {
      const idx = aprobados.indexOf(ramo.id);
      if (idx > -1) aprobados.splice(idx, 1);
    }
    guardarAprobados(aprobados);

    actualizarDesbloqueos();
  }

  // Al cargar la página, asignar eventos, cargar progreso y actualizar desbloqueos
  window.addEventListener('DOMContentLoaded', () => {
    const todosRamos = document.querySelectorAll('.ramo');

    const aprobados = obtenerAprobados();
    todosRamos.forEach(ramo => {
      if (aprobados.includes(ramo.id)) {
        ramo.classList.add('aprobado');
      }
    });

    todosRamos.forEach(ramo => {
      ramo.addEventListener('click', aprobar);
    });

    actualizarDesbloqueos();
  });
  function chequearCompletado() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const todosTildados = Array.from(checkboxes).every(c => c.checked);
    
    if (todosTildados) {
      document.getElementById('felicidades').style.display = 'flex';
    }
  }
  
  // Llamá a esta función dentro de tu función que se ejecuta al tildar un checkbox.
  // Ejemplo:
  
  checkbox.addEventListener('click', function () {
    // tu código para tachar
    chequearCompletado(); // chequea si están todos tildados
  });
  