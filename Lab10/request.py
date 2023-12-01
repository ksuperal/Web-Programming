import requests

def post(name, surname, id):
    url = 'http://161.246.5.61:11320/students/new' +'/'+ name + '/' + surname + '/' + id
    response = requests.post(url)
    print('URL: ', url)
    if response.status_code == 200:
        print('Request is successful')
        print('Response: ', response.text)
    else:
        print('Request is not successful')
        print('Status code: ', response.status_code)
        
def getall(url):
    response = requests.get(url)
    if response.status_code == 200:
        print('Request is successful')
        print('Response: ', response.text)
    else:
        print('Request is not successful')
        print('Status code: ', response.status_code)

def geteach(id):
    url = 'http://161.246.5.61:11320/students/html/' + id
    response = requests.get(url)
    if response.status_code == 200:
        print('Request is successful')
        print('Response: ', response.text)
    else:
        print('Request is not successful')
        print('Status code: ', response.status_code)


post('Kanokjan', 'Singhsuwan', '65011321')
getall('http://161.246.5.61:11320/students/html')
geteach('65011321')
