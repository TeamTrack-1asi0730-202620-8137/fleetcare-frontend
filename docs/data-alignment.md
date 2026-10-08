# Data alignment

`server/db.json` uses the 17 collections from `fleetcare-database-v2.graphql` and preserves the field names of that model. No extra JSON Server collections were added for prototype-only master data.

The prototype included Workshops, Vehicle Types and Incident Types under Master Data. Those entities are not part of the relational model v2, so this version keeps them only as a presentation reference in `/master-data`. Drivers are backed by `userAccounts` with `roleId = 2`.

The database model v2 also does not define `fuelType` on Vehicle or `severity` on Incident, so those fields are not persisted in this version even though earlier UX/HU drafts referenced them. They should only be added after the relational model is updated.
