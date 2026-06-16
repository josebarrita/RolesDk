# Modelo de Roles de Datos e IA

Visualización interactiva de los roles del equipo de Datos e Inteligencia Artificial de DataKnow: niveles de carrera, progresión, interacciones y matriz RACI. Cada rol se modela como un "recurso de nube".

🔗 **App en vivo:** https://josebarrita.github.io/RolesDk/

---

## ¿Qué hace?

La aplicación presenta el modelo de roles del equipo en tres vistas:

- **Roles y flujo** — un grafo interactivo de los cuatro roles técnicos (Ingeniero de Datos, Científico de Datos, Analista BI e Ingeniero de IA). Incluye un selector de tipo de proyecto que resalta los flujos de valor que aplican a cada caso (Chatbot/LLM externo, Modelo propio, RAG corporativo, Analítica/Dashboard, Agentes SQL). Al tocar un rol se despliegan sus 5 niveles de seniority con responsabilidades, habilidades, alcance, autonomía, KPIs y criterios de promoción.
- **Agile Manager** — muestra cómo el Agile Manager orquesta la interacción con cada rol: qué facilita, qué espera, la cadencia y las fricciones típicas.
- **Matriz RACI** — tabla de actividades clave con la responsabilidad de cada rol (Accountable, Responsible, Consulted, Informed).

---

## Stack tecnológico

| Herramienta | Uso |
|-------------|-----|
| React | Librería de interfaz |
| TypeScript | Tipado estático |
| Vite | Build y servidor de desarrollo |
| Tailwind CSS | Estilos |
| lucide-react | Íconos |

---

## Ejecutar en local

Requiere [Node.js](https://nodejs.org/) (versión LTS).

```bash
# 1. Clonar el repositorio
git clone https://github.com/josebarrita/RolesDk.git
cd RolesDk

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Luego abre `http://localhost:5173/` en el navegador.

---

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila la app para producción (carpeta `dist/`) |
| `npm run preview` | Previsualiza el build de producción en local |

---

## Despliegue

El proyecto se publica automáticamente en **GitHub Pages** mediante GitHub Actions. Cada `push` a la rama `main` dispara el workflow definido en `.github/workflows/deploy.yml`, que construye la app y la publica en la rama `gh-pages`.

```bash
git add .
git commit -m "descripción del cambio"
git push
```

En 1-2 minutos los cambios quedan en línea.

---

## Estructura del proyecto

```
RolesDk/
├── .github/workflows/   # Workflow de despliegue automático
├── public/              # Archivos estáticos
├── src/
│   ├── App.tsx          # Componente principal (toda la lógica y datos)
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos base (Tailwind)
├── index.html
├── vite.config.ts       # Configuración de Vite (incluye base para GitHub Pages)
└── package.json
```

---

## Fuente del modelo

Basado en el informe interno *"Modelo de Roles del Equipo de Datos e IA"*. Revisión sugerida cada 12 meses.
