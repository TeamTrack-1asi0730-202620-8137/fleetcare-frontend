# FleetCare Frontend v6

This version keeps the five FleetCare bounded contexts and uses the useful infrastructure pattern from the Learning Center reference.

`View -> Pinia Store -> Context API -> BaseEndpoint -> BaseApi -> JSON Server`

Main bounded contexts:

- Fleet Management
- Inspection Management
- Incident Management
- Maintenance Management
- Vehicle Operations Management

Supporting/transversal modules:

- User Access and Roles
- Dashboard Overview
- Administration / Master Data prototype reference

Each context owns `application`, `domain`, `infrastructure`, and `presentation`. Presentation contains reusable `components`, route-level `views`, and a local `routes.js` composed by `src/router/index.js`.
