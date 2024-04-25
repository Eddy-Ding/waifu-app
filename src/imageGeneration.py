from openai import OpenAI
import requests

img_data = requests.get('https://oaidalleapiprodscus.blob.core.windows.net/private/org-AbNS1ZZMigCuXxTrDk5lbQuQ/user-4r6o9vFHa9aHuEpPOemBfRid/img-EK28SfZDJjMnTy6are0m1CAN.png?st=2024-04-24T23%3A20%3A19Z&se=2024-04-25T01%3A20%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-24T19%3A18%3A57Z&ske=2024-04-25T19%3A18%3A57Z&sks=b&skv=2021-08-06&sig=/mqJmK2USlRqJ1AQQLDmKg939tDb8VjwzqOsOHc2FQA%3D').content
with open('image_name.jpg', 'wb') as handler:
    handler.write(img_data)
# client = OpenAI(api_key='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')

# response = client.images.generate(
#   model="dall-e-3",
#   prompt="Generate the following person on a white background: Gender: Female, Ethnicity: Chinese, Hair: Long, Straight, Black, Eyes: Hazel, Body Type: Athletic, Age: 18-25",
#   size="1024x1024",
#   quality="standard",
#   n=1,
# )

# image_url = response.data[0].url
# print(image_url)