# User Story Coverage

This implementation prioritizes the FleetCare web application flows defined in the report and prototypes.

## Fleet Management — EP01

- Register vehicle.
- List fleet vehicles.
- Search/filter vehicles.
- View vehicle detail.
- Edit vehicle data and operational status.

## Inspection Management — EP02

- List inspections.
- Start/register a pre-operational inspection.
- Complete checklist results.
- Register observations.
- View inspection detail and results.

## Incident Management — EP03

- List incidents.
- Report incident.
- Register location/address.
- Edit incident information.
- View incident detail.
- Resolve incident with resolution notes.

## Maintenance Management — EP04

- US24 — Schedule maintenance by target date (required fields validated; only vehicles of the manager's fleet).
- US25 — Schedule maintenance by target mileage (must be greater than the vehicle's current mileage).
- US26 — List upcoming maintenance with vehicle, type and target date/mileage; empty-state message.
- US27 — Identify overdue maintenance by target date or target mileage (current mileage taken from mileage and maintenance records), with an overdue banner and filter.
- US28 — Register performed maintenance (vehicle, type, date, mileage), optionally closing a scheduled plan.
- US29 — Register the work performed and show it in the maintenance detail.
- US30 — Register replaced parts (`maintenanceParts`: name, quantity, unit cost) and show them in the detail.
- US31 — Register the total cost (pre-filled from parts; must be greater than 0 and not lower than the parts cost).
- US32 — Maintenance history filtered by vehicle with date, mileage, type and cost; empty-state message.
- US33 — Maintenance detail (`/maintenance/records/:id`) with work, parts, notes and costs; not-found message.

## Vehicle Operations Management — EP05

- Operations overview.
- Register and list mileage records.
- Register and list fuel records.
- Show accumulated supplied liters and fuel expense.

## User Access and Roles — EP06

- Simulated sign in.
- Simulated password recovery view.
- Sign out.
- Fleet member list.
- Register driver.
- Role-based access for Fleet Manager and Driver.

## Dashboard

Cross-context summary only. It does not own domain data.

## Master Data prototype

Drivers are backed by `userAccounts`. Workshops, Vehicle Types and Incident Types remain presentation references because they are not entities in relational model v2.
