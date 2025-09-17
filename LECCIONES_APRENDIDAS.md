## 1. Contexto  
  
Durante la creación de este proyecto se buscó implementar un sistema de **preguntas y respuestas multi-turno** sobre datos específicos, utilizando la plantilla **Azure Multi-Round Q&A on Your Data**.  
  
La solución debía permitir a los usuarios mantener una conversación interactiva con el sistema, donde cada pregunta pudiera tener en cuenta el contexto de las interacciones anteriores.  
  
En el desarrollo de aplicaciones en Azure, se trabajó con:  
  
- **Entornos locales** para desarrollo y pruebas.  
- **Entornos en la nube** para despliegue.  
- **Control de versiones con Git/GitHub** para colaboración y gestión del código.  
  
Se integraron varios servicios y tecnologías clave:  
  
- **Azure OpenAI**: encargado de interpretar y procesar el lenguaje natural, entendiendo las consultas y generando respuestas precisas.  
- **Azure Functions**: para ejecutar lógica serverless que conectara el modelo de IA con los datos específicos de la organización.  
- **Azure Storage** y **Azure Static Web Apps**: para el almacenamiento y despliegue de la interfaz de usuario.  
- **GitHub Actions**: para la automatización del flujo de integración y despliegue continuo (CI/CD).  
  
Este proyecto sirvió no solo como ejercicio técnico, sino como una oportunidad para establecer prácticas y patrones reutilizables en futuros desarrollos que requieran capacidades conversacionales avanzadas en un entorno cloud.  
  
---  
  
## 2. Preparación del Entorno de Desarrollo  
  
### 2.1 Entorno Local  
  
Para el desarrollo en local se estableció un entorno de trabajo optimizado que permitiera una integración fluida con los servicios de Azure y un ciclo de pruebas ágil.  
  
Las configuraciones y herramientas utilizadas fueron las siguientes:  
  
- **Visual Studio Code** como editor principal, con extensiones específicas para:  
  - Python  
  - Azure Functions  
  - GitHub  
- **Entornos virtuales** con `venv` para aislar las dependencias del proyecto y evitar conflictos con otras instalaciones de Python.  
- **Pruebas iniciales con `curl`** para verificar los puntos de conexión expuestos por las funciones y servicios antes de integrarlos en la solución final.  
- **Control de versiones con Git**, trabajando en ramas de desarrollo locales antes de subir cambios a GitHub.  
- Uso de **archivos `.env`** para almacenar credenciales y variables sensibles en local, evitando exponerlas en el repositorio.  
- Ejecución y depuración local de **Azure Functions** mediante la extensión oficial de VS Code, permitiendo simular la interacción con el modelo de IA antes del despliegue.  
- Instalar dependencias desde un archivo de requisitos (`requirements.txt` o `package.json` en proyectos Node.js).  
- Mantener la misma versión de lenguaje local y en la nube para evitar incompatibilidades.  
  
### 2.2 Entorno en la Nube (Azure)  
  
En la nube se configuró una infraestructura en **Microsoft Azure** para hospedar y operar la solución de manera escalable y segura.  
  
Las principales acciones y configuraciones realizadas fueron:  
  
- **Creación de recursos en Azure**:  
  - **Azure Functions** para la ejecución de la lógica backend sin necesidad de servidores dedicados.  
  - **Azure Storage** para almacenamiento de datos y archivos estáticos.  
  - **Azure Static Web Apps** para el despliegue de la interfaz web.  
- **Configuración de claves y variables de entorno** mediante **Azure Key Vault**, garantizando la seguridad y centralización de credenciales y secretos.  
- **Integración con Azure OpenAI** para el procesamiento del lenguaje natural, conectando el servicio a las funciones backend y ajustando los modelos a las necesidades del proyecto.  
- **Implementación de CI/CD** con **GitHub Actions** para automatizar el despliegue de cambios desde el repositorio hacia los servicios en Azure.  
- **Pruebas de conectividad** y validación de endpoints desde la nube, asegurando que la comunicación entre servicios fuera estable y segura.  
- **Configuración de escalado automático** en Azure Functions para soportar picos de demanda sin intervención manual.    
  *No se realizó.*  
  
---  
  
## 3. Buenas Prácticas con Git y GitHub  
  
Durante el desarrollo del proyecto, se adoptaron buenas prácticas para el uso de Git y GitHub con el objetivo de mantener un historial de cambios claro, facilitar la colaboración entre desarrolladores y minimizar errores en la integración del código.  
  
### 3.1 Modelo de Ramas (*Branching Model*)  
  
Se utilizó la estrategia solo de una rama:  
  
- **master**: rama principal y estable, siempre lista para desplegar en producción.  
  
### 3.2 Revisiones de Código (*Code Review*)  
  
- Todo cambio importante se integró mediante *pull requests*.  
- Las revisiones incluían:  
  - Validación del cumplimiento de estándares de codificación.  
  - Verificación de que las pruebas locales pasaran correctamente.  
  - Revisión de seguridad (evitar exposición de credenciales o datos sensibles).  
  
### 3.3 Convenciones en Mensajes de Commit  
  
Se siguió una convención basada en texto explicativo para identificar el tipo de cambio realizado.  
  
### 3.4 Sincronización y Limpieza de Ramas  
  
- Actualización frecuente de ramas locales con los cambios remotos para evitar conflictos.  
  
**Beneficio clave:** La aplicación disciplinada de estas prácticas permitió que el equipo trabajara en paralelo sin generar conflictos importantes, y que el código desplegado siempre fuera estable y verificable.  
  
---  
  
## 4. Ejemplo de Pipeline con GitHub Actions para Azure Functions integradas en Static Web Apps  
  
Para automatizar el despliegue de las **Azure Functions** que forman parte de una **Azure Static Web App**, se configuró un *pipeline* utilizando **GitHub Actions**.  
  
En este escenario, las funciones se publican dentro de la propia Static Web App y quedan accesibles bajo la ruta `/api/<nombre-función>`. Esto permite mantener en un mismo recurso de Azure tanto la parte estática (frontend) como la API serverless, simplificando la arquitectura y el proceso de despliegue.  
  
El flujo se ejecuta automáticamente cada vez que se realiza un *push* a la rama `master`. El pipeline se encarga de:  
  
1. Descargar el código fuente desde GitHub.  
2. Instalar dependencias.  
3. Construir la aplicación (frontend y/o backend).  
4. Desplegar la Static Web App con las Azure Functions incluidas.  
  
### Archivo de configuración (`.github/workflows/deploy-static-web-app.yml`)  
  
```yaml  
name: Deploy Azure Static Web App (Frontend + API)  
  
on:  
  push:  
    branches:  
      - main  
  
jobs:  
  build-and-deploy:  
    runs-on: ubuntu-latest  
    name: Build and Deploy Job  
    steps:  
      - name: Checkout del código  
        uses: actions/checkout@v3  
  
      - name: Build and Deploy  
        uses: Azure/static-web-apps-deploy@v1  
        with:  
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}  
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Se usa para PRs y comentarios automáticos  
          action: "upload"  
          app_location: "/"        # Carpeta raíz del frontend (por ejemplo "app" o "frontend")  
          api_location: "api"      # Carpeta donde se encuentran las Azure Functions  
          output_location: "build" # Carpeta de salida tras el build del frontend
 

## 5. Ejemplo de Pipeline con GitHub Actions para Azure Static Web Apps  
  
Para automatizar el despliegue de la interfaz web alojada en **Azure Static Web Apps**, se implementó un *pipeline* con **GitHub Actions**.    
  
Este flujo permite que, con cada cambio en la rama `main`, la aplicación web se construya y se publique automáticamente en Azure.  
  
### Archivo de configuración (`.github/workflows/deploy-static-webapp.yml`)  
  
name: Deploy Azure Static Web App  
  
on:  
  push:  
    branches:  
      - main  
  
jobs:  
  build-and-deploy:  
    runs-on: ubuntu-latest  
    name: Build and Deploy Job  
    steps:  
      - uses: actions/checkout@v3  
  
      - name: Build and Deploy  
        uses: Azure/static-web-apps-deploy@v1  
        with:  
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}  
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Necesario para PR comments  
          action: "upload"  
          #### Configura las rutas de tu proyecto:  
          app_location: "/" # Ruta de la app (por ejemplo: "/app" o "/")  
          api_location: "api" # Ruta de la API (si existe, o deja vacío "")  
          output_location: "build" # Carpeta de salida después del build  
  
---  
  
## 6. Pruebas con `curl`  
  
Durante el proceso de desarrollo y despliegue, se realizó un cambio en el **endpoint** de la API, lo que implicó ajustar la configuración y realizar pruebas adicionales para asegurar el correcto funcionamiento.  
  
Para validar la disponibilidad y respuesta del nuevo endpoint, se utilizaron comandos `curl` desde la terminal:  
  
# Ejemplo de prueba GET  
curl -X GET "https://nuevo-endpoint.azurewebsites.net/api/funcion" \  
     -H "Content-Type: application/json"  
  
# Ejemplo de prueba POST con datos en JSON  
curl -X POST "https://nuevo-endpoint.azurewebsites.net/api/funcion" \  
     -H "Content-Type: application/json" \  
     -d '{"param1":"valor1","param2":"valor2"}'  
  
---  
  
## 7. Conclusiones  
  
El desarrollo e implementación de la solución utilizando **Azure Functions**, **Azure Static Web Apps** y **GitHub Actions** demostró que es posible construir y desplegar aplicaciones escalables, seguras y con un flujo de trabajo ágil, aprovechando servicios en la nube y herramientas de automatización.  
  
- **Automatización efectiva**: Los pipelines configurados en GitHub Actions redujeron el tiempo de despliegue y minimizaron errores humanos.  
- **Escalabilidad y flexibilidad**: La arquitectura sin servidor de Azure Functions permitió manejar cargas variables sin necesidad de administración de infraestructura.  
- **Integración continua fluida**: La estrategia de ramas y revisiones de código en Git/GitHub facilitó la colaboración y mantuvo la estabilidad del código en producción.  
- **Seguridad integrada**: El uso de Azure Key Vault y GitHub Secrets garantizó la protección de credenciales y variables sensibles.  
  
### 8. Lecciones Aprendidas  
  
- **Documentación como parte del proceso**: Registrar configuraciones, comandos y decisiones técnicas ahorra tiempo y reduce errores en el futuro.  
- **Pruebas locales antes del despliegue**: Validar cambios en el entorno local previene fallos en producción y acelera la entrega.  
- **Monitoreo post-despliegue**: Implementar alertas y seguimiento de logs en Azure es clave para detectar y resolver incidencias rápidamente.  
- **Mantener pipelines simples y claros**: Workflows fáciles de entender facilitan el mantenimiento y la incorporación de nuevos miembros al equipo.  
- La **configuración inicial** (estructura, `.gitignore`, ramas) evita la mayoría de problemas.  
- No mezclar **archivos locales o temporales** en el repositorio.  
- Mantener el **entorno local sincronizado** con el de la nube.  
- Documentar pasos críticos y problemas resueltos para el equipo.  
  
En resumen, la combinación de **Azure** y **GitHub Actions** proporcionó un marco de trabajo adecuado para el desarrollo, despliegue y mantenimiento de la solución, con una curva de aprendizaje inicial compleja.  
  
---  
  
## 9. Conocimientos Recomendados para el Equipo  
  
Para garantizar el correcto desarrollo, despliegue y mantenimiento de la solución, el equipo debe contar con conocimientos y competencias en las siguientes áreas:  
  
### 9.1 Cloud Computing y Azure  
- Fundamentos de **Microsoft Azure** y su modelo de servicios (IaaS, PaaS, SaaS).  
- Configuración y administración de:  
  - **Azure Functions** (desarrollo, despliegue y escalado).  
  - **Azure Static Web Apps**.  
  - **Azure Storage** y **Azure Key Vault**.  
- Uso de **Azure Portal**, **Azure CLI** y **Azure Foundry**.  
  
### 9.2 Control de Versiones con Git y GitHub  
- Flujo de trabajo con ramas (*branching model*).  
- Creación y revisión de *pull requests*.  
- Resolución de conflictos y sincronización de repositorios.  
- Uso de **GitHub Actions** para CI/CD.  
- Clonar repositorios, crear ramas, hacer commits, merges y rebases.  
  
### 9.3 Desarrollo Backend y Frontend  
- **Backend**:  
  - Programación en **Python** (lenguaje definido para las Azure Functions).  
  - Gestión de entornos virtuales y dependencias.  
  - Buenas prácticas de desarrollo seguro.  
- **Frontend**:  
  - HTML, CSS y JavaScript.  
  - Frameworks/librerías según el proyecto (React).  
  - Consumo de APIs y manejo de datos.  
  
### 9.4 Seguridad y DevSecOps  
- Gestión de secretos y credenciales (Azure Key Vault).  
- Principios de seguridad en el desarrollo (*secure coding*).  
- Configuración de HTTPS y control de acceso.  
- Monitoreo de vulnerabilidades en dependencias.  
  
### 9.5 Automatización y Despliegue  
- Creación y mantenimiento de pipelines en GitHub Actions.  
- Pruebas automatizadas y validaciones previas al despliegue.  
  
### 9.6 Monitoreo y Mantenimiento  
- Uso de **Azure Monitor** y **Application Insights**.  
- Interpretación de logs y métricas.  
- Respuesta ante incidentes y gestión de alertas.  
  
### 9.7 Lenguaje del Proyecto  
- Python, Node.js, etc.  
- Uso de entornos virtuales o gestión de dependencias.  
- Estructura de proyectos.  
  
---  
  
**Resumen:**    
Un equipo con dominio en **Azure**, **Git/GitHub**, desarrollo de aplicaciones web y prácticas de seguridad, combinado con habilidades de automatización y monitoreo, podrá desarrollar y mantener la solución de forma eficiente, segura y escalable.  
