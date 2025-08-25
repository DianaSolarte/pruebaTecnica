import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from '../../../core/services/posts.service';
import { Post } from '../../../core/models/post.model';

/**
 * Componente principal para la gestión CRUD de Posts
 *
 * Funcionalidades implementadas:
 * - CREATE: Crear nuevos posts (sin ID ni UserID manual)
 * - READ: Consultar todos los posts con buscador
 * - UPDATE: Actualizar posts existentes desde la tabla
 * - DELETE: Eliminar posts desde la tabla
 */
@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './posts-page.component.html',
})
export class PostsPage implements OnInit {

  // =====================================
  // PROPIEDADES DEL COMPONENTE
  // =====================================

  // Lista de posts completa (sin filtrar)
  allPosts = signal<Post[]>([]);

  // Lista de posts filtrada para mostrar
  posts = signal<Post[]>([]);

  // Formulario para crear/actualizar posts (solo title y body)
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    body: ['', [Validators.required, Validators.maxLength(500)]],
  });

  // Campo de búsqueda independiente
  searchTerm = signal('');

  // Post en edición (null = modo crear)
  editingPost = signal<Post | null>(null);

  // Estados de la UI
  loading = signal(false);
  message = signal<string | null>(null);

  constructor(private fb: FormBuilder, private postsSrv: PostsService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  // =====================================
  // OPERACIONES CRUD
  // =====================================

  /**
   * READ - Cargar todos los posts
   */
  loadAll(): void {
    this.loading.set(true);
    this.message.set(null);

    this.postsSrv.getAll().subscribe({
      next: (data) => {
        this.allPosts.set(data);
        this.posts.set(data); // Mostrar todos inicialmente
        this.message.set(`✅ ${data.length} posts cargados exitosamente`);
      },
      error: (error) => {
        console.error('Error:', error);
        this.message.set('❌ Error al cargar posts');
      },
      complete: () => this.loading.set(false),
    });
  }

  /**
   * CREATE - Crear nuevo post
   */
  create(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message.set('⚠️ Complete todos los campos correctamente');
      return;
    }

    // Crear post con UserID automático (1) y sin ID
    const newPost: Post = {
      userId: 1, // UserID fijo para simplificar
      title: this.form.value.title!,
      body: this.form.value.body!
    };

    this.loading.set(true);
    this.postsSrv.create(newPost).subscribe({
      next: (created) => {
        // Agregar localmente el nuevo post con ID generado
        const newPostWithId = { ...created, id: this.generateNewId() };
        const updatedPosts = [newPostWithId, ...this.allPosts()];
        this.allPosts.set(updatedPosts);
        this.applyCurrentFilter();

        this.message.set(`✅ Post "${created.title}" creado exitosamente`);
        this.resetForm();
      },
      error: () => {
        this.message.set('❌ Error al crear el post');
      },
      complete: () => this.loading.set(false),
    });
  }

  /**
   * UPDATE - Actualizar post existente
   */
  update(): void {
    const post = this.editingPost();
    if (!post || this.form.invalid) return;

    const updatedPost: Post = {
      id: post.id,
      userId: post.userId,
      title: this.form.value.title!,
      body: this.form.value.body!,
    };

    this.loading.set(true);
    this.postsSrv.update(post.id!, updatedPost).subscribe({
      next: () => {
        // Actualizar localmente el post en la lista
        const currentPosts = this.allPosts();
        const updatedPosts = currentPosts.map(p =>
          p.id === post.id ? updatedPost : p
        );
        this.allPosts.set(updatedPosts);
        this.applyCurrentFilter();

        this.message.set(`✅ Post actualizado exitosamente`);
        this.resetForm();
      },
      error: () => {
        this.message.set('❌ Error al actualizar el post');
      },
      complete: () => this.loading.set(false),
    });
  }

  /**
   * DELETE - Eliminar post
   */
  delete(post: Post): void {
    if (!confirm(`¿Seguro que desea eliminar "${post.title}"?`)) return;

    this.loading.set(true);
    this.postsSrv.delete(post.id!).subscribe({
      next: () => {
        // Eliminar localmente el post de la lista
        const currentPosts = this.allPosts();
        const filteredPosts = currentPosts.filter(p => p.id !== post.id);
        this.allPosts.set(filteredPosts);
        this.applyCurrentFilter();

        this.message.set(`✅ Post eliminado exitosamente`);
      },
      error: () => {
        this.message.set('❌ Error al eliminar el post');
      },
      complete: () => this.loading.set(false),
    });
  }

  // =====================================
  // FUNCIONES DE LA TABLA
  // =====================================

  /**
   * Editar post desde la tabla
   */
  editPost(post: Post): void {
    this.editingPost.set(post);
    this.form.patchValue({
      title: post.title,
      body: post.body
    });
    this.message.set(`📝 Editando: "${post.title}"`);
  }

  /**
   * Cancelar edición
   */
  cancelEdit(): void {
    this.resetForm();
  }

  /**
   * Reset formulario
   */
  resetForm(): void {
    this.form.reset();
    this.editingPost.set(null);
    this.message.set(null);
  }

  // =====================================
  // FUNCIONES DE BÚSQUEDA
  // =====================================

  /**
   * Buscar posts por término
   */
  search(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm.set(term);
    this.applyCurrentFilter();

    if (term.trim()) {
      this.message.set(`🔍 ${this.posts().length} posts encontrados para "${term}"`);
    } else {
      this.message.set(null);
    }
  }

  /**
   * Limpiar búsqueda
   */
  clearSearch(): void {
    this.searchTerm.set('');
    this.applyCurrentFilter();
    this.message.set(null);
  }

  // =====================================
  // HELPERS
  // =====================================

  /**
   * Generar nuevo ID para posts creados localmente
   */
  generateNewId(): number {
    const allIds = this.allPosts().map(p => p.id || 0);
    return Math.max(...allIds, 100) + 1;
  }

  /**
   * Aplicar filtro actual a la lista de posts
   */
  applyCurrentFilter(): void {
    const term = this.searchTerm();
    if (!term.trim()) {
      this.posts.set(this.allPosts());
      return;
    }

    const filtered = this.allPosts().filter(post =>
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.body.toLowerCase().includes(term.toLowerCase()) ||
      post.id?.toString().includes(term) ||
      post.userId.toString().includes(term)
    );

    this.posts.set(filtered);
  }

  trackById(index: number, post: Post): number {
    return post.id || index;
  }

  /**
   * Verificar si estamos en modo edición
   */
  isEditing(): boolean {
    return this.editingPost() !== null;
  }
}
