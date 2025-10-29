# Ecom Project - Entrega para curso (Windows, sin Docker)

Contenido:
- backend/ : Node.js + Express API (puerto 3000)
- frontend/ : static frontend + small proxy server (puerto 5000)
- tests/postman/ : Postman collection (JSON)
- tests/k6/ : k6 load test script
- backend/Jenkinsfile : pipeline declarativo para Jenkins (asume SonarQube y Sonar token configurado)
- backend/sonar-project.properties : SonarQube config

## Requisitos en Windows (pasos resumidos)
1. Instala Node.js (versión 18+). https://nodejs.org/
2. Asegúrate de tener Git instalado.
3. Jenkins y SonarQube ya los tienes instalados localmente según tu indicación.
4. (Opcional) Instala sonar-scanner CLI: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

## Levantar la aplicación local (sin Docker)
Abre una terminal (PowerShell o CMD) y en dos ventanas:
1) Backend:
  cd path\to\ecom_project\backend
  npm install
  npm test        # verifica tests
  npm start       # levanta backend en http://localhost:3000

2) Frontend:
  cd path\to\ecom_project\frontend
  npm install
  npm start
  # frontend servirá en http://localhost:5000, y hace proxy a backend en localhost:3000

## Jenkins - crear job (Pipeline)
- Crea un job tipo Pipeline.
- En "Pipeline script from SCM" selecciona Git y apunta al repo (o usa workspace local).
- Asegura que en Jenkins tengas:
  - NodeJS en PATH (o instala plugin NodeJS y configura)
  - Credencial tipo "Secret text" con ID `SONAR_TOKEN_ID` que contenga el token de SonarQube.
  - SonarScanner CLI instalado en el nodo Jenkins o en PATH.
- Jenkinsfile ya incluido en backend/Jenkinsfile — el pipeline corre:
  - npm ci
  - npm test
  - sonar-scanner (requiere SONAR_TOKEN_ID)

## SonarQube
- Inicia SonarQube (local).
- Crea un token de usuario en Sonar > My Account > Security > Generate Token.
- Guarda ese token en Jenkins credentials como `SONAR_TOKEN_ID`.
- Ejecuta el pipeline en Jenkins; Sonar results aparecerán en http://localhost:9000

## Postman
- Importa `tests/postman/ecom_collection.json`.
- Ejecuta colección (o usa Newman con `newman run ecom_collection.json`).

## Pruebas de carga (k6)
- Instala k6 en Windows: https://k6.io/docs/getting-started/installation/
- Ejecuta:
  k6 run tests/k6/loadtest.js

## Evidencias a capturar
- Screenshot de Jenkins ejecutando pipeline y etapas (tests, Sonar).
- Screenshot del dashboard SonarQube (issues, coverage).
- Screenshot de Postman mostrando tests pasados.
- Output de k6 (captura de consola).
- Resultado de `npm test` (captura).

## Notas sobre ramas (DEV / QA / PROD)
1. Usa `DEV` para desarrollo diario.
2. Cuando funcione, crea PR a `QA` y ejecuta pipeline.
3. Después de QA, crea PR a `PROD`.

## Qué más puedo hacer por ti
- Explicar paso a paso cómo crear el job en Jenkins (screenshots).
- Generar el ZIP con este proyecto (ya generado abajo).
- Preparar un documento Word con capturas de ejemplo (puedo crear plantillas).
