export const judgeDemoHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>PedsCore AI — Live MCP Experience</title>
<style>
:root{color-scheme:dark;--bg:#050913;--bg2:#081423;--panel:rgba(11,24,39,.74);--panel2:rgba(15,33,52,.86);--text:#f7fbff;--muted:#92a8bb;--cyan:#68ddff;--mint:#7df3c7;--violet:#9c8cff;--yellow:#ffd885;--line:rgba(178,213,235,.14);--shadow:0 30px 100px rgba(0,0,0,.42)}
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}body{overflow-x:hidden}
body:before,body:after{content:"";position:fixed;border-radius:50%;filter:blur(80px);opacity:.28;pointer-events:none;z-index:0}body:before{width:520px;height:520px;left:-180px;top:-180px;background:radial-gradient(circle,var(--cyan),transparent 68%)}body:after{width:560px;height:560px;right:-220px;bottom:-240px;background:radial-gradient(circle,var(--violet),transparent 68%)}
.shell{position:relative;z-index:1;min-height:100vh;display:grid;grid-template-rows:auto 1fr auto}
header{display:flex;align-items:center;justify-content:space-between;padding:24px clamp(20px,4vw,54px);border-bottom:1px solid var(--line);backdrop-filter:blur(20px);background:linear-gradient(180deg,rgba(5,9,19,.88),rgba(5,9,19,.44))}
.brand{display:flex;align-items:center;gap:13px}.mark{width:38px;height:38px;border-radius:13px;background:linear-gradient(135deg,var(--cyan),var(--mint));box-shadow:0 0 30px rgba(104,221,255,.22);position:relative}.mark:after{content:"+";position:absolute;inset:0;display:grid;place-items:center;color:#082433;font-size:25px;font-weight:950}.brand strong{font-size:15px;letter-spacing:-.02em}.brand small{display:block;margin-top:2px;color:var(--muted);font-size:11px}
.live{display:flex;align-items:center;gap:9px;padding:9px 13px;border:1px solid rgba(125,243,199,.22);border-radius:999px;background:rgba(125,243,199,.06);font-size:11px;font-weight:850;letter-spacing:.08em;text-transform:uppercase;color:var(--mint)}.pulse{width:8px;height:8px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(125,243,199,.55);animation:pulse 1.9s infinite}@keyframes pulse{70%{box-shadow:0 0 0 10px rgba(125,243,199,0)}100%{box-shadow:0 0 0 0 rgba(125,243,199,0)}}
main{width:min(1240px,calc(100% - 36px));margin:0 auto;display:grid;grid-template-columns:92px minmax(0,1fr);gap:26px;padding:32px 0 26px}
.rail{display:flex;flex-direction:column;align-items:center;padding-top:18px}.rail-line{width:1px;flex:1;min-height:360px;background:linear-gradient(180deg,var(--cyan),rgba(104,221,255,.05));opacity:.5}.rail-step{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;margin:7px 0;color:#68849a;font-weight:850;font-size:12px;background:rgba(6,13,23,.82);transition:.35s ease}.rail-step.active{color:#06131d;background:linear-gradient(135deg,var(--cyan),var(--mint));transform:scale(1.08);box-shadow:0 0 28px rgba(104,221,255,.24)}.rail-step.done{border-color:rgba(125,243,199,.34);color:var(--mint)}
.stage{position:relative;min-height:680px}.screen{display:none;min-height:680px;animation:enter .5s cubic-bezier(.2,.8,.2,1)}.screen.active{display:grid}@keyframes enter{from{opacity:0;transform:translateY(16px) scale(.992)}to{opacity:1;transform:none}}
.hero{grid-template-columns:1.08fr .92fr;gap:34px;align-items:center;padding:34px 10px}.kicker{display:inline-flex;align-items:center;gap:8px;color:var(--cyan);font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.hero h1{font-size:clamp(54px,7vw,94px);line-height:.92;letter-spacing:-.065em;margin:18px 0 22px}.gradient-text{background:linear-gradient(100deg,#fff 10%,#9be9ff 48%,#8cf2cf 78%);-webkit-background-clip:text;background-clip:text;color:transparent}.hero p{max-width:690px;color:var(--muted);font-size:clamp(18px,2vw,23px);line-height:1.55}.principle{margin-top:28px;padding:16px 18px;border-left:3px solid var(--mint);background:linear-gradient(90deg,rgba(125,243,199,.08),transparent);border-radius:0 14px 14px 0;font-weight:780;max-width:720px}.hero-art{position:relative;height:520px;display:grid;place-items:center}.orb{width:330px;height:330px;border-radius:50%;background:radial-gradient(circle at 40% 38%,rgba(255,255,255,.96) 0 4%,rgba(104,221,255,.86) 5%,rgba(156,140,255,.42) 35%,rgba(7,18,33,.16) 68%,transparent 71%);box-shadow:0 0 90px rgba(104,221,255,.26),inset 0 0 70px rgba(255,255,255,.1);animation:float 5s ease-in-out infinite}@keyframes float{50%{transform:translateY(-12px) scale(1.025)}}.ring{position:absolute;border:1px solid rgba(104,221,255,.18);border-radius:50%}.r1{width:420px;height:420px}.r2{width:500px;height:500px}.sat{position:absolute;padding:10px 13px;border:1px solid var(--line);border-radius:12px;background:rgba(8,20,35,.82);backdrop-filter:blur(16px);font-size:11px;font-weight:800;color:#cdebf6}.s1{top:80px;left:20px}.s2{right:6px;top:175px}.s3{bottom:86px;left:44px}
.panel{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(320px,.74fr);gap:24px;align-items:stretch;padding:20px 0}.card{border:1px solid var(--line);background:linear-gradient(180deg,rgba(14,30,48,.84),rgba(8,18,31,.78));border-radius:30px;box-shadow:var(--shadow);backdrop-filter:blur(20px);overflow:hidden}.maincard{padding:clamp(28px,4vw,52px);position:relative}.sidecard{padding:26px;display:flex;flex-direction:column;gap:18px}.step-label{font-size:12px;font-weight:900;letter-spacing:.13em;text-transform:uppercase;color:var(--cyan)}h2{font-size:clamp(34px,4vw,58px);line-height:1.02;letter-spacing:-.045em;margin:13px 0 16px}.sub{color:var(--muted);font-size:17px;line-height:1.6;max-width:760px}.prompt{margin:28px 0 20px;padding:20px 22px;border:1px solid rgba(104,221,255,.16);background:linear-gradient(135deg,rgba(104,221,255,.08),rgba(156,140,255,.06));border-radius:20px;color:#e8f8ff;font-size:17px;line-height:1.5}.prompt:before{content:"VOICE / INTENT";display:block;color:var(--cyan);font-size:10px;font-weight:900;letter-spacing:.12em;margin-bottom:9px}
.action{appearance:none;border:0;border-radius:16px;padding:16px 20px;background:linear-gradient(135deg,#8ce6ff,#7cf1c6);color:#061924;font-size:15px;font-weight:900;cursor:pointer;box-shadow:0 12px 34px rgba(104,221,255,.17);transition:.25s ease}.action:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(104,221,255,.24)}.action:disabled{opacity:.52;cursor:wait;transform:none}.secondary{background:rgba(255,255,255,.05);color:var(--text);border:1px solid var(--line);box-shadow:none}.secondary:hover{background:rgba(255,255,255,.08);box-shadow:none}.result{margin-top:22px;min-height:150px;border:1px dashed rgba(178,213,235,.2);border-radius:22px;padding:22px;background:rgba(3,10,19,.34);display:flex;align-items:center;color:var(--muted);line-height:1.55;transition:.35s ease}.result.ready:before{content:"";width:10px;height:10px;border-radius:50%;background:#5e7789;margin-right:11px}.result.loading{border-style:solid;border-color:rgba(104,221,255,.25);color:#cdebf6}.result.ok{border-style:solid;border-color:rgba(125,243,199,.28);background:linear-gradient(135deg,rgba(125,243,199,.08),rgba(104,221,255,.04));color:#dffcf1}.result.warn{border-style:solid;border-color:rgba(255,216,133,.3);background:rgba(255,216,133,.06);color:#ffecbd}
.metric{font-size:64px;line-height:.9;font-weight:950;letter-spacing:-.06em}.metric small{font-size:22px;color:var(--muted);letter-spacing:-.02em}.result-title{font-size:22px;font-weight:900;margin-bottom:7px}.result-copy{color:var(--muted);font-size:14px}.badge-row{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}.badge{display:inline-flex;align-items:center;gap:7px;padding:8px 11px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.035);font-size:11px;font-weight:850;color:#c7dce8}.badge.good{color:var(--mint);border-color:rgba(125,243,199,.22);background:rgba(125,243,199,.05)}.badge.cyan{color:var(--cyan);border-color:rgba(104,221,255,.22);background:rgba(104,221,255,.05)}
.side-title{font-size:11px;letter-spacing:.12em;font-weight:900;color:#7794aa;text-transform:uppercase}.arch{display:flex;flex-direction:column;gap:10px}.node{padding:14px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.025);font-size:13px;font-weight:820}.node.active{border-color:rgba(104,221,255,.28);background:rgba(104,221,255,.06);box-shadow:0 0 32px rgba(104,221,255,.08)}.arrow{color:#557286;text-align:center}.mini{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mini div{padding:13px;border:1px solid var(--line);border-radius:15px;background:rgba(255,255,255,.02)}.mini strong{display:block;font-size:14px}.mini span{display:block;color:var(--muted);font-size:10px;margin-top:4px}.trace-button{margin-top:auto}
.debrief{display:grid;grid-template-columns:170px 1fr;gap:24px;align-items:center}.check{width:150px;height:150px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,rgba(125,243,199,.2),rgba(125,243,199,.04));border:1px solid rgba(125,243,199,.3);font-size:68px;color:var(--mint);box-shadow:0 0 70px rgba(125,243,199,.14)}.path{display:flex;flex-wrap:wrap;align-items:center;gap:9px;margin-top:18px}.path-step{padding:9px 12px;border-radius:12px;border:1px solid rgba(104,221,255,.18);background:rgba(104,221,255,.05);font-size:11px;font-weight:800;color:#cdefff}.path-arrow{color:#557486}
.nav{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px}.nav-right{display:flex;gap:10px}.ghost{appearance:none;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.025);color:var(--text);padding:12px 16px;font-weight:800;cursor:pointer}.ghost:disabled{opacity:.35;cursor:not-allowed}.ghost.primary{border-color:rgba(104,221,255,.24);background:rgba(104,221,255,.08);color:#ccefff}
footer{padding:16px clamp(20px,4vw,54px) 24px;color:#607b8f;font-size:11px;display:flex;justify-content:space-between;gap:18px;border-top:1px solid var(--line)}footer a{color:#8ebcd2;text-decoration:none}
.drawer{position:fixed;inset:0;z-index:20;pointer-events:none}.drawer.open{pointer-events:auto}.shade{position:absolute;inset:0;background:rgba(0,0,0,.52);opacity:0;transition:.3s}.drawer.open .shade{opacity:1}.trace{position:absolute;top:0;right:0;width:min(620px,92vw);height:100%;background:#06101c;border-left:1px solid var(--line);transform:translateX(100%);transition:.38s cubic-bezier(.2,.8,.2,1);padding:28px;display:flex;flex-direction:column}.drawer.open .trace{transform:none}.trace-head{display:flex;justify-content:space-between;align-items:center}.trace h3{margin:0;font-size:19px}.trace pre{margin-top:20px;flex:1;overflow:auto;white-space:pre-wrap;word-break:break-word;padding:18px;border-radius:16px;background:#02070d;border:1px solid var(--line);color:#bcecff;font:11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace}.x{background:none;border:1px solid var(--line);color:#fff;border-radius:10px;width:36px;height:36px;cursor:pointer}
@media(max-width:980px){main{grid-template-columns:1fr}.rail{display:none}.hero{grid-template-columns:1fr}.hero-art{height:330px}.orb{width:230px;height:230px}.r1{width:300px;height:300px}.r2{width:350px;height:350px}.panel{grid-template-columns:1fr}.stage,.screen{min-height:auto}.sidecard{min-height:260px}.debrief{grid-template-columns:1fr}.check{width:110px;height:110px;font-size:48px}}
@media(max-width:620px){header{padding:18px}.brand small{display:none}.live{font-size:9px}.hero h1{font-size:52px}.hero-art{display:none}.maincard{padding:24px}.panel{padding:8px 0}.metric{font-size:52px}.nav{align-items:stretch;flex-direction:column}.nav-right{display:grid;grid-template-columns:1fr 1fr}.ghost{width:100%}}
</style>
</head>
<body>
<div class="shell">
<header>
<div class="brand"><div class="mark"></div><div><strong>PedsCore AI</strong><small>Amazon Developer Hackathon 2026</small></div></div>
<div class="live"><span class="pulse"></span>Live self-hosted MCP</div>
</header>
<main>
<aside class="rail" aria-label="Demo progress">
<div class="rail-step active" data-rail="0">◎</div><div class="rail-line"></div>
<div class="rail-step" data-rail="1">01</div><div class="rail-line"></div>
<div class="rail-step" data-rail="2">02</div><div class="rail-line"></div>
<div class="rail-step" data-rail="3">03</div><div class="rail-line"></div>
<div class="rail-step" data-rail="4">04</div><div class="rail-line"></div>
<div class="rail-step" data-rail="5">05</div><div class="rail-line"></div>
<div class="rail-step" data-rail="6">06</div>
</aside>
<section class="stage">
<section class="screen hero active" data-screen="0">
<div>
<div class="kicker">Live agentic pediatric workflow</div>
<h1><span class="gradient-text">Conversation</span><br/>without probabilistic<br/>clinical logic.</h1>
<p>A real MCP workflow across PedsCore and SIM IMV. The conversational layer discovers and orchestrates. Deterministic software calculates scores and judges triage decisions.</p>
<div class="principle">The model may understand intent. PedsCore and SIM IMV own the clinical truth.</div>
<div class="nav" style="margin-top:34px"><span></span><div class="nav-right"><button class="action" data-next>Start live demo →</button></div></div>
</div>
<div class="hero-art"><div class="ring r2"></div><div class="ring r1"></div><div class="orb"></div><div class="sat s1">MCP 2025-11-25</div><div class="sat s2">Streamable HTTP</div><div class="sat s3">6 live tools</div></div>
</section>

<section class="screen panel" data-screen="1">
<article class="card maincard">
<div class="step-label">01 · Clinical discovery</div><h2>From natural language<br/>to the right tool.</h2>
<p class="sub">The agent searches the real PedsCore catalog instead of guessing which pediatric score is appropriate.</p>
<div class="prompt">Find a pediatric score for assessing croup severity.</div>
<button class="action" data-demo="discovery">Run live MCP call</button>
<div class="result ready" id="result-discovery">Ready to query the live clinical catalog.</div>
<div class="nav"><button class="ghost" data-back>← Back</button><div class="nav-right"><button class="ghost primary" data-next disabled>Next →</button></div></div>
</article>
<aside class="card sidecard"><div class="side-title">Execution path</div><div class="arch"><div class="node active">Natural-language intent</div><div class="arrow">↓</div><div class="node">search_clinical_tools</div><div class="arrow">↓</div><div class="node">PedsCore catalog</div></div><div class="mini"><div><strong>Live</strong><span>Public MCP</span></div><div><strong>Read-only</strong><span>Discovery layer</span></div></div><button class="ghost trace-button" data-trace="discovery" disabled>View raw MCP trace</button></aside>
</section>

<section class="screen panel" data-screen="2">
<article class="card maincard">
<div class="step-label">02 · Structured metadata</div><h2>Inputs come from<br/>the source of truth.</h2>
<p class="sub">The model does not invent score fields. PedsCore returns the structured inputs and tool metadata required for deterministic execution.</p>
<div class="prompt">Show me the inputs needed for the Apgar score.</div>
<button class="action" data-demo="metadata">Load Apgar metadata</button>
<div class="result ready" id="result-metadata">Ready to inspect the tool contract.</div>
<div class="nav"><button class="ghost" data-back>← Back</button><div class="nav-right"><button class="ghost primary" data-next disabled>Next →</button></div></div>
</article>
<aside class="card sidecard"><div class="side-title">Execution path</div><div class="arch"><div class="node">Agent intent</div><div class="arrow">↓</div><div class="node active">get_clinical_tool</div><div class="arrow">↓</div><div class="node">Structured PedsCore metadata</div></div><div class="mini"><div><strong>Apgar</strong><span>Selected tool</span></div><div><strong>Inspectable</strong><span>Inputs + evidence</span></div></div><button class="ghost trace-button" data-trace="metadata" disabled>View raw MCP trace</button></aside>
</section>

<section class="screen panel" data-screen="3">
<article class="card maincard">
<div class="step-label">03 · Deterministic calculation</div><h2>The LLM does not<br/>calculate the score.</h2>
<p class="sub">The MCP layer delegates arithmetic to PedsCore's deterministic calculator registry. Same inputs, same output, every time.</p>
<div class="prompt">5 min · HR 2 · respiration 2 · tone 2 · reflex 2 · color 1</div>
<button class="action" data-demo="apgar">Calculate live</button>
<div class="result ready" id="result-apgar">Expected reproducible result: 9 / 10.</div>
<div class="nav"><button class="ghost" data-back>← Back</button><div class="nav-right"><button class="ghost primary" data-next disabled>Next →</button></div></div>
</article>
<aside class="card sidecard"><div class="side-title">Safety boundary</div><div class="arch"><div class="node">Conversational layer</div><div class="arrow">↓</div><div class="node active">calculate_clinical_score</div><div class="arrow">↓</div><div class="node">Deterministic calculator registry</div></div><div class="mini"><div><strong>0 hallucinated math</strong><span>Score execution</span></div><div><strong>Reproducible</strong><span>Deterministic result</span></div></div><button class="ghost trace-button" data-trace="apgar" disabled>View raw MCP trace</button></aside>
</section>

<section class="screen panel" data-screen="4">
<article class="card maincard">
<div class="step-label">04 · SIM IMV orchestration</div><h2>One workflow.<br/>A second domain engine.</h2>
<p class="sub">The same MCP session crosses into SIM IMV and starts a deployed synthetic pediatric mass-casualty scenario using JumpSTART.</p>
<div class="prompt">Start the school-bus pediatric mass-casualty scenario using JumpSTART.</div>
<button class="action" data-demo="sim">Start live scenario</button>
<div class="result ready" id="result-sim">Ready to call the production SIM IMV bridge.</div>
<div class="nav"><button class="ghost" data-back>← Back</button><div class="nav-right"><button class="ghost primary" data-next disabled>Next →</button></div></div>
</article>
<aside class="card sidecard"><div class="side-title">Cross-service orchestration</div><div class="arch"><div class="node">PedsCore AI</div><div class="arrow">↓</div><div class="node active">start_simulation_case</div><div class="arrow">↓</div><div class="node">SIM IMV production bridge</div></div><div class="mini"><div><strong>JumpSTART</strong><span>Triage system</span></div><div><strong>Synthetic</strong><span>No patient data</span></div></div><button class="ghost trace-button" data-trace="sim" disabled>View raw MCP trace</button></aside>
</section>

<section class="screen panel" data-screen="5">
<article class="card maincard">
<div class="step-label">05 · Learner-visible findings</div><h2>The agent sees only<br/>what the learner sees.</h2>
<p class="sub">Patient 01 is synthetic. Findings are supplied by SIM IMV, preserving the educational scenario rather than letting the model fabricate observations.</p>
<div class="prompt">School bus · JumpSTART · Patient 01</div>
<button class="action" data-demo="findings">Reveal patient findings</button>
<div class="result ready" id="result-findings">Ready to retrieve the visible assessment findings.</div>
<div class="nav"><button class="ghost" data-back>← Back</button><div class="nav-right"><button class="ghost primary" data-next disabled>Next →</button></div></div>
</article>
<aside class="card sidecard"><div class="side-title">Simulation boundary</div><div class="arch"><div class="node">Synthetic scenario</div><div class="arrow">↓</div><div class="node active">get_patient_findings</div><div class="arrow">↓</div><div class="node">Learner-visible observations</div></div><div class="mini"><div><strong>Patient 01</strong><span>Scenario subject</span></div><div><strong>Controlled</strong><span>Findings exposure</span></div></div><button class="ghost trace-button" data-trace="findings" disabled>View raw MCP trace</button></aside>
</section>

<section class="screen panel" data-screen="6">
<article class="card maincard">
<div class="step-label">06 · Deterministic debrief</div><h2>AI orchestrates.<br/>JumpSTART decides.</h2>
<p class="sub">Submit the learner's GREEN decision. Correctness, canonical category, rule ID and decision path are computed by SIM IMV's deterministic triage engine.</p>
<div class="prompt">Learner decision: GREEN</div>
<button class="action" data-demo="decision">Submit triage decision</button>
<div class="result ready" id="result-decision">Expected deterministic debrief: GREEN · correct · JS-MOB-01.</div>
<div class="nav"><button class="ghost" data-back>← Back</button><div class="nav-right"><button class="ghost primary" id="restart" disabled>Restart demo ↻</button></div></div>
</article>
<aside class="card sidecard"><div class="side-title">Final execution boundary</div><div class="arch"><div class="node">Learner decision</div><div class="arrow">↓</div><div class="node active">submit_triage_decision</div><div class="arrow">↓</div><div class="node">Deterministic JumpSTART engine</div></div><div class="mini"><div><strong>Canonical</strong><span>Rule-based answer</span></div><div><strong>Traceable</strong><span>Decision path</span></div></div><button class="ghost trace-button" data-trace="decision" disabled>View raw MCP trace</button></aside>
</section>
</section>
</main>
<footer><span>Educational and simulation use only · No identifiable patient data</span><span><a href="/health">Health</a> · <a href="/capabilities">Capabilities</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></span></footer>
</div>

<div class="drawer" id="drawer"><div class="shade" data-close-trace></div><aside class="trace"><div class="trace-head"><div><div class="side-title">Technical evidence</div><h3>Raw MCP trace</h3></div><button class="x" data-close-trace>×</button></div><pre id="trace-json">No trace yet.</pre></aside></div>

<script>
const calls={
discovery:{name:'search_clinical_tools',arguments:{query:'pediatric croup severity score',language:'en',limit:5,activeOnly:true,calculableOnly:false}},
metadata:{name:'get_clinical_tool',arguments:{slugOrId:'apgar',language:'en'}},
apgar:{name:'calculate_clinical_score',arguments:{toolId:'apgar',input:{assessment_time:'five_minutes',heart_rate:2,respiratory_effort:2,muscle_tone:2,reflex_irritability:2,color:1}}},
sim:{name:'start_simulation_case',arguments:{scenarioId:'school-bus',algorithmId:'jumpstart'}},
findings:{name:'get_patient_findings',arguments:{scenarioId:'school-bus',algorithmId:'jumpstart',patientId:'01'}},
decision:{name:'submit_triage_decision',arguments:{scenarioId:'school-bus',algorithmId:'jumpstart',patientId:'01',category:'GREEN'}}
};
const traces={};let current=0;
function parseRpc(text,ct){if(ct.includes('application/json'))return JSON.parse(text);const lines=text.split(/\\r?\\n/).filter(function(line){return line.startsWith('data:')});if(!lines.length)throw new Error('No JSON-RPC payload returned');return JSON.parse(lines[lines.length-1].slice(5).trim())}
async function toolCall(spec){const response=await fetch('/mcp',{method:'POST',headers:{'content-type':'application/json','accept':'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id:Date.now(),method:'tools/call',params:spec})});const text=await response.text();const payload=parseRpc(text,response.headers.get('content-type')||'');if(!response.ok||payload.error)throw new Error(JSON.stringify(payload.error||payload));return payload}
function esc(v){return String(v==null?'':v).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function badges(items){return '<div class="badge-row">'+items.map(function(x){return '<span class="badge '+(x[1]||'')+'">'+esc(x[0])+'</span>'}).join('')+'</div>'}
function render(kind,payload){const r=payload.result||{},s=r.structuredContent||{};
if(kind==='discovery'){const first=(s.tools||[])[0];if(!first)return '<div><div class="result-title">No result returned</div></div>';return '<div><div class="result-title">Matched: '+esc(first.name||first.title||first.id)+'</div><div class="result-copy">PedsCore catalog result · '+esc(first.id||'clinical tool')+'</div>'+badges([['LIVE CATALOG','cyan'],['DISCOVERY','good']])+'</div>'}
if(kind==='metadata'){const t=s.tool;if(!t)return '<div><div class="result-title">Metadata returned</div></div>';const n=t.inputs&&t.inputs.length?t.inputs.length:'Structured';return '<div><div class="result-title">'+esc(t.name||t.title||t.id)+'</div><div class="result-copy">'+esc(n)+' inputs loaded from PedsCore metadata.</div>'+badges([['STRUCTURED INPUTS','cyan'],['SOURCE OF TRUTH','good']])+'</div>'}
if(kind==='apgar'){const x=s.result;if(!x)return '<div><div class="result-title">Calculation returned</div></div>';return '<div><div class="metric">'+esc(x.score)+'<small> / '+esc(x.maxScore)+'</small></div><div class="result-title" style="margin-top:13px">Deterministic Apgar result</div>'+badges([['PEDSCORE ENGINE','good'],['NOT LLM MATH','cyan']])+'</div>'}
if(kind==='sim'){const x=s.result;if(r.isError)return '<div><div class="result-title">SIM IMV unavailable</div></div>';const title=x&&x.scenario?(x.scenario.title||x.scenario.id):'School-bus scenario';const count=x&&x.patientCount!=null?x.patientCount:'multiple';return '<div><div class="result-title">'+esc(title)+'</div><div class="result-copy">'+esc(count)+' synthetic patients · JumpSTART scenario started through the production bridge.</div>'+badges([['SIM IMV LIVE','good'],['JUMPSTART','cyan']])+'</div>'}
if(kind==='findings'){const x=s.result||{};const p=x.patient||{};const findings=x.findings||x.visibleFindings||p.findings;let count=Array.isArray(findings)?findings.length:null;let chips=[];if(Array.isArray(findings))chips=findings.slice(0,5).map(function(v){return [typeof v==='string'?v:(v.label||v.name||v.id||'Finding'),'cyan']});if(!chips.length)chips=[['PATIENT '+esc(p.id||'01'),'cyan'],['LEARNER-VISIBLE','good']];return '<div><div class="result-title">Patient '+esc(p.id||'01')+' findings loaded</div><div class="result-copy">'+(count!=null?esc(count)+' controlled findings returned from SIM IMV.':'Controlled findings returned from SIM IMV.')+'</div>'+badges(chips)+'</div>'}
if(kind==='decision'){const x=s.result||{};let path=Array.isArray(x.canonicalPath)?x.canonicalPath:[];const pathHtml=path.length?'<div class="path">'+path.map(function(step,i){let label=typeof step==='string'?step:(step.action||step.observation||step.label||'Step '+(i+1));return (i?'<span class="path-arrow">→</span>':'')+'<span class="path-step">'+esc(label)+'</span>'}).join('')+'</div>':'';return '<div class="debrief"><div class="check">✓</div><div><div class="result-title" style="font-size:30px">Correct · '+esc(x.expectedCategory||'GREEN')+'</div><div class="result-copy">Canonical JumpSTART decision · Rule '+esc(x.ruleId||'JS-MOB-01')+'</div>'+badges([['DETERMINISTIC','good'],['RULE '+esc(x.ruleId||'JS-MOB-01'),'cyan']])+pathHtml+'</div></div>'}
return '<div>MCP response returned.</div>'}
function showScreen(n){current=Math.max(0,Math.min(6,n));document.querySelectorAll('.screen').forEach(function(el){el.classList.toggle('active',Number(el.dataset.screen)===current)});document.querySelectorAll('[data-rail]').forEach(function(el){const n=Number(el.dataset.rail);el.classList.toggle('active',n===current);el.classList.toggle('done',n<current)});window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-next]').forEach(function(b){b.addEventListener('click',function(){showScreen(current+1)})});document.querySelectorAll('[data-back]').forEach(function(b){b.addEventListener('click',function(){showScreen(current-1)})});
document.querySelectorAll('[data-demo]').forEach(function(button){button.addEventListener('click',async function(){const kind=button.dataset.demo;const result=document.getElementById('result-'+kind);button.disabled=true;result.className='result loading';result.innerHTML='<div><div class="result-title">Calling the live MCP server…</div><div class="result-copy">Executing '+esc(calls[kind].name)+' over Streamable HTTP.</div></div>';try{const payload=await toolCall(calls[kind]);traces[kind]=payload;result.innerHTML=render(kind,payload);result.className='result '+(payload.result&&payload.result.isError?'warn':'ok');const traceButton=document.querySelector('[data-trace="'+kind+'"]');if(traceButton)traceButton.disabled=false;const screen=button.closest('.screen');const next=screen&&screen.querySelector('[data-next]');if(next)next.disabled=false;if(kind==='decision'){const restart=document.getElementById('restart');if(restart)restart.disabled=false}}catch(error){result.className='result warn';result.innerHTML='<div><div class="result-title">Request failed</div><div class="result-copy">'+esc(error)+'</div></div>'}finally{button.disabled=false}})});
document.querySelectorAll('[data-trace]').forEach(function(b){b.addEventListener('click',function(){const kind=b.dataset.trace;document.getElementById('trace-json').textContent=JSON.stringify(traces[kind]||{},null,2);document.getElementById('drawer').classList.add('open')})});document.querySelectorAll('[data-close-trace]').forEach(function(b){b.addEventListener('click',function(){document.getElementById('drawer').classList.remove('open')})});
document.getElementById('restart').addEventListener('click',function(){showScreen(0)});
</script>
</body>
</html>`;
