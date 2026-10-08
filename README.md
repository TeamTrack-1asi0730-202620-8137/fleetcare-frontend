# FleetCare Frontend

FleetCare es una aplicación web desarrollada con Vue 3 para la gestión operativa de flotas de transporte ligero. El frontend está organizado por Bounded Contexts y utiliza JSON Server como backend local simulado.

## Technologies

- Vue 3
- Vite
- Pinia
- Vue Router
- PrimeVue
- PrimeIcons
- Vue I18n
- Axios
- JSON Server
- Prettier

## Architecture

El proyecto se organiza por Bounded Contexts y mantiene separación entre las capas:

```text
application
domain
infrastructure
presentation
```

Los principales contextos funcionales son:

```text
fleet-management
inspection-management
incident-management
maintenance-management
vehicle-operations
```

Además se incluyen capacidades compartidas:

```text
user-access
dashboard-overview
administration
shared
```

La comunicación con JSON Server se centraliza mediante componentes reutilizables dentro de `shared/infrastructure`:

```text
shared/
└── infrastructure/
    ├── base-api.js
    └── base-endpoint.js
```

`BaseApi` centraliza la configuración de Axios y `BaseEndpoint` proporciona las operaciones HTTP comunes utilizadas por los diferentes contextos.

El flujo general es:

```text
View
→ Pinia Store
→ API del contexto
→ BaseEndpoint
→ BaseApi
→ JSON Server
```

## Run

Instalar las dependencias:

```bash
npm install
```

Levantar JSON Server:

```bash
npm run server
```

En otra terminal, levantar la aplicación Vue:

```bash
npm run dev
```

Por defecto:

```text
Frontend:
http://localhost:5173

JSON Server:
http://localhost:3000
```

La aplicación puede abrirse desde:

```text
http://localhost:5173
```

Desde allí se accede a las rutas públicas o autenticadas definidas en Vue Router.

## Demo user

Para iniciar sesión se puede utilizar:

```text
Email:
carlos@fleetcare.local

Password:
FleetCare123!
```

Este usuario representa al jefe de flota utilizado para validar las principales funcionalidades de FleetCare.

## JSON Server

Los datos de prueba se encuentran en:

```text
server/db.json
```

El modelo mantiene correspondencia con el diseño de base de datos definido para FleetCare.

JSON Server expone endpoints REST para las siguientes colecciones:

```text
/api/fleets
/api/roles
/api/userAccounts
/api/passwordResetTokens

/api/vehicles

/api/checklists
/api/checklistItems
/api/inspections
/api/inspectionResults
/api/inspectionEvidences

/api/incidents
/api/incidentEvidences

/api/maintenancePlans
/api/maintenanceRecords
/api/maintenanceParts

/api/mileageRecords
/api/fuelRecords
```

Ejemplos de consultas:

```text
GET /api/vehicles
GET /api/vehicles/1
POST /api/vehicles
PUT /api/vehicles/1
PATCH /api/vehicles/1

GET /api/inspections?vehicleId=1
GET /api/incidents?vehicleId=1
GET /api/maintenancePlans?vehicleId=1
GET /api/mileageRecords?vehicleId=1
GET /api/fuelRecords?vehicleId=1
```

## Internationalization

FleetCare soporta español e inglés mediante Vue I18n.

Los archivos de traducción se encuentran en:

```text
src/locales/es.json
src/locales/en.json
```

El idioma seleccionado por el usuario se conserva en `localStorage`.

## Main Functional Areas

FleetCare organiza sus funcionalidades principales de acuerdo con los Bounded Contexts definidos para el proyecto.

### Fleet Management

Permite gestionar los vehículos de la flota.

Principales funcionalidades:

```text
Registrar vehículo
Consultar vehículos
Buscar y filtrar vehículos
Consultar detalle de vehículo
Editar información del vehículo
Actualizar estado operativo
```

### Inspection Management

Permite gestionar las inspecciones preoperacionales realizadas sobre los vehículos.

Principales funcionalidades:

```text
Iniciar inspección
Completar checklist
Registrar observaciones
Registrar evidencias
Consultar inspecciones
Consultar detalle e historial
```

### Incident Management

Permite registrar y realizar seguimiento a incidencias detectadas durante la operación.

Principales funcionalidades:

```text
Reportar incidencia
Registrar ubicación
Adjuntar evidencia
Consultar incidencias
Actualizar estado
Resolver incidencia
Consultar detalle e historial
```

### Maintenance Management

Permite planificar y registrar mantenimientos realizados sobre los vehículos.

Principales funcionalidades:

```text
Programar mantenimiento
Relacionar mantenimiento con una incidencia
Consultar mantenimientos próximos
Consultar mantenimientos vencidos
Registrar trabajos realizados
Registrar repuestos utilizados
Registrar costo
Consultar historial
```

### Vehicle Operations Management

Agrupa la información operativa relacionada con kilometraje y combustible.

Principales funcionalidades:

```text
Registrar kilometraje
Consultar historial de kilometraje
Registrar abastecimiento de combustible
Consultar abastecimientos
Consultar gasto de combustible
Consultar rendimiento de combustible
Consultar resumen operativo
```

## User Access and Roles

FleetCare utiliza autenticación simulada durante esta etapa del proyecto.

Los usuarios se obtienen desde:

```text
/api/userAccounts
```

Los roles se obtienen desde:

```text
/api/roles
```

Los roles considerados actualmente son:

```text
fleet_manager
driver
```

La información de sesión se conserva localmente mediante `localStorage`.

## Project Structure

La estructura principal del frontend es:

```text
src/
├── fleet-management/
├── inspection-management/
├── incident-management/
├── maintenance-management/
├── vehicle-operations/
├── user-access/
├── dashboard-overview/
├── administration/
├── shared/
├── locales/
├── router/
├── App.vue
└── main.js
```

Cada Bounded Context mantiene una estructura similar:

```text
bounded-context/
├── application/
├── domain/
├── infrastructure/
└── presentation/
    ├── components/
    ├── views/
    └── routes.js
```

## Shared Infrastructure

La carpeta `shared` contiene elementos reutilizables por los diferentes contextos.

La infraestructura HTTP común se encuentra en:

```text
src/shared/infrastructure/
```

Los principales componentes son:

```text
base-api.js
base-endpoint.js
```

`BaseApi` contiene la configuración base utilizada para conectarse al servidor local.

`BaseEndpoint` encapsula operaciones REST comunes como:

```text
getAll()
getById()
create()
update()
patch()
delete()
```

De esta manera, cada Bounded Context reutiliza la misma infraestructura HTTP y evita duplicar lógica de comunicación con JSON Server.

## Routing

Cada contexto define sus rutas dentro de su propia capa de presentación:

```text
presentation/routes.js
```

El router principal se encuentra en:

```text
src/router/index.js
```

Este archivo centraliza y compone las rutas de los diferentes módulos de FleetCare.

## UI

La interfaz utiliza principalmente componentes de PrimeVue y PrimeIcons.

Esto permite mantener componentes visuales consistentes para:

```text
Buttons
Inputs
Dialogs
Tables
Messages
Tags
Dropdowns
Passwords
Forms
```

El diseño visual utiliza principalmente la paleta Indigo definida para FleetCare y mantiene una estructura responsive basada en:

```text
Topbar
Sidebar
Main content
```

## Local Data

Los datos de prueba representan una pequeña empresa de transporte ligero ubicada en Lima Metropolitana.

La información incluye datos para validar:

```text
Vehículos
Conductores
Inspecciones
Incidencias
Mantenimientos
Kilometraje
Combustible
Usuarios
Roles
```

Los registros se relacionan mediante identificadores, manteniendo coherencia con el diseño relacional definido para FleetCare.
