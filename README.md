# my-story

En la carpeta `data` tenemos un archivo .json con la información de las películas. Vamos a simular que no podemos acceder a esa información desde el front directamente. Para ello haremos operaciones definidas en `pages/api`.

## Detalle de película

Queremos implementar una pantalla de detalle para cada película en la aplicación.
   - La pantalla de detalle debe mostrar la información básica de la película, como el título, la sinopsis y el género.
   - Incluir una galería de imágenes asociada a la película. Esta galería debe permitir al usuario ver una pequeña colección de imágenes relacionadas con la película (al menos 3 imágenes).

## Personajes

Gestión de Personajes, en la pantalla de detalles de la película. Cada personaje tendrá los siguientes atributos:

- Nombre: Nombre completo del personaje.
- Descripción: Una breve descripción que ofrezca un contexto sobre el personaje.
- Gustos (likes): Un texto de cosas que le gustan al personaje.
- Cosas que no le gustan(dislikes): Un texto con cosas que le disgustan al personaje.

Tendremos que poder:
- Crear un personaje: Poder añadir nuevos personajes en la aplicación con toda la información mencionada anteriormente.
- Leer (ver detalles de un personaje): Visualizar la información completa de cada personaje en una página de detalle.
- Actualizar un personaje: Modificar los detalles de un personaje, incluyendo su nombre, descripción, gustos y cosas que no le gustan.
- Borrar un personaje: Eliminar un personaje específico de la base de datos.
Relación con historias:

Cada personaje debe poder ser vinculado a una historia específica (como una película).
En la pantalla de detalle de cada película, se deben listar los personajes asociados a esa película, con sus nombres y una descripción breve.
