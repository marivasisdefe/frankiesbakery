Tabla de contenidos:

Propósito del Sistema
Arquitectura del Sistema
Componentes Principales
Funcionalidades Clave - Secciones de Boletín
Tecnologías y Herramientas de Desarrollo
Flujo de Despliegue CI/CD

<img width="818" height="525" alt="image" src="https://github.com/user-attachments/assets/23719e16-0ac7-4141-9f5f-3b30ef034723" />

1. Propósito del Sistema<img width="515" height="90" alt="image" src="https://github.com/user-attachments/assets/916af3b9-d2ae-4276-9fc7-89961685a44a" />

https://orange-mud-0052bee03.4.azurestaticapps.net<img width="749" height="63" alt="image" src="https://github.com/user-attachments/assets/be677a72-34cc-45f6-8275-3ce17fe99a1a" />

El sistema es una aplicación conversacional de IA diseñada para generar documentos de boletín estructurados a través de interacciones basadas en chat
<img width="1902" height="63" alt="image" src="https://github.com/user-attachments/assets/29de95d1-7bcb-4d9c-91bb-a00e459359cb" />

2. Arquitectura del Sistema<img width="565" height="90" alt="image" src="https://github.com/user-attachments/assets/c002b548-a104-4782-aa2f-0d1d87a1a43c" />

La aplicación sigue un patrón de arquitectura serverless construido sobre Azure Static Web Apps .
<img width="1105" height="56" alt="image" src="https://github.com/user-attachments/assets/5c996413-f717-4287-bf5b-5a9b7818f21c" />
Integrando múltiples Azure Functions para procesamiento backend y servicios externos de Azure Foundry ML para inferencia de IA .
Componentes Principales:
1. Interfaz Frontend
Una aplicación de página única con múltiples áreas funcionales integradas en un documento HTML
Panel de administración para gestión de archivos
Dos interfaces de chat independientes
Generador de documentos Word
<img width="1357" height="322" alt="image" src="https://github.com/user-attachments/assets/86878ce4-55bc-4ed8-b805-eb47eb723080" />

Integrando múltiples Azure Functions para procesamiento backend y servicios externos de Azure Foundry ML para inferencia de IA .
Componentes Principales:
2. Servicios BackendTres Azure Functions independientes:
/api/chat - Generación de boletines estructurados 
/api/chat2 - Chat general con diferentes prioridades de fuentes de datos 
/api/generateword - Creación de documentos Word
<img width="1357" height="307" alt="image" src="https://github.com/user-attachments/assets/1f679e85-3e7b-4e7a-883f-4475269b305f" />

3. Componentes Principales<img width="585" height="90" alt="image" src="https://github.com/user-attachments/assets/712ebaaf-e6d3-430d-b663-10c79daa7012" />

Interfaz Frontend

<img width="254" height="63" alt="image" src="https://github.com/user-attachments/assets/09a1e0c0-f7b2-4d31-9866-ce3d2daeebca" />
Una aplicación de página única con múltiples áreas funcionales integradas en un documento HTML
<img width="1250" height="63" alt="image" src="https://github.com/user-attachments/assets/e33ae01a-1e7a-418b-bd30-12c08d0bddf8" />

4. Funcionalidades Clave - Secciones de Boletín<img width="961" height="90" alt="image" src="https://github.com/user-attachments/assets/c671a748-50a0-4add-a7fe-b08edf383abc" />
El sistema reconoce secciones predefinidas con nombres exactos para la generación de boletines
<img width="1225" height="63" alt="image" src="https://github.com/user-attachments/assets/301bba4e-fe78-4d35-9180-1eb8495674da" />

5. Tecnologías y Herramientas de Desarrollo<img width="889" height="90" alt="image" src="https://github.com/user-attachments/assets/4b0e8e9f-ffaf-4bf6-94fe-7f5767e08b7a" />

Desarrollo local con Visual Studio Code y entornos virtuales Python , integrado con servicios Azure para una solución serverless completa.
<img width="1729" height="63" alt="image" src="https://github.com/user-attachments/assets/5a016719-874f-4e39-8417-dfbefaed10d2" />

6. Flujo de Despliegue CI/CD<img width="591" height="90" alt="image" src="https://github.com/user-attachments/assets/edbdc2e6-1ae7-4366-b220-f126222e61da" />
Implementación de CI/CD con GitHub Actions para automatizar el despliegue desde el repositorio hacia los servicios en Azure
<img width="1576" height="63" alt="image" src="https://github.com/user-attachments/assets/6c8d6dfa-2c18-447e-a4df-ab978941766f" />








