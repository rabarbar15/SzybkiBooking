from bs4 import BeautifulSoup
import http.client
from datetime import datetime, timedelta
import json
import random

origin = "www.usosweb.uj.edu.pl"
connection = http.client.HTTPSConnection(origin)
until = "2024-06-30"  # do którego dnia mają być pobrane dane
untilDate = datetime.strptime(until, "%Y-%m-%d")
print("----------------------")
print("> USOS DATA SCRAPPER < ")
print("----------------------\n")
print("Scrapping info about rooms schedule until: " + until)


def get_html(uri):
    connection.request("GET", uri)
    return connection.getresponse().read().decode("utf-8")


html = get_html("/kontroler.php?_action=katalog2/sale2/sale&budynek_id=Loj11")
roomsBS4 = BeautifulSoup(html, "html.parser")
roomsTable = roomsBS4.find_all("table")[2]

print("[1/6] Processing rooms info...")
rooms = []
for tr in roomsTable:
    a = tr.find("a")
    if a == -1 or a is None:
        continue
    data = {
        "roomNumber": a.getText(),
        "detailsUrl": a.get("href"),
        "numberOfPlaces": int(tr.find("td", {"align": True}).getText()),
        "computers": False,
        "description": ""
    }
    rooms.append(data)
print("[1/6] DONE")
roomsFile = "rooms.json"
print("[2/6] Writing data to file: " + roomsFile)
with open(roomsFile, 'w') as roomsJson:
    json.dump(rooms, roomsJson)
print("[2/6] DONE")

print("[3/6] Processing details info...")
details = []
for room in rooms:
    html = get_html(room["detailsUrl"].replace("https://" + origin, ""))
    detailsBS4 = BeautifulSoup(html, "html.parser")
    table = detailsBS4.find_all("td", {"colspan": True})
    data = {
        "zone": table[0].find("a").getText(),
        "street": table[1].find("a").getText(),
        "building": table[2].find("a").getText(),
        "organizationalUnit": table[3].find("a").getText(),
        "roomNumber": table[4].getText().split(': ')[1],
        "numberOfPlaces": int(table[5].getText().split(': ')[1]),
        "scheduleUrl": table[6].find("a").get("href"),
        "phoneNumberForBookings": table[7].getText().split('\n')[2][:-1],
        "computers": random.choice([True, False])
    }
    details.append(data)
print("[3/6] DONE")
detailsFile = "details.json"
print("[4/6] Writing data to file: " + detailsFile)
with open(detailsFile, 'w') as detailsJson:
    json.dump(details, detailsJson)
print("[4/6] DONE")


print("[5/6] Processing schedule info...")
schedule = []
today = datetime.today().strftime("%Y-%m-%d")
weekDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
for detail in details:
    url = detail["scheduleUrl"] + "&plan_week_sel_week=" + today
    date = datetime.strptime(url.split("=")[-1], "%Y-%m-%d")
    # date = datetime.strptime("2024-05-30", "%Y-%m-%d")
    while date <= untilDate:
        idx = url.rfind("=")
        url = url[:idx + 1] + date.strftime("%Y-%m-%d")
        html = get_html(url.replace("https://" + origin, ""))
        scheduleBS4 = BeautifulSoup(html, "html.parser")
        startDate = datetime.strptime(scheduleBS4.find(class_="flex gap05 selected_week").getText().split(" - ")[0].strip(), "%Y-%m-%d")
        timetable = scheduleBS4.find("usos-timetable").find_all("div", recursive=False)
        for day in timetable:
            entries = day.find("timetable-day").find_all("timetable-entry")
            if len(entries) == 0:
                continue
            dayOfWeek = day.find("h4").getText()
            currentDate = startDate + timedelta(days=(weekDays.index(dayOfWeek) % 5))
            for entry in entries:
                hours = entry.find_all("span", recursive=False)[2].getText().split(", ")[-1].split(" - ")
                data = {
                    "roomNumber": detail["roomNumber"],
                    "date": currentDate.strftime("%Y-%m-%d"),
                    "start": hours[0],
                    "finish": hours[1],
                    "name": entry.get("name"),
                    "person": entry.find_all("a")[1].getText(),
                    "status": "IMPORTED"
                }
                schedule.append(data)
        date = date + timedelta(days=7)
print("[5/6] DONE")
scheduleFile = "schedule.json"
print("[6/6] Writing data to file: " + detailsFile)
with open(scheduleFile, 'w') as scheduleJson:
    json.dump(schedule, scheduleJson)
print("[6/6] DONE")