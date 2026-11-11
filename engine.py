#!/usr/bin/env python3
"""
Pushkara Setu 2027 - Ghat Telematics & Crowd Ingress Management Engine
Simulates real-time density updates, automated crowd diversion, and parking availability.
"""

import json
import random
import time

class PushkaraTelematicsEngine:
    def __init__(self, config_path="config.json"):
        with open(config_path, "r", encoding="utf-8") as f:
            self.config = json.load(f)
        self.ghats = self.config["ghats"]
        self.parking = self.config["parking_lots"]

    def compute_ghat_telemetry(self):
        telemetry = []
        for ghat in self.ghats:
            # Simulate real-time occupancy variations
            variation = random.randint(-400, 600)
            ghat["current_occupancy"] = max(1000, min(ghat["capacity"], ghat.get("current_occupancy", int(ghat["capacity"] * 0.75)) + variation))
            density_ratio = ghat["current_occupancy"] / ghat["capacity"]
            density_pct = round(density_ratio * 100, 1)

            if density_pct >= self.config["thresholds"]["critical_density_pct"]:
                status = "CRITICAL / OVERLOAD"
                wait_time = 45
                recommendation = "Divert incoming crowd to Saraswati/Markandeya Ghats"
                level = "RED"
            elif density_pct >= self.config["thresholds"]["moderate_density_pct"]:
                status = "MODERATE DENSITY"
                wait_time = 20
                recommendation = "Monitor ingress rates; advisory notice active"
                level = "ORANGE"
            else:
                status = "SMOOTH / OPTIMAL"
                wait_time = 5
                recommendation = "Optimal flow; actively accept diverted pilgrims"
                level = "GREEN"

            telemetry.append({
                "id": ghat["id"],
                "name": ghat["name"],
                "occupancy": ghat["current_occupancy"],
                "capacity": ghat["capacity"],
                "density_pct": density_pct,
                "wait_time_mins": wait_time,
                "safe_depth_m": ghat["safe_depth_m"],
                "status": status,
                "level": level,
                "action": recommendation
            })
        return telemetry

    def compute_parking_telemetry(self):
        results = []
        for lot in self.parking:
            free_slots = lot["capacity"] - lot["occupied"]
            occupancy_pct = round((lot["occupied"] / lot["capacity"]) * 100, 1)
            results.append({
                "id": lot["id"],
                "name": lot["name"],
                "total": lot["capacity"],
                "occupied": lot["occupied"],
                "free": free_slots,
                "occupancy_pct": occupancy_pct,
                "status": "NEAR CAPACITY" if occupancy_pct > 85 else "SLOTS AVAILABLE"
            })
        return results

    def print_telematics_snapshot(self):
        ghat_metrics = self.compute_ghat_telemetry()
        parking_metrics = self.compute_parking_telemetry()

        print("=" * 80)
        print(f"PUSHKARA SETU 2027 — CENTRAL ICCC TELEMATICS CYCLE [v{self.config['version']}]")
        print("=" * 80)
        print(f"{'ID':<6} | {'Ghat Name':<22} | {'Density':<8} | {'Wait':<9} | {'Level':<7} | {'Status'}")
        print("-" * 80)
        for g in ghat_metrics:
            print(f"{g['id']:<6} | {g['name']:<22} | {g['density_pct']:>5}%  | {g['wait_time_mins']:>2} mins  | {g['level']:<7} | {g['status']}")

        print("\n" + "=" * 80)
        print("REAL-TIME PARKING INGRESS TELEMETRY:")
        print("-" * 80)
        for p in parking_metrics:
            print(f"• {p['name']:<30} : {p['free']:>4} free slots ({100 - p['occupancy_pct']:>5.1f}% available) [{p['status']}]")

        print("\n" + "=" * 80)
        print("AUTOMATED POLICE & VOLUNTEER DIRECTIVES:")
        print("-" * 80)
        for g in ghat_metrics:
            if g["level"] == "RED":
                print(f"[!] DIVERSION ACTIVE: {g['name']} is at capacity. Shift transit buses to Saraswati & Markandeya.")

if __name__ == "__main__":
    engine = PushkaraTelematicsEngine()
    engine.print_telematics_snapshot()
