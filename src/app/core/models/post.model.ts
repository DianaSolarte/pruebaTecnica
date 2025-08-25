/**
 * Modelo de datos para un Post
 *
 * Representa la estructura de datos de un post obtenido de la API JSONPlaceholder.
 * Esta interfaz define el contrato de datos que se utiliza en toda la aplicación
 * para operaciones CRUD con posts.
 *
 * Estructura de datos basada en: https://jsonplaceholder.typicode.com/posts
 *
 * @author Desarrollador - Prueba Técnica
 * @version 1.0
 * @since 2025
 */
export interface Post {
  /**
   * Identificador único del post
   *
   * - Para posts existentes: número entero positivo (1-100 en JSONPlaceholder)
   * - Para posts nuevos: undefined hasta que se asigne por el servidor
   * - Se utiliza para operaciones de actualización y eliminación
   *
   * @example 1, 2, 3, etc.
   */
  id?: number;

  /**
   * Identificador del usuario que creó el post
   *
   * - Requerido para todas las operaciones de creación y actualización
   * - Debe ser un número entero positivo
   * - En JSONPlaceholder existe usuarios con IDs del 1 al 10
   *
   * @example 1, 2, 3, etc.
   */
  userId: number;

  /**
   * Título del post
   *
   * - Requerido para todas las operaciones
   * - Debe ser una cadena no vacía
   * - Longitud máxima recomendada: 100 caracteres
   * - Se muestra como encabezado principal del post
   *
   * @example "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
   */
  title: string;

  /**
   * Contenido/cuerpo del post
   *
   * - Requerido para todas las operaciones
   * - Debe ser una cadena no vacía
   * - Longitud máxima recomendada: 800 caracteres
   * - Contiene el texto principal del post
   *
   * @example "quia et suscipit
suscipit recusandae consequuntur expedita et cum
reprehenderit molestiae ut ut quas totam
nostrum rerum est autem sunt rem eveniet architecto"
   */
  body: string;
}

/**
 * Tipo auxiliar para operaciones de creación de posts
 *
 * Omite el campo 'id' ya que es asignado automáticamente por el servidor
 * durante la operación de creación.
 *
 * @example
 * ```typescript
 * const nuevoPost: CreatePost = {
 *   userId: 1,
 *   title: 'Mi nuevo post',
 *   body: 'Contenido del post'
 * };
 * ```
 */
export type CreatePost = Omit<Post, 'id'>;

/**
 * Tipo auxiliar para operaciones de actualización de posts
 *
 * Requiere el campo 'id' para identificar el post a actualizar
 * y hace opcionales los demás campos para permitir actualizaciones parciales.
 *
 * @example
 * ```typescript
 * const actualizacion: UpdatePost = {
 *   id: 1,
 *   title: 'Título actualizado' // Solo actualizar el título
 * };
 * ```
 */
export type UpdatePost = Partial<Post> & { id: number };
