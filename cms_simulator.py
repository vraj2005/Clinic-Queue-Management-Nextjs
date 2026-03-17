#!/usr/bin/env python3
"""
Clinic Queue Management System — API Simulator
Loops through all role-appropriate API calls with realistic delays.
"""

import requests
import time
import random
import sys
import json
from datetime import date, timedelta

BASE_URL = "https://cmsback.sampaarsh.cloud"

# ─────────────────────────────────────────────
#  Per-user data profiles (different patterns)
# ─────────────────────────────────────────────

USER_PROFILES = {
    "tirth": {
        "display_name": "Tirth Parmar",
        "appointment": {
            "appointmentDate": (date.today() + timedelta(days=1)).isoformat(),
            "timeSlot": "10:00",
        },
        "prescription": {
            "medicines": [
                {"name": "Azithromycin", "dosage": "500mg", "duration": "5 days"},
                {"name": "Paracetamol", "dosage": "650mg", "duration": "3 days"},
            ],
            "notes": "Take after meals. Rest for at least 2 days. Follow up if fever persists.",
        },
        "report": {
            "diagnosis": "Viral pharyngitis with mild fever",
            "testRecommended": "CBC, Throat swab culture",
            "remarks": "Patient shows signs of seasonal infection. Monitor hydration.",
        },
        "new_user": {
            "name": "Dr. Rajesk Nakum",
            "email": f"rajesh.nakum.{random.randint(1000,9999)}@clinic.in",
            "password": "Doc@1234",
            "role": "doctor",
            "phone": "9876543210",
        },
        "queue_status": "in_progress",
    },

    "nakul": {
        "display_name": "Nakul Vaghela",
        "appointment": {
            "appointmentDate": (date.today() + timedelta(days=2)).isoformat(),
            "timeSlot": "14:30",
        },
        "prescription": {
            "medicines": [
                {"name": "Metformin", "dosage": "500mg", "duration": "30 days"},
                {"name": "Atorvastatin", "dosage": "10mg", "duration": "30 days"},
                {"name": "Aspirin", "dosage": "75mg", "duration": "30 days"},
            ],
            "notes": "Avoid sugary foods. Monitor blood glucose daily. Exercise 30 min/day.",
        },
        "report": {
            "diagnosis": "Type 2 Diabetes with hyperlipidemia",
            "testRecommended": "HbA1c, Fasting Blood Sugar, Lipid Profile",
            "remarks": "Patient needs dietary counselling. Schedule 3-month follow-up.",
        },
        "new_user": {
            "name": "Reena Solanki",
            "email": f"reena.solanki.{random.randint(1000,9999)}@clinic.in",
            "password": "Recept@2024",
            "role": "receptionist",
            "phone": "9123456780",
        },
        "queue_status": "done",
    },

    "mitraj": {
        "display_name": "Rana Mitraj",
        "appointment": {
            "appointmentDate": (date.today() + timedelta(days=3)).isoformat(),
            "timeSlot": "09:15",
        },
        "prescription": {
            "medicines": [
                {"name": "Omeprazole", "dosage": "20mg", "duration": "14 days"},
                {"name": "Domperidone", "dosage": "10mg", "duration": "7 days"},
            ],
            "notes": "Take Omeprazole 30 min before breakfast. Avoid spicy food and caffeine.",
        },
        "report": {
            "diagnosis": "Gastroesophageal reflux disease (GERD)",
            "testRecommended": "Upper GI Endoscopy",
            "remarks": "Lifestyle changes mandatory. Elevate head of bed. Avoid late-night meals.",
        },
        "new_user": {
            "name": "Priya Joshi",
            "email": f"priya.joshi.{random.randint(1000,9999)}@clinic.in",
            "password": "Patient@567",
            "role": "patient",
            "phone": "9988776655",
        },
        "queue_status": "skipped",
    },

    "vraj": {
        "display_name": "Nakum Vraj",
        "appointment": {
            "appointmentDate": (date.today() + timedelta(days=1)).isoformat(),
            "timeSlot": "11:45",
        },
        "prescription": {
            "medicines": [
                {"name": "Ibuprofen", "dosage": "400mg", "duration": "5 days"},
                {"name": "Calcium + D3", "dosage": "1000mg/400IU", "duration": "60 days"},
                {"name": "Methocarbamol", "dosage": "750mg", "duration": "10 days"},
            ],
            "notes": "Avoid heavy lifting. Physiotherapy recommended twice a week. Take with food.",
        },
        "report": {
            "diagnosis": "Lumbar muscle strain with Vitamin D deficiency",
            "testRecommended": "X-Ray Lumbar Spine, Vitamin D levels, Calcium serum",
            "remarks": "Patient has desk job — ergonomic corrections advised. Reassess in 4 weeks.",
        },
        "new_user": {
            "name": "Suresh Rana",
            "email": f"suresh.rana.{random.randint(1000,9999)}@clinic.in",
            "password": "Admin@9999",
            "role": "receptionist",
            "phone": "9012345678",
        },
        "queue_status": "in_progress",
    },
}

# ─────────────────────────────────────────────
#  Helpers
# ─────────────────────────────────────────────

def hr(char="─", width=60):
    print(char * width)

def section(title):
    print(f"\n{'─'*60}")
    print(f"  {title}")
    print(f"{'─'*60}")

def log_request(method, path):
    print(f"\n  ▶  {method.upper()} {path}")

def log_response(resp, label=""):
    status = resp.status_code
    symbol = "✓" if status < 400 else "✗"
    print(f"  {symbol}  Status: {status}", end="")
    if label:
        print(f"  [{label}]", end="")
    print()
    try:
        data = resp.json()
        pretty = json.dumps(data, indent=4)
        # Limit output to avoid flooding the terminal
        lines = pretty.split("\n")
        if len(lines) > 30:
            print("\n".join(lines[:30]))
            print(f"  ... [{len(lines)-30} more lines hidden]")
        else:
            print(pretty)
    except Exception:
        print(f"  (non-JSON response: {resp.text[:200]})")

def sleep(lo, hi):
    """Realistic human-like delay."""
    delay = round(random.uniform(lo, hi), 2)
    print(f"\n  ⏱  Waiting {delay}s ...\n")
    time.sleep(delay)

def headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

# ─────────────────────────────────────────────
#  API call groups by role
# ─────────────────────────────────────────────

def call_health():
    section("Health Check")
    log_request("GET", "/health")
    r = requests.get(f"{BASE_URL}/health")
    log_response(r, "health")
    sleep(1, 2)

def flow_admin(token, profile):
    section("ADMIN FLOW")

    # Clinic info
    log_request("GET", "/admin/clinic")
    r = requests.get(f"{BASE_URL}/admin/clinic", headers=headers(token))
    log_response(r, "clinic info")
    sleep(2, 4)

    # List users
    log_request("GET", "/admin/users")
    r = requests.get(f"{BASE_URL}/admin/users", headers=headers(token))
    log_response(r, "list users")
    sleep(1.5, 3)

    # Create a new user
    user_data = profile["new_user"].copy()
    # Randomise email to avoid duplicate conflicts on repeat loops
    parts = user_data["email"].split("@")
    user_data["email"] = f"{parts[0].split('.')[0]}.{random.randint(10000,99999)}@{parts[1]}"
    log_request("POST", "/admin/users")
    r = requests.post(f"{BASE_URL}/admin/users", headers=headers(token), json=user_data)
    log_response(r, "create user")
    sleep(2, 5)

def flow_patient(token, profile):
    section("PATIENT FLOW")

    # My appointments
    log_request("GET", "/appointments/my")
    r = requests.get(f"{BASE_URL}/appointments/my", headers=headers(token))
    log_response(r, "my appointments")
    appointments = []
    try:
        appointments = r.json() if isinstance(r.json(), list) else r.json().get("appointments", [])
    except Exception:
        pass
    sleep(1.5, 3)

    # Book a new appointment
    log_request("POST", "/appointments")
    r = requests.post(
        f"{BASE_URL}/appointments",
        headers=headers(token),
        json=profile["appointment"],
    )
    log_response(r, "book appointment")
    new_appt_id = None
    try:
        new_appt_id = r.json().get("id") or r.json().get("appointment", {}).get("id")
    except Exception:
        pass
    sleep(2, 4)

    # Refresh list
    log_request("GET", "/appointments/my")
    r = requests.get(f"{BASE_URL}/appointments/my", headers=headers(token))
    log_response(r, "my appointments (refreshed)")
    try:
        refreshed = r.json() if isinstance(r.json(), list) else r.json().get("appointments", [])
        if refreshed:
            appointments = refreshed
    except Exception:
        pass
    sleep(1, 2.5)

    # Get appointment detail for the first available appointment
    appt_id = new_appt_id
    if not appt_id and appointments:
        try:
            appt_id = appointments[0].get("id")
        except Exception:
            pass

    if appt_id:
        log_request("GET", f"/appointments/{appt_id}")
        r = requests.get(f"{BASE_URL}/appointments/{appt_id}", headers=headers(token))
        log_response(r, "appointment detail")
        sleep(1.5, 3)

    # My prescriptions
    log_request("GET", "/prescriptions/my")
    r = requests.get(f"{BASE_URL}/prescriptions/my", headers=headers(token))
    log_response(r, "my prescriptions")
    sleep(1, 2)

    # My reports
    log_request("GET", "/reports/my")
    r = requests.get(f"{BASE_URL}/reports/my", headers=headers(token))
    log_response(r, "my reports")
    sleep(1.5, 3)

def flow_receptionist(token, profile):
    section("RECEPTIONIST FLOW")

    today = date.today().isoformat()
    tomorrow = (date.today() + timedelta(days=1)).isoformat()

    # Today's queue
    log_request("GET", f"/queue?date={today}")
    r = requests.get(f"{BASE_URL}/queue", headers=headers(token), params={"date": today})
    log_response(r, f"queue for {today}")
    queue_entries = []
    try:
        data = r.json()
        queue_entries = data if isinstance(data, list) else data.get("queue", [])
    except Exception:
        pass
    sleep(2, 4)

    # Tomorrow's queue
    log_request("GET", f"/queue?date={tomorrow}")
    r = requests.get(f"{BASE_URL}/queue", headers=headers(token), params={"date": tomorrow})
    log_response(r, f"queue for {tomorrow}")
    sleep(1.5, 3)

    # Update first waiting entry if any
    entry_to_update = None
    for entry in queue_entries:
        if entry.get("status") == "waiting":
            entry_to_update = entry
            break

    if entry_to_update:
        q_id = entry_to_update.get("id")
        new_status = profile["queue_status"]
        log_request("PATCH", f"/queue/{q_id}")
        r = requests.patch(
            f"{BASE_URL}/queue/{q_id}",
            headers=headers(token),
            json={"status": new_status},
        )
        log_response(r, f"update → {new_status}")
        sleep(1.5, 3.5)
    else:
        print("\n  ℹ  No 'waiting' entries found to update today.")
        sleep(1, 2)

def flow_doctor(token, profile):
    section("DOCTOR FLOW")

    # Today's queue
    log_request("GET", "/doctor/queue")
    r = requests.get(f"{BASE_URL}/doctor/queue", headers=headers(token))
    log_response(r, "doctor queue")
    queue_items = []
    try:
        data = r.json()
        queue_items = data if isinstance(data, list) else data.get("queue", [])
    except Exception:
        pass
    sleep(2, 4)

    # Add prescription & report for first appointment in queue
    appt_id = None
    for item in queue_items:
        if item.get("appointmentId"):
            appt_id = item["appointmentId"]
            break

    if appt_id:
        log_request("POST", f"/prescriptions/{appt_id}")
        r = requests.post(
            f"{BASE_URL}/prescriptions/{appt_id}",
            headers=headers(token),
            json=profile["prescription"],
        )
        log_response(r, "add prescription")
        sleep(2, 5)

        log_request("POST", f"/reports/{appt_id}")
        r = requests.post(
            f"{BASE_URL}/reports/{appt_id}",
            headers=headers(token),
            json=profile["report"],
        )
        log_response(r, "add report")
        sleep(1.5, 3)
    else:
        print("\n  ℹ  No appointments in doctor queue to write prescription/report.")
        sleep(1, 2)

# ─────────────────────────────────────────────
#  Main
# ─────────────────────────────────────────────

def choose_user():
    hr("═")
    print("  CLINIC CMS — API SIMULATOR")
    hr("═")
    print("\n  Select user profile:\n")
    print("  1. Tirth   (Tirth Parmar)")
    print("  2. Nakul   (Nakul Vaghela)")
    print("  3. Mitraj  (Rana Mitraj)")
    print("  4. Vraj    (Nakum Vraj)")
    print()
    while True:
        choice = input("  Enter 1/2/3/4 or name: ").strip().lower()
        mapping = {"1": "tirth", "2": "nakul", "3": "mitraj", "4": "vraj",
                   "tirth": "tirth", "nakul": "nakul", "mitraj": "mitraj", "vraj": "vraj"}
        if choice in mapping:
            return mapping[choice]
        print("  ⚠  Invalid choice. Try again.")

def get_credentials():
    print()
    email = input("  Email    : ").strip()
    import getpass
    password = getpass.getpass("  Password : ")
    return email, password

def login(email, password):
    section("LOGIN")
    log_request("POST", "/auth/login")
    r = requests.post(f"{BASE_URL}/auth/login", json={"email": email, "password": password})
    log_response(r, "login")
    if r.status_code != 200:
        print("\n  ✗  Login failed. Check credentials.")
        return None, None
    data = r.json()
    token = data.get("token")
    user = data.get("user", {})
    role = user.get("role", "unknown")
    print(f"\n  ✓  Logged in as: {user.get('name')} | Role: {role} | Clinic: {user.get('clinicName')}")
    return token, role

def run_loop(email, password, user_key):
    profile = USER_PROFILES[user_key]
    loop = 0

    while True:
        loop += 1
        hr("═")
        print(f"\n  ╔══ LOOP #{loop} ══ Profile: {profile['display_name']} ══╗\n")

        # Health check every loop
        call_health()

        # Login fresh each loop (realistic — token might expire)
        token, role = login(email, password)
        if not token:
            print("  Retrying login in 10 seconds...")
            time.sleep(10)
            continue

        sleep(1, 2)

        # Route by role
        if role == "admin":
            flow_admin(token, profile)
        elif role == "patient":
            flow_patient(token, profile)
        elif role == "receptionist":
            flow_receptionist(token, profile)
        elif role == "doctor":
            flow_doctor(token, profile)
        else:
            print(f"\n  ⚠  Unknown role '{role}' — no specific flow to run.")

        # Inter-loop gap: 15–40 seconds (realistic polling interval)
        inter_gap = round(random.uniform(15, 40), 1)
        print(f"\n{'═'*60}")
        print(f"  Loop #{loop} complete. Next loop in {inter_gap}s  (Ctrl+C to stop)")
        print(f"{'═'*60}")
        time.sleep(inter_gap)

def main():
    user_key = choose_user()
    email, password = get_credentials()

    print(f"\n  ✓  Profile   : {USER_PROFILES[user_key]['display_name']}")
    print(f"  ✓  Email     : {email}")
    print(f"  ✓  Server    : {BASE_URL}")
    print("\n  Starting simulator (Ctrl+C to stop)...")
    sleep(2, 3)

    try:
        run_loop(email, password, user_key)
    except KeyboardInterrupt:
        print("\n\n  ⏹  Stopped by user. Goodbye!\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
