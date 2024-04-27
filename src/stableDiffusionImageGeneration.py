import base64
import requests
import os

url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"

body = {
  "steps": 40,
  "width": 1024,
  "height": 1024,
  "seed": 0,
  "cfg_scale": 25,
  "samples": 1,
  "style_preset": "photographic",
  "text_prompts": [
    {
      "text": "A 25 year old woman from china, 160 cm, brown colored hair, brown colored  eyes, skinny",
      "weight": 1
    },
    {
      "text": "blurry, dark",
      "weight": -1
    }
  ],
}

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": "Bearer sk-mdinf40LfWHgFO3I3OO46ywesDj7MRX30JXaEkzuXHtsI9cq",
}

response = requests.post(
  url,
  headers=headers,
  json=body,
)

if response.status_code != 200:
    raise Exception("Non-200 response: " + str(response.text))

data = response.json()

# make sure the out directory exists
if not os.path.exists("./out"):
    os.makedirs("./out")

for i, image in enumerate(data["artifacts"]):
    with open(f'./out/girl.png', "wb") as f:
        f.write(base64.b64decode(image["base64"]))