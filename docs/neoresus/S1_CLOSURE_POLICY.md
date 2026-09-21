# NeoResus — S1 closure policy

Status: **S1 clinical flow closed for Alpha 0.5**

## Purpose
S1 teaches recognition of a non-vigorous term newborn, initial stimulation, heart-rate assessment, initiation of PPV, recognition of ineffective ventilation, correction before escalation, oxygen strategy, and recovery.

## End conditions

S1 can end in three ways:

1. **Manual finish**
   - The learner may end the case at any moment.
   - All actions, delays, unresolved steps and physiology up to that point remain available to the debrief.
   - This is not treated as an automatic failure state.

2. **Pedagogical endpoint**
   - Effective ventilation has been achieved.
   - Heart rate is >100 bpm.
   - Spontaneous breathing has recovered.
   - Recovery remains present for a short confirmation window before the case closes.
   - In Alpha 0.5 this confirmation window is 5 s and is an operational simulation assumption, not a guideline-defined interval.

3. **Maximum duration**
   - Alpha 0.5 maximum case duration: 300 s (5 min).
   - At 5 min the case closes and proceeds to debrief regardless of state.
   - This is an operational simulation limit, not a SeNeo clinical recommendation.

## Debrief requirement
Every finish mode must preserve:
- finish reason;
- finish time;
- timeline;
- time to first PPV;
- time to effective PPV;
- time to HR >100;
- time to spontaneous breathing;
- errors and unresolved actions;
- FiO2 and monitoring decisions.

## Product rule for future scenarios
Each scenario must define its own:
- `pedagogicalEndpoint`;
- `maxDurationSec`;
- optional `endpointHoldSec`;
- finish reason labels.

These parameters belong to scenario configuration rather than to global neonatal clinical guidance.
