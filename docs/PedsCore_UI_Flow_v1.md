# PedsCore UI Flow v1

## Navigation Map

```text
/
├─ /es
│  ├─ /es/tools
│  ├─ /es/tools/{slug}
│  ├─ /es/categories/{category}
│  ├─ /es/about
│  ├─ /es/disclaimer
│  └─ /es/contribute
└─ /en
   ├─ /en/tools
   ├─ /en/tools/{slug}
   ├─ /en/categories/{category}
   ├─ /en/about
   ├─ /en/disclaimer
   └─ /en/contribute
```

## Header

Desktop:

- PedsCore.
- Tools.
- Categories.
- About.
- Contribute.
- Language switcher.
- GitHub link.

Mobile:

- compact top bar;
- language switch visible;
- menu or bottom-safe navigation.

## Cards

Category card:

- category name;
- short description;
- number of tools;
- implementation count;
- link.

Tool card:

- tool name;
- acronym;
- category;
- type;
- status badge;
- short description;
- open button.

Status labels:

Spanish: Implementada, Pendiente de validación, Próximamente.  
English: Implemented, Pending validation, Coming soon.

## Search Behavior

The search bar filters immediately by name, acronym, category, subcategory, synonyms, description and type.

No result message:

Spanish:

```text
No se encontraron herramientas. Puedes proponer una nueva en GitHub.
```

English:

```text
No tools found. You can suggest a new one on GitHub.
```

## Tool Page Layout

Desktop:

```text
Main column:
- title
- disclaimer
- form
- result
- interpretation table
- scoring table
- references

Sidebar:
- metadata
- status
- implementation notes
- GitHub feedback
```

Mobile:

```text
title
metadata summary
disclaimer
form
result
interpretation table
scoring table
references
GitHub feedback
```

## Dynamic Form UX

Missing fields:

Spanish: `Completa todos los campos obligatorios para calcular el resultado.`  
English: `Complete all required fields to calculate the result.`

Validation warning:

Spanish: `El valor introducido está fuera del rango esperable. Revisa la unidad y el dato.`  
English: `The entered value is outside the expected range. Check the unit and value.`

## Result Panel

- visually prominent;
- not alarmist by default;
- shows score/value and category;
- shows warnings;
- never gives treatment instructions.

## Tables

Tables must be responsive:

- desktop: normal table;
- mobile: horizontal scroll or stacked cards;
- long URLs must wrap.

## Footer

- PedsCore.
- Open-source pediatric and neonatal clinical tools.
- GitHub.
- Disclaimer.
- Contribute.
- License.
