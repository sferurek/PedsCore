# NeoResus — Gameplay rules introduced in S1 Alpha 0.6

## 1. Hidden state vs observed state
The simulation engine must separate the patient's internal state from information the learner has actively obtained.

Example:
- `internalChest = absent`
- `observedChest = unknown`

Starting PPV does not automatically populate the monitoring panel with “absent chest expansion”.
Until the learner assesses the chest, the formal observation remains unknown.

For the current visual prototype, the central patient scene uses the text:
- “the chest does not show movement with inflations”
as a temporary substitute for the future non-moving chest animation.

## 2. Action domains
Actions are visually grouped by clinical domain rather than by correctness:
- assessment;
- ventilation;
- monitoring;
- oxygen;
- circulation;
- case control.

Color must never mean “correct” or “incorrect” in simulation mode.

## 3. Action duration and lock
Each action has an operational duration.
During that duration, other clinical action buttons are locked while:
- the clinical clock continues;
- physiology continues evolving;
- already-started monitor acquisition continues.

The “finish case” control remains outside the clinical action lock.

Current action durations are simulation-operational assumptions and must not be cited as guideline recommendations.

## 4. Continuous physiology
Heart rate and SpO2 evolve continuously in real time.
The current Alpha model uses authored trend trajectories:
- untreated apnea trends toward lower HR/SpO2;
- effective ventilation drives progressive HR/SpO2 recovery;
- recovered spontaneous breathing stabilizes physiology.

The exact mathematical constants are a simulation model, not a validated neonatal physiology model and not a guideline.

## 5. Pre-birth resuscitation-bed review
Before the birth, the learner can perform a systematic material review with a 120 s operational limit.

The Alpha may hide one equipment problem among:
- heat source;
- ventilation device;
- mask;
- suction;
- pulse oximetry;
- advanced airway equipment.

The learner can inspect and correct it.
The review is recorded in the debrief.

In S1 Alpha 0.6, unresolved equipment problems are logged for training/debrief and do not yet alter physiology. Future scenarios may connect equipment faults to intervention availability or effectiveness.

## 6. Recovery phase
S1 no longer ends as soon as HR and breathing recover.
The learner must:
1. recognise recovery;
2. reassess;
3. adjust/withdraw support;
4. maintain a stable recovered state for the short endpoint confirmation window.

## 7. Debrief
The debrief includes:
- graphical timeline;
- preparation review;
- ventilation sequence;
- recovery;
- manual/pedagogical/timeout finish reason;
- decision cards using:
  - learner action;
  - observed consequence;
  - SeNeo reference;
  - educational interpretation.

## 8. Product direction
Clinical cases should primarily test recognition, decisions, sequence, timing and response to physiology.
Fine motor execution (ventilation rhythm, compression coordination, equipment setup under dedicated rules) remains suitable for separate technical minigames.
