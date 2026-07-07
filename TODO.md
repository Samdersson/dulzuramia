# TODO - Buscador y armado de pedidos

- [x] Insertar en `index.html` una sección UI de “Pedido rápido” con:
  - [ ] input de búsqueda
  - [ ] listado de resultados
  - [ ] selección de cantidad
  - [ ] área para mostrar especificaciones (radios) cuando existan
  - [ ] botón para “Agregar al pedido”
  - [ ] campo/selector para “Número de mesa” (y que se use al confirmar)
- [ ] Actualizar `Backend.js` para:
  - [ ] Indexar productos desde el DOM (.productos): nombre, precio, y radios (texto de opción)
  - [ ] Filtrar resultados por texto ingresado
  - [ ] Al seleccionar producto: mostrar radios si existen y exigir que se elija
  - [ ] Agregar al carrito la línea con `quantity` y `option`
  - [ ] Calcular y mostrar total sumando (quantity * price)
  - [ ] Adaptar el modal de confirmación para incluir “Número de mesa” en el mensaje WhatsApp
- [ ] (Post) Probar:
  - [ ] Buscar por nombre y agregar varios productos
  - [ ] Validar productos con especificaciones (radios)
  - [ ] Validar el total correcto
  - [ ] Confirmar pedido y verificar mensaje WhatsApp con mesa

