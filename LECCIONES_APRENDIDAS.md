cat > LECCIONES_APRENDIDAS.md << 'EOF'  
## 1. Contexto  
En el desarrollo de aplicaciones en Azure, es habitual trabajar con:  
- **Entornos locales** para desarrollo y pruebas.  
- **Entornos en la nube** para despliegue y producción.  
- **Control de versiones con Git/GitHub** para colaboración y gestión del código.  
- **Azure Functions, Static Web Apps, Web Apps o Contenedores** como entornos de ejecución.  
  
Este documento resume las lecciones aprendidas y buenas prácticas para evitar problemas y optimizar el flujo de trabajo.  
  
---  
  
## 2. Preparación del Entorno de Desarrollo  
  
### 2.1 Entorno Local  
- Usar un **entorno virtual de Python** (\`.venv\`) o contenedores Docker para aislar dependencias.  
- Instalar dependencias desde un archivo de requisitos (\`requirements.txt\` o \`package.json\` en proyectos Node.js).  
- Mantener la misma versión de lenguaje local y en la nube para evitar incompatibilidades.  
  
**Lección:**  
Nunca subir la carpeta \`.venv\` o \`node_modules\` a Git; se debe regenerar en cada entorno.  
  
---  
  
### 2.2 Entorno en la Nube (Azure)  
- Configurar **Azure Static Web Apps**, **Azure Functions** o el recurso correspondiente.  
- Usar **Azure DevOps** o **GitHub Actions** para despliegues automáticos.  
- Configurar **variables de entorno y secretos** desde el portal de Azure (no en el código).  
  
**Lección:**  
Separar configuración de código para permitir despliegues en múltiples entornos (desarrollo, pruebas, producción).  
  
---  
  
## 3. Buenas Prácticas con Git y GitHub  
  
### 3.1 Configuración Inicial  
- Crear un \`.gitignore\` adecuado para el lenguaje y herramientas usadas. Ejemplo para Python + VSCode:  
\`\`\`gitignore  
# Entorno virtual  
**/.venv/  
  
# Archivos compilados  
*.pyc  
__pycache__/  
  
# Configuración local de VSCode  
.vscode/  
  
# Dependencias Node.js  
node_modules/  
\`\`\`  
- Usar ramas (\`main/master\`, \`develop\`, \`feature/... \`, \`hotfix/... \`) para organizar el trabajo.  
  
---  
  
### 3.2 Flujo de Trabajo Recomendado  
1. **Actualizar la rama local** antes de empezar:  
\`\`\`bash  
git pull --rebase origin develop  
\`\`\`  
2. **Crear una rama para cada nueva funcionalidad**:  
\`\`\`bash  
git checkout -b feature/nueva-funcionalidad  
\`\`\`  
3. **Commits pequeños y descriptivos**:  
\`\`\`bash  
git commit -m "feat: añade API para generar palabras"  
\`\`\`  
4. **Pull Request (PR)** para revisión antes de integrar cambios.  
  
---  
  
### 3.3 Resolución de Problemas Comunes  
- **Conflictos en merge/rebase**:  
    - Editar los archivos con conflicto eliminando las marcas \`<<<<<<<\`, \`=======\`, \`>>>>>>>\`.  
    - Mantener la versión correcta o fusionar manualmente.  
    - Marcar como resuelto:  
    \`\`\`bash  
    git add archivo  
    git rebase --continue  
    \`\`\`  
- **Archivos innecesarios en el repo**:  
    - Añadir al \`.gitignore\`.  
    - Eliminar del índice sin borrarlos del disco:  
    \`\`\`bash  
    git rm -r --cached carpeta  
    \`\`\`  
  
---  
  
## 4. Ejemplo de Pipeline con GitHub Actions para Azure Functions  
  
📄 \`.github/workflows/deploy-azure-function.yml\`  
\`\`\`yaml  
name: Deploy Azure Function  
  
on:  
  push:  
    branches:  
      - main  
  
jobs:  
  build-and-deploy:  
    runs-on: ubuntu-latest  
  
    steps:  
      - name: Checkout del código  
        uses: actions/checkout@v3  
  
      - name: Configurar Python  
        uses: actions/setup-python@v4  
        with:  
          python-version: '3.10'  
  
      - name: Instalar dependencias  
        run: |  
          python -m pip install --upgrade pip  
          pip install -r requirements.txt  
  
      - name: Publicar en Azure Functions  
        uses: Azure/functions-action@v1  
        with:  
          app-name: NOMBRE_DE_TU_FUNCTION_APP  
          package: '.'  
        env:  
          AZURE_FUNCTIONAPP_PUBLISH_PROFILE: \${{ secrets.AZURE_FUNCTIONAPP_PUBLISH_PROFILE }}  
\`\`\`  
  
---  
  
## 5. Ejemplo de Pipeline con GitHub Actions para Azure Static Web Apps  
  
📄 \`.github/workflows/deploy-static-web-app.yml\`  
\`\`\`yaml  
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
          azure_static_web_apps_api_token: \${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}  
          repo_token: \${{ secrets.GITHUB_TOKEN }}  
          action: "upload"  
          app_location: "/" # Carpeta raíz de tu app (por ejemplo, "app" o "frontend")  
          api_location: "api" # Si tienes API, carpeta donde está (opcional)  
          output_location: "build" # Carpeta de salida tras el build  
\`\`\`  
  
---  
  
## 6. Lecciones Clave  
- La **configuración inicial** (estructura, \`.gitignore\`, ramas) evita la mayoría de problemas.  
- No mezclar **archivos locales o temporales** en el repositorio.  
- Mantener el **entorno local sincronizado** con el de la nube.  
- Documentar pasos críticos y problemas resueltos para el equipo.  
- Usar **ramas y PR** para mantener calidad y control de cambios.  
- Automatizar despliegues con **CI/CD** reduce errores humanos y acelera entregas.  
  
---  
  
## 7. Conocimientos Recomendados para el Equipo  
Para desarrollar de forma fluida un proyecto Azure con GitHub, es recomendable que el equipo tenga conocimientos en:  
  
**Git y GitHub:**  
- Clonar repositorios, crear ramas, hacer commits, merges y rebases.  
- Resolver conflictos.  
- Buenas prácticas de commits y PR.  
  
**Lenguaje del proyecto:**  
- Python, Node.js, etc.  
- Uso de entornos virtuales o gestión de dependencias.  
- Estructura de proyectos.  
  
**Azure:**  
- Creación y configuración de recursos (Static Web Apps, Functions, App Service, Storage, etc.).  
- Uso de Azure CLI y Portal.  
- Configuración de variables de entorno y secretos.  
  
**Integración y Despliegue Continuo (CI/CD):**  
- Configuración de GitHub Actions o Azure Pipelines.  
- Estrategias de despliegue (staging, producción).  
  
---  
  
## 8. Procedimiento Recomendado para un Proyecto Típico  
1. Inicializar el repositorio en GitHub con \`.gitignore\` y \`README\`.  
2. Configurar entorno local (\`.venv\` o dependencias Node.js).  
3. Desarrollar en ramas de funcionalidad y hacer PR para revisión.  
4. Probar localmente antes de subir cambios.  
5. Configurar despliegue automático a Azure desde GitHub.  
6. Mantener documentación actualizada (\`README.md\`, \`LECCIONES_APRENDIDAS.md\`).  
  
---  
  
## 9. Lecciones aprendidas del cambio de punto de conexión y pruebas con \`curl\`  
  
Durante la actualización del **endpoint** de Azure Machine Learning y su integración con Azure Functions, encontramos varios problemas y soluciones que vale la pena documentar:  
  
### 9.1 Problemas encontrados  
- **Error \`key_auth_bad_header_forbidden\`**: la cabecera \`Authorization\` no estaba bien formada o se estaba enviando mal desde \`curl\` por errores en el formato/comillas.  
- **Error \`key_auth_access_denied\`**: la API key usada no correspondía al endpoint configurado o no tenía permisos.  
- Errores en \`curl\` en **Git Bash** debido al uso incorrecto de barras invertidas \`\\\` y comillas, lo que hacía que las opciones \`-H\` y \`-d\` se interpretaran como comandos separados.  
- Endpoint actualizado en el código, pero la clave no se actualizó en las **variables de entorno** de Azure, provocando fallos en producción.  
  
### 9.2 Cómo se diagnosticó  
- Se probó **primero el endpoint directo** con \`curl\` para aislar el problema y confirmar si el fallo estaba en Azure ML o en la Azure Function.  
- Se comparó el **payload JSON** enviado desde la Function con el que enviaba \`curl\`.  
- Se revisó en el portal de Azure la sección **Keys and Endpoint** para verificar URL y API key.  
- Se ejecutaron pruebas en **local** y en **nube** para identificar diferencias de configuración.  
  
### 9.3 Solución aplicada  
1. Copiar la **Primary Key correcta** desde Azure ML → Endpoint → Keys and Endpoint.  
2. Actualizar la variable de entorno \`AZURE_FOUNDARY_KEY\` tanto en local como en Azure Function App.  
3. Probar el endpoint directamente con \`curl\` en **Git Bash**, cuidando el formato:  
   \`\`\`bash  
   curl -X POST "https://<ENDPOINT>.inference.ml.azure.com/score" \\  
     -H "Content-Type: application/json" \\  
     -H "Authorization: Bearer TU_API_KEY" \\  
     -d "{\\"chat_input\\": \\"Hola, ¿cómo estás?\\"}"  
   \`\`\`  
4. Confirmar que la respuesta incluía \`chat_output\` antes de retomar pruebas con la Function.  
  
### 9.4 Buenas prácticas extraídas  
- **Siempre validar primero el endpoint directo** antes de culpar a la Function o al frontend.  
- **Mantener sincronizadas las variables de entorno** entre local y nube después de cambios en claves o endpoints.  
- En **Git Bash**, evitar errores de sintaxis en \`curl\` usando:  
  - Una sola línea, o  
  - Barras invertidas \`\\\` sin espacios al final y comillas escapadas correctamente.  
- Documentar comandos de prueba en el repositorio para que cualquier miembro del equipo pueda reproducirlos.  
- Cuando se cambie el endpoint o clave en Azure, **actualizar inmediatamente la configuración** de CI/CD y del recurso en Azure.  
EOF  