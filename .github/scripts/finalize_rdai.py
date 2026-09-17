from pathlib import Path

catalog = Path("packages/core/src/catalog/clinicalTools.ts")
s = catalog.read_text()

# Upgrade the six RDAI input choices to explicit clinical criteria with id/value/score.
old = '{ id: "expiratory_wheeze", type: "single_choice", required: true, label: { es: "Sibilancias · fase espiratoria", en: "Wheeze · expiratory phase" }, options: [0,1,2,3,4].map((value) => ({ value, label: { es: String(value), en: String(value) } })) }'
new = '''{ id: "expiratory_wheeze", type: "single_choice", required: true, label: { es: "Sibilancias · fase espiratoria", en: "Wheeze · expiratory phase" }, options: [
        { id: "0", value: 0, score: 0, label: { es: "0 · Ausentes", en: "0 · None" } },
        { id: "1", value: 1, score: 1, label: { es: "1 · Solo al final de la espiracion", en: "1 · End-expiratory only" } },
        { id: "2", value: 2, score: 2, label: { es: "2 · Durante aproximadamente la mitad de la espiracion", en: "2 · Through about half of expiration" } },
        { id: "3", value: 3, score: 3, label: { es: "3 · Durante aproximadamente tres cuartos de la espiracion", en: "3 · Through about three quarters of expiration" } },
        { id: "4", value: 4, score: 4, label: { es: "4 · Durante toda la espiracion", en: "4 · Throughout expiration" } }
      ] }'''
if old in s:
    s = s.replace(old, new, 1)

old = '{ id: "inspiratory_wheeze", type: "single_choice", required: true, label: { es: "Sibilancias · fase inspiratoria", en: "Wheeze · inspiratory phase" }, options: [0,1,2].map((value) => ({ value, label: { es: String(value), en: String(value) } })) }'
new = '''{ id: "inspiratory_wheeze", type: "single_choice", required: true, label: { es: "Sibilancias · fase inspiratoria", en: "Wheeze · inspiratory phase" }, options: [
        { id: "0", value: 0, score: 0, label: { es: "0 · Ausentes", en: "0 · None" } },
        { id: "1", value: 1, score: 1, label: { es: "1 · Durante parte de la inspiracion", en: "1 · During part of inspiration" } },
        { id: "2", value: 2, score: 2, label: { es: "2 · Durante toda la inspiracion", en: "2 · Throughout inspiration" } }
      ] }'''
if old in s:
    s = s.replace(old, new, 1)

old = '{ id: "wheeze_extent", type: "single_choice", required: true, label: { es: "Sibilancias · extension", en: "Wheeze · extent" }, options: [0,1,2].map((value) => ({ value, label: { es: String(value), en: String(value) } })) }'
new = '''{ id: "wheeze_extent", type: "single_choice", required: true, label: { es: "Sibilancias · extension", en: "Wheeze · extent" }, options: [
        { id: "0", value: 0, score: 0, label: { es: "0 · Ausentes", en: "0 · None" } },
        { id: "1", value: 1, score: 1, label: { es: "1 · Segmentarias: 2 o menos de 4 campos pulmonares", en: "1 · Segmental: 2 or fewer of 4 lung fields" } },
        { id: "2", value: 2, score: 2, label: { es: "2 · Difusas: 3 o mas de 4 campos pulmonares", en: "2 · Diffuse: 3 or more of 4 lung fields" } }
      ] }'''
if old in s:
    s = s.replace(old, new, 1)

for input_id, es_name, en_name in [
    ("supraclavicular_retractions", "Retracciones supraclaviculares", "Supraclavicular retractions"),
    ("intercostal_retractions", "Retracciones intercostales", "Intercostal retractions"),
    ("subcostal_retractions", "Retracciones subcostales", "Subcostal retractions"),
]:
    old = f'{{ id: "{input_id}", type: "single_choice", required: true, label: {{ es: "{es_name}", en: "{en_name}" }}, options: [0,1,2,3].map((value) => ({{ value, label: {{ es: String(value), en: String(value) }} }})) }}'
    new = f'''{{ id: "{input_id}", type: "single_choice", required: true, label: {{ es: "{es_name}", en: "{en_name}" }}, options: [
        {{ id: "0", value: 0, score: 0, label: {{ es: "0 · Ausentes", en: "0 · None" }} }},
        {{ id: "1", value: 1, score: 1, label: {{ es: "1 · Leves", en: "1 · Mild" }} }},
        {{ id: "2", value: 2, score: 2, label: {{ es: "2 · Moderadas", en: "2 · Moderate" }} }},
        {{ id: "3", value: 3, score: 3, label: {{ es: "3 · Marcadas", en: "3 · Marked" }} }}
      ] }}'''
    if old in s:
        s = s.replace(old, new, 1)

# Fallback if a previous attempt already added ids without scores.
s = s.replace('({ value, label: { es: String(value), en: String(value) } })', '({ id: String(value), value, score: value, label: { es: String(value), en: String(value) } })')
s = s.replace('({ id: String(value), value, label: { es: String(value), en: String(value) } })', '({ id: String(value), value, score: value, label: { es: String(value), en: String(value) } })')
catalog.write_text(s)

# Register RDAI in the calculator dispatcher.
p = Path("packages/core/src/calculators/registry.ts")
s = p.read_text()
if 'import { rdaiCalculator } from "./rdai.js";' not in s:
    s = s.replace('import { criesCalculator } from "./cries.js";', 'import { criesCalculator } from "./cries.js";\nimport { rdaiCalculator } from "./rdai.js";')
if '  rdaiCalculator,' not in s:
    s = s.replace('  criesCalculator,\n', '  criesCalculator,\n  rdaiCalculator,\n', 1)
p.write_text(s)

# Focused tests use warning.id.
p = Path("packages/core/tests/rdai.test.ts")
s = p.read_text().replace('w.code === "rdai_no_decision_thresholds"', 'w.id === "rdai_no_decision_thresholds"').replace('warnings?.[0]?.code', 'warnings?.[0]?.id')
p.write_text(s)

# Reconcile inherited counts.
for filename in ["packages/core/tests/calculatorRegistry.test.ts", "apps/web/src/routes/webProductPolish.test.tsx"]:
    p = Path(filename)
    p.write_text(p.read_text().replace("toHaveLength(29)", "toHaveLength(30)"))

# Exact SPRINT-50 changes.
p = Path("packages/core/tests/sprint50Safety.test.ts")
s = p.read_text()
head = s.split("const implementedTestFiles", 1)[0]
if '  "rdai",\n' not in head:
    s = s.replace('  "qtc_hodges",\n', '  "qtc_hodges",\n  "rdai",\n', 1)
if '  rdai: "rdai.test.ts",' not in s:
    s = s.replace('  cries: "cries.test.ts",\n', '  cries: "cries.test.ts",\n  rdai: "rdai.test.ts",\n', 1)
p.write_text(s)

# Clean all temporary artifacts; the workflow removes this script itself after validation.
for q in Path(".").glob("README.tmp-rdai*"):
    q.unlink()
