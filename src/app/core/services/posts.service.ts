import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

/**
 * Servicio para operaciones CRUD con la API de JSONPlaceholder
 *
 * Este servicio maneja todas las operaciones HTTP relacionadas con Posts:
 * - Consulta de todos los posts (GET /posts)
 * - Consulta de un post por ID (GET /posts/{id})
 * - Creación de nuevos posts (POST /posts)
 * - Actualización de posts existentes (PUT /posts/{id})
 * - Eliminación de posts (DELETE /posts/{id})
 *
 * API Base: https://jsonplaceholder.typicode.com
 * Documentación: https://jsonplaceholder.typicode.com/guide/
 *
 * @author Desarrollador - Prueba Técnica
 * @version 1.0
 * @since 2025
 */
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  // =====================================
  // CONFIGURACIÓN
  // =====================================

  /**
   * URL base de la API JSONPlaceholder
   * Servicio gratuito que proporciona datos de prueba para desarrollo
   */
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // =====================================
  // CONSTRUCTOR
  // =====================================

  /**
   * Constructor del servicio
   * @param http Cliente HTTP de Angular para realizar peticiones REST
   */
  constructor(private http: HttpClient) { }

  // =====================================
  // MÉTODOS CRUD
  // =====================================

  /**
   * READ ALL - Obtiene todos los posts disponibles
   *
   * Endpoint: GET https://jsonplaceholder.typicode.com/posts
   * Respuesta: Array de 100 posts de ejemplo
   *
   * @returns Observable<Post[]> Lista completa de posts
   *
   * @example
   * ```typescript
   * this.postsService.getAll().subscribe(posts => {
   *   console.log(`Se obtuvieron ${posts.length} posts`);
   * });
   * ```
   */
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  /**
   * READ BY ID - Obtiene un post específico por su identificador
   *
   * Endpoint: GET https://jsonplaceholder.typicode.com/posts/{id}
   * Respuesta: Post individual o error 404 si no existe
   *
   * @param id Identificador único del post (1-100 en JSONPlaceholder)
   * @returns Observable<Post> Post encontrado
   *
   * @example
   * ```typescript
   * this.postsService.getById(1).subscribe(post => {
   *   console.log(`Post encontrado: ${post.title}`);
   * });
   * ```
   */
  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  /**
   * CREATE - Crea un nuevo post en el servidor
   *
   * Endpoint: POST https://jsonplaceholder.typicode.com/posts
   * Nota: JSONPlaceholder simula la creación pero no persiste los datos
   *
   * @param post Datos del post a crear (sin ID, se genera automáticamente)
   * @returns Observable<Post> Post creado con ID asignado
   *
   * @example
   * ```typescript
   * const nuevoPost: Post = {
   *   userId: 1,
   *   title: 'Mi Post',
   *   body: 'Contenido del post'
   * };
   *
   * this.postsService.create(nuevoPost).subscribe(creado => {
   *   console.log(`Post creado con ID: ${creado.id}`);
   * });
   * ```
   */
  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  /**
   * UPDATE - Actualiza un post existente
   *
   * Endpoint: PUT https://jsonplaceholder.typicode.com/posts/{id}
   * Nota: JSONPlaceholder simula la actualización pero no persiste los cambios
   *
   * @param id Identificador del post a actualizar
   * @param post Datos actualizados del post (debe incluir todos los campos)
   * @returns Observable<Post> Post actualizado
   *
   * @example
   * ```typescript
   * const postActualizado: Post = {
   *   id: 1,
   *   userId: 1,
   *   title: 'Título Actualizado',
   *   body: 'Contenido actualizado'
   * };
   *
   * this.postsService.update(1, postActualizado).subscribe(actualizado => {
   *   console.log(`Post ${actualizado.id} actualizado exitosamente`);
   * });
   * ```
   */
  update(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  /**
   * DELETE - Elimina un post del servidor
   *
   * Endpoint: DELETE https://jsonplaceholder.typicode.com/posts/{id}
   * Nota: JSONPlaceholder simula la eliminación pero no persiste los cambios
   * Método implementado para completitud del CRUD pero no utilizado en la UI actual
   *
   * @param id Identificador del post a eliminar
   * @returns Observable<void> Respuesta de confirmación
   *
   * @example
   * ```typescript
   * this.postsService.delete(1).subscribe(() => {
   *   console.log('Post eliminado exitosamente');
   * });
   * ```
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
