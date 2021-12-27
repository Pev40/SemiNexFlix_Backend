import requests 
from bs4 import BeautifulSoup

urlMarca = ('https://www.google.com/search?q=Shooting+Heroin+movie')
r = requests.get(urlMarca,headers={"User-Agent": "Chrome/50.0.2661.94"})
html = r.content
soup = BeautifulSoup(html,"html.parser")

Imagen = soup.find_all('g-img')
i=0
for element in Imagen:
    ImagenPelicula = element.find('img').get('src')
    print(ImagenPelicula)
    img = requests.get(ImagenPelicula, headers={"User-Agent":"Chrome/50.0.2661.94"})
    i=i+1
    nombreImagen = "PruebaPelicula"+str(i)+'.jpg'
    with open(nombreImagen,'wb') as imgen:
        imgen.write(img.content)