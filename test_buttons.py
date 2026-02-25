import json, subprocess, sys

TOKEN = sys.argv[1]
B = sys.argv[2]

def api(method, path, data=None, auth=True):
    cmd = ["curl", "-s", "-w", "\n%{http_code}", "-X", method, f"{B}{path}"]
    if auth:
        cmd += ["-b", f"token={TOKEN}"]
    if data:
        cmd += ["-H", "Content-Type: application/json"]
        cmd += ["--data-raw", json.dumps(data)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    lines = r.stdout.strip().rsplit("\n", 1)
    body = lines[0] if len(lines) > 1 else ""
    code = lines[-1] if lines else "0"
    try:
        j = json.loads(body) if body else {}
    except:
        j = {"raw": body[:100]}
    return int(code), j

results = {"pass": 0, "fail": 0}

def check(name, code, expected, detail=""):
    status = "PASS" if code == expected else "FAIL"
    print(f"  [{status}] {name} -> {code} {detail}")
    if status == "PASS":
        results["pass"] += 1
    else:
        results["fail"] += 1

print("=" * 55)
print("1. LOGIN PAGE")
print("=" * 55)
c, d = api("POST", "/api/auth/login", {"email": "robert@talentsuite.io", "password": "admin"}, auth=False)
check("Anmelden (korrekt)", c, 200, d.get("name",""))
c, d = api("POST", "/api/auth/login", {"email": "wrong@x.de", "password": "x"}, auth=False)
check("Anmelden (falsch)", c, 401, d.get("error",""))
c, d = api("POST", "/api/auth/login", {"email": "", "password": ""}, auth=False)
check("Anmelden (leer)", c, 400, d.get("error",""))

print()
print("=" * 55)
print("2. TOP NAV BAR")
print("=" * 55)
c, d = api("GET", "/api/search?q=as")
check("Suche (>=2 Zeichen)", c, 200, f"{len(d.get('results',[]))} Ergebnisse")
c, d = api("GET", "/api/search?q=a")
check("Suche (<2 Zeichen)", c, 400, d.get("error",""))
c, d = api("GET", "/api/auth/me")
check("Auth Check (/me)", c, 200, d.get("name",""))
c, d = api("POST", "/api/auth/logout", {})
check("Logout", c, 200, f"success={d.get('success')}")

print()
print("=" * 55)
print("3. DASHBOARD")
print("=" * 55)
c, d = api("GET", "/api/dashboard/stats")
check("Dashboard Stats laden", c, 200, f"accounts={d.get('counts',{}).get('accounts',0)}")

print()
print("=" * 55)
print("4. LIST PAGES - Daten laden + Sortierung + Paging")
print("=" * 55)
for entity in ["accounts", "contacts", "leads", "opportunities", "unterkuenfte", "buchungen", "angebote", "stundenerfassung", "cases", "tasks"]:
    c, d = api("GET", f"/api/{entity}?page=1&limit=25&sort=createdAt&order=desc")
    total = d.get("total", d.get("pagination",{}).get("total", 0))
    check(f"{entity} Liste laden", c, 200, f"total={total}")

# Test sort + search params
c, d = api("GET", "/api/accounts?page=1&limit=25&sort=name&order=asc&search=test")
check("Accounts sortiert+gesucht", c, 200)
c, d = api("GET", "/api/leads?page=1&limit=25&sort=status&order=desc&search=asdf")
check("Leads sortiert+gesucht", c, 200)

print()
print("=" * 55)
print("5. NEU BUTTONS - Records erstellen")
print("=" * 55)

c, d = api("POST", "/api/accounts", {"name": "BtnTest AG", "recordType": "Account_Standart"})
check("Account Neu", c, 201, d.get("id","")[:10])
aid = d.get("id","")

c, d = api("POST", "/api/contacts", {"firstName": "Btn", "lastName": "Person", "accountId": aid})
check("Kontakt Neu", c, 200, d.get("id","")[:10])
kid = d.get("id","")

c, d = api("POST", "/api/leads", {"lastName": "BtnLead", "status": "Neu"})
check("Lead Neu", c, 201, d.get("id","")[:10])
lid = d.get("id","")

c, d = api("POST", "/api/opportunities", {"name": "BtnDeal", "stage": "Qualifizierung", "amount": 5000, "accountId": aid})
check("Opportunity Neu", c, 201, d.get("id","")[:10])
oid = d.get("id","")

c, d = api("POST", "/api/tasks", {"subject": "BtnTask", "status": "Offen", "priority": "Mittel"})
check("Task Neu", c, 200, d.get("id","")[:10])
tid = d.get("id","")

c, d = api("POST", "/api/cases", {"subject": "BtnCase", "status": "Neu", "priority": "Hoch", "recordType": "Standard"})
check("Case Neu", c, 200, d.get("id","")[:10])
csid = d.get("id","")

c, d = api("POST", "/api/angebote", {"name": "BtnAngebot", "status": "Entwurf"})
check("Angebot Neu", c, 200, d.get("id","")[:10])
agid = d.get("id","")

c, d = api("POST", "/api/freelancers", {"name": "TestFreelancer"})
check("Freelancer Neu (Hilfsdaten)", c, 200, d.get("id","")[:10])
frid = d.get("id","")

c, d = api("POST", "/api/unterkuenfte", {"name": "BtnUnterkunft", "vermieterId": aid, "freelancerId": frid})
check("Unterkunft Neu", c, 201, d.get("id","")[:10])
uiid = d.get("id","")

c, d = api("POST", "/api/stundenerfassung", {"stunden": 2.5, "datum": "2026-02-25", "fuerWen": "Test", "userId": "admin002"})
check("Stundenerfassung Neu", c, 200, d.get("id","")[:10])
sid = d.get("id","")

print()
print("=" * 55)
print("6. SPEICHERN BUTTONS - Records aktualisieren")
print("=" * 55)
c, d = api("PUT", f"/api/accounts/{aid}", {"name": "BtnTest Updated"})
check("Account speichern", c, 200, d.get("name",""))
c, d = api("PUT", f"/api/contacts/{kid}", {"firstName": "Updated"})
check("Kontakt speichern", c, 200, d.get("firstName",""))
c, d = api("PUT", f"/api/leads/{lid}", {"status": "Kontaktiert"})
check("Lead speichern", c, 200, d.get("status",""))
c, d = api("PUT", f"/api/opportunities/{oid}", {"stage": "Angebot", "amount": 7500})
check("Opportunity speichern", c, 200, f"stage={d.get('stage','')}")
c, d = api("PUT", f"/api/tasks/{tid}", {"status": "Erledigt"})
check("Task speichern", c, 200, d.get("status",""))
c, d = api("PUT", f"/api/cases/{csid}", {"status": "In Bearbeitung"})
check("Case speichern", c, 200, d.get("status",""))
c, d = api("PUT", f"/api/angebote/{agid}", {"status": "Gesendet"})
check("Angebot speichern", c, 200, d.get("status",""))
c, d = api("PUT", f"/api/unterkuenfte/{uiid}", {"name": "Updated UK"})
check("Unterkunft speichern", c, 200, d.get("name",""))
c, d = api("PUT", f"/api/stundenerfassung/{sid}", {"stunden": 4.0, "datum": "2026-02-25", "fuerWen": "Test", "userId": "admin002"})
check("Stundenerfassung speichern", c, 200, f"stunden={d.get('stunden','')}")

print()
print("=" * 55)
print("7. QUICK ACTIONS - Anruf loggen + Aufgabe")
print("=" * 55)
for etype, eid, label in [
    ("account", aid, "Account"),
    ("contact", kid, "Kontakt"),
    ("lead", lid, "Lead"),
    ("opportunity", oid, "Opportunity"),
    ("case", csid, "Case"),
    ("task", tid, "Task"),
]:
    c, d = api("POST", "/api/activities", {"entityType": etype, "entityId": eid, "activityType": "call_logged", "title": "Anruf geloggt"})
    check(f"Anruf loggen ({label})", c, 200)
    c, d = api("POST", "/api/activities", {"entityType": etype, "entityId": eid, "activityType": "task_created", "title": "Aufgabe erstellt"})
    check(f"Neue Aufgabe ({label})", c, 200)

print()
print("=" * 55)
print("8. ACTIVITY TIMELINE - Kommentar posten")
print("=" * 55)
c, d = api("POST", "/api/activities", {"entityType": "account", "entityId": aid, "activityType": "comment", "title": "Testkommentar", "description": "Inhalt"})
check("Kommentar posten", c, 200, d.get("id","")[:10])
c, d = api("GET", f"/api/activities?entityType=account&entityId={aid}")
count = len(d) if isinstance(d, list) else 0
check("Timeline laden", c, 200, f"{count} Eintraege")

print()
print("=" * 55)
print("9. RECORD PATH - Status per Klick")
print("=" * 55)
c, d = api("PUT", f"/api/leads/{lid}", {"status": "Qualifiziert"})
check("Lead Pfad: Qualifiziert", c, 200, d.get("status",""))
c, d = api("PUT", f"/api/opportunities/{oid}", {"stage": "Verhandlung"})
check("Opp Pfad: Verhandlung", c, 200, d.get("stage",""))
c, d = api("PUT", f"/api/cases/{csid}", {"status": "Eskaliert"})
check("Case Pfad: Eskaliert", c, 200, d.get("status",""))
c, d = api("PUT", f"/api/tasks/{tid}", {"status": "In Bearbeitung"})
check("Task Pfad: In Bearbeitung", c, 200, d.get("status",""))

print()
print("=" * 55)
print("10. LIST VIEW BUTTONS")
print("=" * 55)
c, d = api("POST", "/api/list-views", {"entity": "accounts", "name": "Meine Ansicht", "filters": [], "visibleColumns": ["name", "email"], "sortOrder": "asc", "viewMode": "table"})
check("Ansicht erstellen", c, 200, d.get("name",""))
lvid = d.get("id","")
c, d = api("GET", "/api/list-views?entity=accounts")
check("Ansichten laden", c, 200, f"{len(d) if isinstance(d, list) else 0} Views")
c, d = api("PUT", f"/api/list-views/{lvid}", {"name": "Umbenannt", "isPinned": True})
check("Ansicht bearbeiten", c, 200, d.get("name",""))
c, d = api("DELETE", f"/api/list-views/{lvid}")
check("Ansicht loeschen", c, 200)

print()
print("=" * 55)
print("11. GLOBALE SUCHE")
print("=" * 55)
c, d = api("GET", "/api/search?q=Btn")
types = [r["type"] for r in d.get("results", [])]
check("Suche findet Testdaten", c, 200, f"{len(types)} Treffer: {types}")

print()
print("=" * 55)
print("12. LOESCHEN BUTTONS")
print("=" * 55)
for eid, label, path in [
    (sid, "Stundenerfassung", "stundenerfassung"),
    (agid, "Angebot", "angebote"),
    (csid, "Case", "cases"),
    (tid, "Task", "tasks"),
    (oid, "Opportunity", "opportunities"),
    (kid, "Kontakt", "contacts"),
    (uiid, "Unterkunft", "unterkuenfte"),
    (lid, "Lead", "leads"),
    (aid, "Account", "accounts"),
    (frid, "Freelancer", "freelancers"),
]:
    c, d = api("DELETE", f"/api/{path}/{eid}")
    check(f"{label} loeschen", c, 200)

print()
print("=" * 55)
p = results["pass"]
f = results["fail"]
t = p + f
print(f"ERGEBNIS: {p}/{t} PASS, {f}/{t} FAIL")
if f == 0:
    print("ALLE BUTTONS FUNKTIONIEREN!")
else:
    print(f"ACHTUNG: {f} Tests fehlgeschlagen!")
print("=" * 55)
