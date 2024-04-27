from openai import OpenAI
import requests


client = OpenAI(api_key='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')

response = client.images.generate(
  model="dall-e-3",
  prompt="Generate the following person on a white background: Gender: Female, Ethnicity: Chinese, Hair: Long, Straight, Black, Eyes: Hazel, Body Type: Athletic, Age: 18-25",
  size="1024x1024",
  quality="standard",
  n=1,
)
image_url = response.data[0].url

img_data = requests.get(image_url).content
with open('image_name.jpg', 'wb') as handler:
    handler.write(img_data)