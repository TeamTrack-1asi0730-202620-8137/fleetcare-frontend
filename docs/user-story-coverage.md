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

- List scheduled maintenance.
- Schedule maintenance by date/mileage.
- Optionally relate an incident.
- Register performed maintenance.
- Record work description, mileage and total cost.
- View maintenance history.

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
