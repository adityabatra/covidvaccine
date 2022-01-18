import json

with open('districts.json','r+') as f:
    data = json.load(f)
    print(data["state_id"])
