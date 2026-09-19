# PedsCore Public API v1

Status: initial read-only metadata API.

Base URL: `https://peds-core.vercel.app/api/v1`

## Scope

API v1 deliberately exposes **clinical tool metadata, provenance, availability and review state**. It does not accept patient data and it does not calculate clinical scores.

This first release is therefore suitable for:

- catalog discovery;
- tool directories;
- documentation integrations;
- evidence/provenance views;
- institutional evaluation;
- client-side navigation to PedsCore tools.

It is **not** a clinical calculation API and is not an EHR decision endpoint.

## Endpoints

### List tools

`GET /api/v1/tools`

Optional query parameters:

- `q`: text filter across ID, slug, names and category.
- `offset`: zero-based offset.
- `limit`: page size, 1–200; default 50.

Response fields include:

- tool identity and bilingual names;
- population and description;
- implementation/calculation state;
- discovery availability;
- rights/reuse state;
- clinical risk tier;
- specialties/age groups/care settings/functions;
- review Tier;
- Tier A technical-audit status when applicable;
- independent-review status;
- reference count;
- whether a local input schema is available;
- ES/EN public links.

### Tool detail

`GET /api/v1/tools/:id-or-slug`

Examples:

- `GET /api/v1/tools/phoenix_sepsis`
- `GET /api/v1/tools/phoenix-sepsis`

Adds:

- validation/calculation notes;
- references;
- interpretation bands for local tools;
- input schema for local calculations.

## Rights safety

The API does **not** expose questionnaire/form content or operational input schemas for tools that are not `local_active`.

For rights-limited or external-only surfaces:

- identification and provenance may be returned;
- source links and reuse status may be returned;
- `inputs` and `interpretationBands` are returned as `null`.

This prevents the API from becoming a backdoor reproduction of protected instruments.

## Privacy

The API:

- accepts no patient identifiers;
- accepts no clinical form values;
- creates no user profile;
- exposes no analytics secrets;
- is GET/HEAD/OPTIONS only.

CORS is enabled because responses contain public metadata only.

## Versioning

Breaking changes require a new path such as `/api/v2`.

The `catalogVersion` field currently follows the repository package version. Clinical review state remains commit-specific where applicable.

## Calculation API

A future calculation endpoint, if added, will be a separate design and rights review. It must:

- be restricted to tools whose reuse status permits it;
- use the same deterministic engines as the web product;
- validate eligibility and units server-side;
- never log clinical inputs;
- document version/commit and source;
- remain separate from this metadata endpoint.
