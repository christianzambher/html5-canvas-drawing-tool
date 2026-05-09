# HTML5 Canvas Drawing Tool

Aplicación web desarrollada con HTML5 Canvas y JavaScript para realizar dibujos básicos, agregar texto e interactuar dinámicamente con el canvas.

Este proyecto comenzó como una práctica de manipulación del elemento `<canvas>` y posteriormente fue refactorizado para mejorar:
- organización del código
- separación de responsabilidades
- manejo de estado
- mantenibilidad
- escalabilidad

---

# Características

- Dibujo libre con líneas
- Creación de cuadros
- Inserción de texto
- Cambio de color
- Configuración de grosor
- Deshacer último cambio
- Limpiar canvas
- Exportar dibujo como imagen JPG
- Manejo dinámico de coordenadas

---

# Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- jQuery
- HTML5 Canvas API
- Bootstrap

---

# Estructura del proyecto

```text
assets/
├── css/
│   └── styles.css
│
├── js/
│   ├── state.js
│   ├── renderer.js
│   ├── canvas.js
│   ├── ui.js
│   ├── events.js
│   └── app.js
│
└── images/
```

# Arquitectura

El proyecto fue reorganizado utilizando una estructura modular basada en responsabilidades:
| Archivo       | Responsabilidad                       |
| ------------- | ------------------------------------- |
| `state.js`    | Estado global de la aplicación        |
| `renderer.js` | Renderizado de elementos sobre canvas |
| `canvas.js`   | Operaciones principales del canvas    |
| `ui.js`       | Manipulación de interfaz y controles  |
| `events.js`   | Registro de eventos y listeners       |
| `app.js`      | Inicialización de la aplicación       |

# Refactor realizado
## Antes
* Código monolítico
* Variables globales dispersas
* Eventos mezclados con renderizado
* Dependencias implícitas
* Baja mantenibilidad
## Después
* Estado centralizado
* Separación de lógica
* Responsabilidades desacopladas
* Mejor legibilidad
* Estructura escalable

# Cómo ejecutar el proyecto
## Clonar repositorio
```
git clone <repository-url>
```
## Abrir proyecto
```
cd html5-canvas-drawing-tool
```
## Ejecutar con servidor local
Ejemplo usando VSCode Live Server.

# Aprendizajes

Este proyecto permitió practicar:
* Manipulación del Canvas API
* Manejo de eventos del navegador
* Refactorización de código legacy
* Modularización de JavaScript
* Organización de proyectos frontend
* Manejo centralizado de estado
* Separación de responsabilidades