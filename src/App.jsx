import { useState } from 'react'
import { createRoot } from 'react-dom/client'

const DEPTS = ['Engineering','DevOps','Customer Service','Sales','HR / People','Operations','Finance','Marketing']
const SUBTASKS = [
  "Create offer letter","Create NDA","Create contract",
  "Send welcome email","Send esign documents","Create email",
  "Create announcement","Add to groups and introduce",
  "Add to relevant meetings","Send training plan and details of new employees",
  "Create relevant accounts on systems and give access to required clients",
  "Update employee details to relevant files and folders",
]

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f0f0d;--bg2:#181816;--bg3:#222220;--bg4:#2c2c29;
  --border:#333330;--border2:#444440;
  --text:#e8e6df;--text2:#9c9a92;--text3:#6b6966;
  --accent:#c8a96e;--teal:#4db896;--teal-bg:#0d2e22;
  --red:#e05555;--red-bg:#2a0f0f;
  --radius:10px;--radius-sm:6px;
}
html,body,#root{min-height:100vh;font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);font-size:15px;line-height:1.6}
.wrap{max-width:720px;margin:0 auto;padding:24px 20px 80px}
.header{display:flex;align-items:center;gap:14px;margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid var(--border)}
.hicon{width:44px;height:44px;border-radius:10px;background:var(--accent);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.htext h1{font-size:17px;font-weight:500}
.htext p{font-size:13px;color:var(--text2);margin-top:2px}
.badge{margin-left:auto;font-size:11px;font-family:'DM Mono',monospace;color:var(--text3);background:var(--bg3);border:1px solid var(--border);padding:4px 10px;border-radius:20px}
.live-dot{width:7px;height:7px;border-radius:50%;background:var(--teal);display:inline-block;margin-right:5px;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.tab-nav{display:grid;grid-template-columns:1fr 1fr 1fr;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:24px}
.tab{padding:11px 8px;text-align:center;font-size:12px;font-family:'DM Mono',monospace;color:var(--text3);background:var(--bg2);cursor:pointer;border:none;border-right:1px solid var(--border);transition:all .2s;width:100%}
.tab:last-child{border-right:none}
.tab.active{background:var(--accent);color:#0f0f0d;font-weight:600}
.tab.done{background:var(--teal-bg);color:var(--teal)}
.card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:24px;margin-bottom:16px}
.card-title{font-size:11px;font-family:'DM Mono',monospace;color:var(--text3);letter-spacing:.08em;text-transform:uppercase;margin-bottom:18px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.g1{margin-bottom:14px}
label{display:block;font-size:12px;color:var(--text2);margin-bottom:5px}
input,select,textarea{display:block;width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;padding:10px 12px;outline:none;transition:border-color .15s;box-sizing:border-box}
input:focus,select:focus,textarea:focus{border-color:var(--accent)}
input::placeholder,textarea::placeholder{color:var(--text3)}
select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6966' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
select option{background:var(--bg3)}
textarea{resize:vertical;line-height:1.6}
.preview-box{background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px 16px;font-size:12px;color:var(--text2);line-height:1.9;white-space:pre-wrap;max-height:200px;overflow-y:auto;font-family:'DM Mono',monospace;margin-bottom:16px}
.btn{width:100%;padding:13px;border:none;border-radius:var(--radius-sm);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .18s}
.btn-accent{background:var(--accent);color:#0f0f0d}.btn-accent:hover{background:#d4b87a}
.btn-ghost{background:var(--bg3);color:var(--text2);border:1px solid var(--border)}.btn-ghost:hover{border-color:var(--border2);color:var(--text)}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.err{background:var(--red-bg);border:1px solid #3d1010;border-radius:var(--radius-sm);padding:11px 14px;font-size:12px;color:var(--red);margin-bottom:12px}
.handoff{background:#0f1a0f;border:2px solid var(--teal);border-radius:var(--radius);padding:20px;margin-top:8px}
.handoff-title{font-size:12px;font-family:'DM Mono',monospace;color:var(--teal);letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
.handoff-note{font-size:13px;color:var(--text2);margin-bottom:12px;padding:10px 14px;background:var(--bg4);border-radius:var(--radius-sm);border-left:3px solid var(--teal)}
.handoff-body{background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;font-family:'DM Mono',monospace;font-size:12px;color:var(--text2);line-height:1.9;margin-bottom:14px;white-space:pre-wrap}
.copy-btn{width:100%;padding:12px;background:var(--teal-bg);color:var(--teal);border:1px solid var(--teal);border-radius:var(--radius-sm);font-family:'DM Mono',monospace;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .18s}
.copy-btn:hover{background:#0f2e20}.copy-btn.copied{background:var(--teal);color:#0f0f0d}
.asana-preview{background:#0a1a12;border:1px solid #1a3a28;border-radius:var(--radius-sm);padding:14px;margin-bottom:16px}
.asana-name{font-size:13px;font-family:'DM Mono',monospace;color:#6ddcb0;margin-bottom:4px}
.asana-section{font-size:11px;color:#4db896;font-family:'DM Mono',monospace;margin-bottom:10px}
.subtask-list{display:flex;flex-wrap:wrap;gap:5px}
.subtask-pill{font-size:11px;font-family:'DM Mono',monospace;background:var(--bg4);border:1px solid var(--border);border-radius:20px;padding:2px 8px;color:var(--text3)}
.spinner{width:16px;height:16px;border:2px solid rgba(15,15,13,.3);border-top-color:#0f0f0d;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.banner{background:#1a1400;border:1px solid #3d3000;border-radius:var(--radius-sm);padding:13px 16px;font-size:13px;color:#c8a030;margin-bottom:20px;display:flex;gap:10px;align-items:flex-start}
.banner strong{color:#e8c060;display:block;margin-bottom:3px}
@media(max-width:520px){.g2{grid-template-columns:1fr}.btn-row{grid-template-columns:1fr}}
`

function parseReply(text) {
  const get = ps => { for (const p of ps) { const m=text.match(p); if(m&&m[1]&&m[1].trim().length>1) return m[1].trim() } return '' }
  return {
    name: get([/(?:full name|name)[:\s]+([^\n]+)/i,/^1[\.\)]\s*([^\n]+)/m]),
    address: get([/(?:permanent address|address)[:\s]+([^\n]+)/i,/^2[\.\)]\s*([^\n]+)/m]),
    phone: get([/(?:phone|mobile|tel)[:\s]+([^\n]+)/i,/^3[\.\)]\s*([^\n]+)/m]),
    start_date: get([/(?:start date|starting)[:\s]+([^\n]+)/i,/^4[\.\)]\s*([^\n]+)/m]),
    dob: get([/(?:date of birth|dob|birthday)[:\s]+([^\n]+)/i,/^9[\.\)]\s*([^\n]+)/m]),
    nationality: get([/(?:nationality|citizen)[:\s]+([^\n]+)/i]),
    passport_no: get([/passport(?:\s*(?:no|#|number))?[:\s]+([A-Z0-9]{5,12})/i]),
    passport_exp: get([/(?:expiry|expires?)[:\s]+([^\n]+)/i]),
    bank: get([/bank[:\s]+([^\n,]+)/i]),
  }
}

async function extractWithClaude(replyText) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514', max_tokens: 600,
      messages: [{ role: 'user', content: `Extract from candidate reply. Return ONLY valid JSON, no markdown:\n{"name":"","dob":"","phone":"","start_date":"","address":"","nationality":"","passport_no":"","passport_exp":"","bank":""}\n\nReply:\n${replyText}` }]
    })
  })
  const d = await res.json()
  const t = d.content?.map(b => b.text||'').join('') || ''
  try { return JSON.parse(t.replace(/```json|```/g,'').trim()) } catch { return parseReply(replyText) }
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) })
  }
  return (
    <button className={`copy-btn${copied?' copied':''}`} onClick={handleCopy}>
      {copied ? '✓ Copied — paste into Claude chat ↓' : '📋 Copy command → paste into Claude chat'}
    </button>
  )
}

function App() {
  const [tab, setTab] = useState(1)
  const [doneTabs, setDoneTabs] = useState([])
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [salary, setSalary] = useState('')
  const [manager, setManager] = useState('')
  const [location, setLocation] = useState('')
  const [dept, setDept] = useState('')
  const [err1, setErr1] = useState('')
  const [showHandoff1, setShowHandoff1] = useState(false)
  const [reply, setReply] = useState('')
  const [err2, setErr2] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [startDate, setStartDate] = useState('')
  const [address, setAddress] = useState('')
  const [nationality, setNationality] = useState('')
  const [passport, setPassport] = useState('')
  const [passExp, setPassExp] = useState('')
  const [bank, setBank] = useState('')
  const [err3, setErr3] = useState('')
  const [showHandoff3, setShowHandoff3] = useState(false)

  const emailBody = () => `Hi ${firstName||'[Candidate]'},

Congratulations on clearing all the interviews with Yedda. It's been a pleasure getting to know you throughout the interview process, and I'm happy to share some exciting news with you.

We were genuinely impressed by your attitude, communication, and eagerness to learn, qualities we truly value on our team. We believe you'll bring positive energy and fresh perspective to the role and to the customers we serve every day.

Here is our Intend to Offer details:

  · Position: ${role||'[Role]'}
  · Compensation: ${salary||'[Salary]'} gross per month
  · Bonus: according to Business Unit's performance and your performance

Please accept the offer by replying to us the following information:

  1. Full name
  2. Permanent address
  3. Phone number
  4. Start date (Every Monday and Wednesday, expected about 7 days for onboarding process)
  5. Information page of Passport and your ID card (both the front and back sides)
  6. Bank details - Fill in the Annex A: attached
  7. CV in English (if available)
  8. Friendly profile picture (member profile)
  9. Your date of birth

'By replying to this email, you hereby authorise the complete release of these records or data pertaining to you, which Yedda and its contracting entities may have. You authorise the full release of the information sent over this email, without any reservation. You certify that all the information provided here is true and accurate to the best of your knowledge. This authorisation and the consent shall be valid in original, facsimile ("fax"), or copy form.'

Best,
Kendra · Talent Acquisition, Yedda.ai`

  const cmd1 = () => `DRAFT_OFFER_EMAIL\ncandidate: ${firstName}\nto: ${email}\nrole: ${role}\nsalary: ${salary}\nmanager: ${manager}\nlocation: ${location}\ndept: ${dept}`
  const taskName = () => `${name||'[Name]'} - ${role||'[Role]'} - ${location||'[Location]'} (${manager||'[Manager]'})`
  const cmd3 = () => `CREATE_ASANA_ONBOARD\ntask: ${taskName()}\ndept: ${dept}\nmanager: ${manager}\nstart: ${startDate}\nsalary: ${salary}\nphone: ${phone||'TBD'}\naddress: ${address||'TBD'}\nnationality: ${nationality||'TBD'}\npassport: ${passport||'TBD'} exp: ${passExp||'TBD'}\ndob: ${dob||'TBD'}\nbank: ${bank||'TBD'}\nwelcome_email_to: ${email}`

  function handleDraftEmail() {
    if (!firstName||!email||!role||!salary||!manager||!location||!dept) { setErr1('Please fill in all fields.'); return }
    setErr1(''); setShowHandoff1(true); setDoneTabs(d => [...new Set([...d,1])])
  }

  async function handleExtract() {
    if (!reply||reply.length<15) { setErr2("Paste the candidate's reply first."); return }
    setErr2(''); setExtracting(true)
    try {
      const ex = await extractWithClaude(reply)
      setName(ex.name||''); setDob(ex.dob||''); setPhone(ex.phone||'')
      setStartDate(ex.start_date||''); setAddress(ex.address||'')
      setNationality(ex.nationality||''); setPassport(ex.passport_no||'')
      setPassExp(ex.passport_exp||''); setBank(ex.bank||'')
      setDoneTabs(d => [...new Set([...d,2])]); setTab(3)
    } catch {
      const fb = parseReply(reply)
      setName(fb.name||''); setDob(fb.dob||''); setPhone(fb.phone||'')
      setStartDate(fb.start_date||''); setAddress(fb.address||'')
      setNationality(fb.nationality||''); setPassport(fb.passport_no||'')
      setPassExp(fb.passport_exp||''); setBank(fb.bank||'')
      setDoneTabs(d => [...new Set([...d,2])]); setTab(3)
    }
    setExtracting(false)
  }

  function handleCreateAsana() {
    if (!name||!startDate) { setErr3('Full name and start date are required.'); return }
    setErr3(''); setShowHandoff3(true); setDoneTabs(d => [...new Set([...d,3])])
  }

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="header">
          <div className="hicon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"/>
              <path d="M22 6l-10 7L2 6"/>
            </svg>
          </div>
          <div className="htext">
            <h1>HR Onboarding Agent</h1>
            <p><span className="live-dot"/>Gmail · Asana · kendra@yedda.ai</p>
          </div>
          <div className="badge">YEDDA.AI</div>
        </div>

        <div className="banner">
          <span style={{fontSize:20}}>💬</span>
          <div><strong>How this works</strong>Fill the form → copy the command → paste it into your Claude chat. Claude handles Gmail and Asana directly.</div>
        </div>

        <div className="tab-nav">
          {[1,2,3].map(n => (
            <button key={n} className={`tab${tab===n?' active':''}${doneTabs.includes(n)&&tab!==n?' done':''}`} onClick={() => setTab(n)}>
              {doneTabs.includes(n)&&tab!==n?'✓ ':''}{n} · {['Send offer','Collect reply','Asana task'][n-1]}
            </button>
          ))}
        </div>

        {tab===1 && (
          <div className="card">
            <div className="card-title">Candidate &amp; offer details</div>
            <div className="g2">
              <div><label>First name</label><input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="e.g. Huong"/></div>
              <div><label>Candidate email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="candidate@email.com"/></div>
            </div>
            <div className="g2">
              <div><label>Job title</label><input value={role} onChange={e=>setRole(e.target.value)} placeholder="e.g. Recruiter"/></div>
              <div><label>Base salary (gross/month)</label><input value={salary} onChange={e=>setSalary(e.target.value)} placeholder="e.g. USD 3,000"/></div>
            </div>
            <div className="g2">
              <div><label>Manager</label><input value={manager} onChange={e=>setManager(e.target.value)} placeholder="e.g. John Hasper"/></div>
              <div><label>Location</label><input value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. Vietnam, Hanoi"/></div>
            </div>
            <div className="g1">
              <label>Department</label>
              <select value={dept} onChange={e=>setDept(e.target.value)}>
                <option value="">Select department…</option>
                {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div style={{fontSize:11,fontFamily:'DM Mono,monospace',color:'var(--text3)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:6}}>Email preview</div>
            <div className="preview-box">{emailBody()}</div>
            {err1 && <div className="err">{err1}</div>}
            {!showHandoff1
              ? <button className="btn btn-accent" onClick={handleDraftEmail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                  Draft the email
                </button>
              : <>
                  <div className="handoff">
                    <div className="handoff-title">✓ Ready — copy &amp; paste into Claude chat</div>
                    <div className="handoff-note">Paste this into Claude chat. Claude creates the Gmail draft in kendra@yedda.ai instantly.</div>
                    <div className="handoff-body">{cmd1()}</div>
                    <CopyButton text={cmd1()}/>
                  </div>
                  <button className="btn btn-ghost" style={{marginTop:10}} onClick={() => setTab(2)}>Continue to Step 2 →</button>
                </>
            }
          </div>
        )}

        {tab===2 && (
          <div className="card">
            <div className="card-title">Paste candidate's reply</div>
            <p style={{fontSize:13,color:'var(--text2)',marginBottom:14}}>Paste the full reply — Claude AI extracts all fields automatically.</p>
            <div className="g1">
              <textarea rows={9} value={reply} onChange={e=>setReply(e.target.value)}
                placeholder={"Hi Kendra, I accept!\n\n1. Full name: Nguyen Thi Linh\n2. Address: 123 Le Duan, Hanoi\n3. Phone: +84 912 345 678\n4. Start date: June 16th, 2026\n5. Passport: B1234567\n9. DOB: 15/03/1995"}/>
            </div>
            {err2 && <div className="err">{err2}</div>}
            <div className="btn-row">
              <button className="btn btn-ghost" onClick={() => setTab(1)}>← Back</button>
              <button className="btn btn-accent" onClick={handleExtract} disabled={extracting}>
                {extracting ? <><div className="spinner"/>Extracting…</> : <>Extract with Claude AI</>}
              </button>
            </div>
          </div>
        )}

        {tab===3 && (
          <div className="card">
            <div className="card-title">Review &amp; create Asana task</div>
            <div className="g2">
              <div><label>Full name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"/></div>
              <div><label>Date of birth</label><input value={dob} onChange={e=>setDob(e.target.value)} placeholder="15/03/1995"/></div>
            </div>
            <div className="g2">
              <div><label>Phone</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+84 ..."/></div>
              <div><label>Start date</label><input value={startDate} onChange={e=>setStartDate(e.target.value)} placeholder="June 16, 2026"/></div>
            </div>
            <div className="g1"><label>Permanent address</label><input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Full address"/></div>
            <div className="g2">
              <div><label>Nationality</label><input value={nationality} onChange={e=>setNationality(e.target.value)} placeholder="e.g. Vietnamese"/></div>
              <div><label>Passport / ID</label><input value={passport} onChange={e=>setPassport(e.target.value)} placeholder="e.g. B1234567"/></div>
            </div>
            <div className="g2" style={{marginBottom:16}}>
              <div><label>Passport expiry</label><input value={passExp} onChange={e=>setPassExp(e.target.value)} placeholder="01/01/2030"/></div>
              <div><label>Bank details</label><input value={bank} onChange={e=>setBank(e.target.value)} placeholder="Bank, account no."/></div>
            </div>
            <div className="asana-preview">
              <div style={{fontSize:11,fontFamily:'DM Mono,monospace',color:'#4db896',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:6}}>Asana task</div>
              <div className="asana-name">{taskName()}</div>
              <div className="asana-section">People - Team - Relations → New Employees (Onboarding)</div>
              <div className="subtask-list">{SUBTASKS.map((s,i) => <span key={i} className="subtask-pill">{i+1}. {s}</span>)}</div>
            </div>
            {err3 && <div className="err">{err3}</div>}
            {!showHandoff3
              ? <div className="btn-row">
                  <button className="btn btn-ghost" onClick={() => setTab(2)}>← Back</button>
                  <button className="btn btn-accent" onClick={handleCreateAsana}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    Create Asana task
                  </button>
                </div>
              : <div className="handoff">
                  <div className="handoff-title">✓ Ready — copy &amp; paste into Claude chat</div>
                  <div className="handoff-note">Paste into Claude chat. Claude creates task + 12 subtasks + docs + welcome email.</div>
                  <div className="handoff-body">{cmd3()}</div>
                  <CopyButton text={cmd3()}/>
                </div>
            }
          </div>
        )}
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
