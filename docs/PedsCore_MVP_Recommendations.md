# Recomendaciones MVP para PedsCore

Esta propuesta identifica las herramientas que deberían priorizarse en la primera versión (MVP) de **PedsCore**, las que se consideran recomendables para versiones posteriores y otras opcionales que podrían incorporarse conforme avance el proyecto.  La selección se basa en la frecuencia de uso clínico, la facilidad de implementación y el valor educativo.

## 1. Herramientas esenciales (≈25)

Estas herramientas cubren la mayoría de las necesidades básicas en neonatología, respiratorio, urgencias, dolor y cálculo renal.  Su cálculo es relativamente sencillo y existen referencias claras:

1. **Apgar** – adaptación al nacimiento【474945853518532†L183-L191】.
2. **Silverman–Andersen** – distrés respiratorio neonatal【147077704063714†L331-L361】.
3. **Wood‑Downes‑Ferrés** – gravedad en bronquiolitis【962479943341369†L51-L91】.
4. **Dubowitz/Ballard** – edad gestacional【220838157962949†L221-L287】.
5. **Thompson HIE Score** – encefalopatía hipóxico‑isquémica【110699779049624†L63-L69】.
6. **Modified Finnegan NAS Score** – abstinencia neonatal【467292371492109†L63-L149】.
7. **NIPS** – valoración del dolor en neonatos【577530968347707†L143-L165】.
8. **PEWS** – detección precoz de deterioro clínico【747638898637047†L20-L41】.
9. **PRAM** – gravedad del broncoespasmo【447101735359577†L29-L53】.
10. **Westley Croup Score** – crup【933011918013909†L20-L38】.
11. **RDAI** – evaluación de bronquiolitis【827264942931861†L152-L164】.
12. **SIPA** – índice de shock ajustado por edad【207165303600994†L117-L130】.
13. **PECARN** – regla para traumatismo craneal【437860562757143†L87-L109】.
14. **FLACC** – dolor en niños pequeños【635225333317716†L81-L116】.
15. **CRIES** – dolor neonatal postoperatorio【635225333317716†L81-L116】.
16. **CHEOPS** – dolor en niños de 1–7 años【635225333317716†L81-L116】.
17. **Wong–Baker Faces** – autoevaluación del dolor【635225333317716†L81-L116】.
18. **Schwartz revisado** – cálculo de filtrado glomerular.
19. **Clinical Dehydration Scale (CDS)** – gravedad de deshidratación.
20. **Escala de Coma de Glasgow pediátrica** – valoración neurológica.
21. **Ajustes básicos de RCP pediátrica** (dosis de adrenalina, energía de desfibrilación, diámetro del tubo endotraqueal).  
22. **Percentiles de peso y talla (OMS/CDC/Orbegozo)** – seguimiento de crecimiento.
23. **Sarnat/Sarnat** – estadios de encefalopatía hipóxico‑isquémica【938810463459155†L116-L143】.
24. **Puntaje de Thompson** (ya incluido pero se confirma su presencia).  
25. **Escalas complementarias de dolor** (FLACC, CRIES, CHEOPS) que ya se incluyen arriba.  

## 2. Herramientas recomendadas (≈50)

Además de las esenciales, estas escalas y calculadoras aportarían valor añadido y ampliarían la cobertura de la biblioteca.  Muchas son más complejas o requieren datos de laboratorio, pero son útiles en cuidados intensivos y especialidades:

- **PELOD‑2** y **pSOFA** – disfunción orgánica múltiple en UCI pediátrica.  
- **PRISM III/IV** y **PIM3** – riesgo de mortalidad en UCI.  
- **Ballard expandido** – estimación precisa de edad gestacional.  
- **PIPP/PIPP‑R** – dolor en prematuros extremos.  
- **COMFORTneo** – sedación y analgésicos en neonatos.  
- **Benes** y **Glasgow adaptado** – valoración neurológica alternativa.  
- **Gorelick** – otra escala de deshidratación.  
- **BROSJOD** – bronquiolitis.  
- **PASS** – gravedad de asma.  
- **Brighton PEWS**, **Bedside PEWS** – variantes de PEWS.  
- **Eat Sleep Console** – abstinencia neonatal.  
- **Nomograma de Bhutani** – hiperbilirrubinemia.  
- **pRIFLE/KDIGO pediátrico** – lesión renal aguda.  
- **RISC/mRISC** – gravedad de neumonía.  
- **STRONGkids**, **STAMP**, **PYMS** – riesgo de malnutrición.  
- **Herramientas de crecimiento**: IMC, perímetro craneal.  
- **Apgar expandido / Combined Apgar**.  

## 3. Herramientas opcionales y futuras (>100)

Para una biblioteca exhaustiva, pueden añadirse escalas menos frecuentes o muy específicas, algoritmos complejos y reglas pronósticas.  Estas requieren mayor dedicación, validación y pueden tener un riesgo regulatorio más alto:

- **Escalas regionales de sepsis**, shock séptico y trauma.  
- **Algoritmos completos de soporte vital avanzado pediátrico** (ALS).  
- **Scores de calidad de vida y neurodesarrollo** (Bayley, Denver II).  
- **Plataformas de simulación** integradas.  
- **Calculadoras farmacocinéticas** específicas.  
- **Algoritmos de triage masivo** en desastres.  
- **Herramientas de medicina del adolescente** (riesgo de depresión, conductas de riesgo).  
- **Nomogramas de tóxicos** (para futuras versiones).  

## Notas finales

1. **Priorización clínica:** Las herramientas esenciales aportan mayor beneficio inmediato a pediatras y neonatólogos en urgencias y UCIs.  
2. **Complejidad técnica:** Algunas escalas (PELOD‑2, PRISM, pSOFA) exigen múltiples variables de laboratorio; se recomienda implementar primero las versiones simplificadas.  
3. **Regulación y licencias:** El proyecto evitará recomendaciones terapéuticas directas y se centrará en el cálculo y presentación de puntuaciones.  Las fórmulas y tablas se obtendrán de la literatura con licencia abierta o mediante redacción propia.  
4. **Actualización continua:** La comunidad pediátrica puede proponer nuevas herramientas mediante GitHub Issues/Discussions.  La base de conocimiento deberá mantenerse actualizada con guías clínicas internacionales.  