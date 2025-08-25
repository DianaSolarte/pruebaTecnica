# 📝 CRUD Posts - Prueba Técnica Angular

Una aplicación web moderna desarrollada en **Angular 16+** que implementa un sistema CRUD completo para la gestión de posts utilizando la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## 🚀 Características Principales

- ✅ **CRUD Completo**: Create, Read, Update, Delete de posts
- 🎨 **Interfaz Moderna**: Diseño responsive con **Tailwind CSS**
- 📱 **Responsive Design**: Optimizado para dispositivos móviles y desktop
- 🔄 **Estado Reactivo**: Implementación con **Angular Signals**
- 📋 **Formularios Reactivos**: Validación completa de datos
- 🌐 **API REST**: Integración con JSONPlaceholder API
- 🎯 **TypeScript**: Tipado estricto y código mantenible
- 📊 **UX/UI Profesional**: Interfaz lista para producción

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 16+ | Framework principal |
| **TypeScript** | 5.0+ | Lenguaje de programación |
| **Tailwind CSS** | 3.0+ | Framework de estilos |
| **RxJS** | 7.0+ | Programación reactiva |
| **Angular Signals** | 16+ | Gestión de estado |
| **JSONPlaceholder** | API | Fuente de datos |

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios y modelos centrales
│   │   ├── models/
│   │   │   └── post.model.ts    # Definición del modelo Post
│   │   └── services/
│   │       └── posts.service.ts # Servicio HTTP para CRUD
│   ├── features/                # Módulos de funcionalidades
│   │   └── posts/
│   │       └── pages/
│   │           ├── posts-page.component.ts   # Lógica del componente
│   │           └── posts-page.component.html # Template principal
│   ├── app.component.html       # Layout principal
│   ├── app.component.ts         # Componente raíz
│   └── app-routing.module.ts    # Configuración de rutas
└── styles.css                  # Estilos globales y Tailwind
```

## 🎯 Funcionalidades Implementadas

### 📚 Operaciones CRUD Completas

1. **CREATE** 📝
   - ✅ Crear nuevos posts **sin campos manuales de ID o UserID**
   - ✅ **UserID automático**: Se asigna automáticamente el valor 1
   - ✅ Formularios reactivos con validación en tiempo real
   - ✅ Confirmación visual de creación exitosa

2. **READ** 📖
   - ✅ Consultar todos los posts (lista completa)
   - ✅ **Buscador inteligente**: Busca por título, contenido, ID o UserID
   - ✅ Tabla responsive con indicador de cantidad de resultados

3. **UPDATE** ✏️
   - ✅ **Actualizar desde la tabla**: Botón "Editar" en cada fila
   - ✅ Formulario pre-poblado con datos actuales
   - ✅ Modo edición claramente diferenciado
   - ✅ Botón "Cancelar" para salir del modo edición

4. **DELETE** 🗑️
   - ✅ **Eliminar desde la tabla**: Botón "Eliminar" en cada fila
   - ✅ Confirmación de seguridad antes de eliminar
   - ✅ Actualización automática de la lista tras eliminación

### 🔍 **Buscador Avanzado**
- **Búsqueda en tiempo real** por cualquier campo
- **Filtros múltiples**: ID, UserID, título y contenido
- **Botón limpiar** para resetear búsqueda
- **Contador de resultados** dinámico

### 🎨 **Experiencia de Usuario Mejorada**
- **Interfaz intuitiva**: Formulario a la izquierda, tabla a la derecha
- **Botones integrados**: Cada post tiene sus propios botones CRUD
- **Estados visuales**: Loading, empty state, modo edición resaltado
- **Validación visual**: Campos requeridos con indicadores claros
- **Responsive design**: Adaptable a cualquier pantalla

### ✅ **Cumplimiento de Requisitos**

**Formulario Angular con CRUD:**
- ✅ **Crear**: Posts con título y contenido (UserID automático)
- ✅ **Consultar**: Todos los posts + búsqueda inteligente  
- ✅ **Actualizar**: Desde tabla con botón por registro
- ✅ **Eliminar**: Desde tabla con confirmación

**Campos del modelo Post:**
- ✅ **"Id"**: Generado automáticamente por la API
- ✅ **"UserId"**: Asignado automáticamente (valor 1)
- ✅ **"Title"**: Campo requerido en formulario
- ✅ **"Body"**: Campo requerido en formulario

**Botones CRUD:**
- ✅ **Crear**: Botón principal en formulario
- ✅ **Consultar**: Búsqueda en tiempo real + botón recargar
- ✅ **Actualizar**: Botón "Editar" en cada fila de la tabla
- ✅ **Eliminar**: Botón "Eliminar" en cada fila de la tabla

**Grid/Tabla:**
- ✅ **Datos de la API**: Muestra todos los posts de JSONPlaceholder
- ✅ **Columnas completas**: ID, UserID, Título, Contenido, Acciones
- ✅ **Acciones por fila**: Editar y Eliminar integrados
- ✅ **Responsive**: Tabla adaptable a diferentes tamaños

**Estilización:**
- ✅ **Tailwind CSS**: Framework moderno de estilos
- ✅ **Gradientes y sombras**: Diseño profesional
- ✅ **Estados interactivos**: Hover, focus, disabled
- ✅ **Layout responsive**: Mobile-first design

## 🚀 Instalación y Ejecución

### Prerrequisitos

- **Node.js** 18.0+ 
- **npm** 8.0+
- **Angular CLI** 16.0+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone [git@github.com:DianaSolarte/pruebaTecnica.git]
cd angularLearn
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

## 🌐 API Integration

### JSONPlaceholder Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/posts` | Obtener todos los posts |
| `GET` | `/posts/{id}` | Obtener post por ID |
| `POST` | `/posts` | Crear nuevo post |
| `PUT` | `/posts/{id}` | Actualizar post existente |
| `DELETE` | `/posts/{id}` | Eliminar post |

### Modelo de Datos

```typescript
interface Post {
  id?: number;        // ID único del post
  userId: number;     // ID del usuario (1-10)
  title: string;      // Título del post (máx 100 chars)
  body: string;       // Contenido del post (máx 800 chars)
}
```

## 📋 Validaciones Implementadas

### Formulario de Posts

- **User ID**: Requerido, número mínimo 1
- **Título**: Requerido, máximo 100 caracteres
- **Contenido**: Requerido, máximo 800 caracteres
- **ID (para actualización)**: Requerido para operaciones de UPDATE

## 🎨 Características de UI/UX

- **Diseño Responsive**: Adaptable a móviles, tablets y desktop
- **Loading States**: Indicadores de carga durante operaciones
- **Mensajes Informativos**: Feedback claro para todas las acciones
- **Validación Visual**: Estados de error y éxito en formularios
- **Gradientes Modernos**: Diseño visual atractivo y profesional
- **Navegación Intuitiva**: Header y footer con branding

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

## 🧪 Scripts Disponibles

```bash
# Desarrollo
ng serve                 # Ejecutar en modo desarrollo

# Construcción
ng build                 # Build para producción

# Testing
ng test                  # Ejecutar pruebas unitarias

# Linting
ng lint                  # Verificar código con ESLint
```

## 📈 Performance

### Optimizaciones Implementadas

- **OnPush Change Detection**: Para componentes con datos inmutables
- **TrackBy Functions**: Para listas con `ngFor`
- **Angular Signals**: Gestión eficiente del estado
- **Tipado estricto**: TypeScript para detectar errores en tiempo de compilación

## 📝 Próximas Mejoras

- [ ] Implementar funcionalidad DELETE en la UI
- [ ] Agregar paginación real para la tabla
- [ ] Implementar filtros y búsqueda
- [ ] Agregar tests unitarios completos
- [ ] Implementar PWA (Progressive Web App)

## 👨‍💻 Autor

**Desarrollador - Prueba Técnica**

---

⭐ **¡Proyecto desarrollado como parte de una prueba técnica!** ⭐

---

### 🔗 Enlaces Útiles

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

> **Nota**: Este proyecto utiliza JSONPlaceholder como API de prueba. Los datos no se persisten realmente en el servidor, pero todas las operaciones CRUD están completamente implementadas y funcionales para demostración.
