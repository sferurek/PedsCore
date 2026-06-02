# PedsCore Roadmap

Este documento recoge los hitos previstos para el proyecto PedsCore. Las fechas son aproximadas y dependen de la disponibilidad de los colaboradores.

## Fase 0 – Documentación y base de conocimiento

- **Objetivo**: Recopilar, revisar y validar scores, escalas, calculadoras, algoritmos y percentiles de Pediatría y Neonatología. Definir la estructura de datos y los campos comunes.
- **Estado**: En curso. Se está construyendo la base de conocimiento (`PedsCore_Knowledge_Base_v1.md` y `.json`) y los documentos de proyecto.

## Fase 1 – Motor TypeScript

- **Objetivo**: Implementar una librería en TypeScript que incluya el cálculo y la validación de las herramientas identificadas en el MVP. Cada función devolverá resultados estandarizados, categorías de interpretación, avisos y referencias.
- **Tareas**:
  - Definir tipos y validaciones comunes.
  - Implementar funciones para cada herramienta del MVP.
  - Crear pruebas unitarias con Vitest.
  - Configurar linting y formateo.

## Fase 2 – Web GitHub Pages

- **Objetivo**: Desarrollar una interfaz web estática (React + Vite) que consuma el motor TypeScript y permita a los usuarios buscar herramientas, introducir datos, obtener resultados y consultar referencias.
- **Tareas**:
  - Diseñar una experiencia de usuario accesible y adaptada a dispositivos móviles.
  - Implementar formularios dinámicos y componentes reutilizables.
  - Integrar internacionalización (español e inglés).
  - Configurar el despliegue automático a través de GitHub Actions y GitHub Pages.

## Fase 3 – Internacionalización

- **Objetivo**: Ampliar el soporte a múltiples idiomas (español e inglés inicialmente). Revisar traducciones con profesionales nativos. Permitir selección manual de idioma y detección automática.
- **Tareas**:
  - Definir archivos de traducción (`json`).
  - Implementar un selector de idioma.
  - Garantizar que todas las descripciones y mensajes estén traducidos.

## Fase 4 – Analítica agregada

- **Objetivo**: Añadir un sistema de analítica anónima para conocer el uso agregado de las herramientas (número de consultas por herramienta, país de origen, etc.) sin almacenar datos clínicos ni identificativos.
- **Tareas**:
  - Definir la arquitectura de recogida (p. ej. Supabase o servicio similar con anonimización).
  - Implementar un contador de uso y estadísticas básicas.
  - Mostrar estadísticas en la página de inicio de manera atractiva.

## Fase 5 – Aplicaciones móviles

- **Objetivo**: Desarrollar aplicaciones nativas o híbridas para iOS/Android reutilizando el motor core. Ofrecer funcionalidad offline y sincronización limitada.
- **Tareas**:
  - Evaluar frameworks (Flutter, React Native).
  - Crear prototipo con el motor TypeScript adaptado.
  - Publicar en las tiendas de aplicaciones.

## Fase 6 – API pública

- **Objetivo**: Exponer una API REST o GraphQL para que terceros puedan integrar las herramientas de PedsCore en sus sistemas. Incluir autenticación y control de versiones.
- **Tareas**:
  - Diseñar la API y la documentación.
  - Implementar control de versiones y límites de uso.
  - Desplegar en un entorno seguro.
