from fastapi import FastAPI, Form
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse


app = FastAPI()


login_form = {"id": "12", "password": "1234" ,"name":"sdfg"}
score_form = {"Web": "0", "Data": "0" ,"SE":"0","AI":"0"}

@app.get("/getall/")
async def root():
    return login_form

@app.post("/login/", response_class=HTMLResponse)
async def start(id: str = Form(...), password: str = Form(...)):
    if id == login_form["id"] and password == login_form["password"]:
        redirect_url = f"/transcript/?id={id}&name={login_form['name']}"
        return RedirectResponse(url=redirect_url,status_code=302)
    else:
        error_message = "<h1 style='color:red;'>Incorrect login</h1>"
        return HTMLResponse(content=error_message)

@app.post("/transcript/score", response_class=HTMLResponse)
async def get_html():
    html_content = f"""
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Lab 13 - Login</title>
    </head>
    <body>
        <h1 style="text-align:center">Transcript Entry Form</h1>
        <br>
        <h3 style="text-align:center">school of engineering</h1>
        <br>
        <p>Student ID:{login_form['id']}</p>
        <p>Name: {login_form['name']}</p>
    <table>
        <tr>
            <th colspan="8"> Course title </th>
            <th> Credit </th>
            <th> Score </th>
            <th> Grade </th>
        </tr>
        <tr>
            <td colspan="8">Web Programming</td>
            <td>4</td>
            <td>// idweb </td>
        </tr>
    </table>
    </html>
    """
    return html_content
  
@app.get("/loginget/", response_class=HTMLResponse)
async def get_html():
    html_content = """
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Lab 13 - Login</title>
    </head>
    <body>
        <h1>Login</h1>
        <form action="/login/" method="post">
            <label for="username">Username:</label>
            <input type="text" name="id" id="id" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>
            <br>
            <input type="submit" value="Login">
        </form>
    </html>
    """
    return html_content 


@app.get("/transcript/", response_class=HTMLResponse)
async def get_transcript(id: str, name: str):
    html_content = f"""
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Lab 13 - Transcript</title>
    </head>
    <body>
        <h1 style="text-align:center">Transcript Entry Form</h1>
        <form action="/update_scores/" method="post">
            <table>
                <tr>
                    <td colspan=4 >Student ID: {id}</td>
                    <td colspan=4 >Name: {name}</td>
                </tr>
                <tr>
                    <td colspan=2> Course Code </td>
                    <td colspan=2> Course Name </td>
                    <td colspan=2> Credit </td>
                    <td colspan=2> Score </td>
                </tr>
                <tr>
                    <td colspan=2><p>101</p></td>
                    <td colspan=2><p>Web Programming</p></td>
                    <td colspan=2><p>4</p></td>
                    <td colspan=2><input type="text" name="Web" id="Web" value="{score_form['Web']}"></td>
                </tr>
                <tr>
                    <td colspan=2><p>101</p></td>
                    <td colspan=2><p>Web Programming</p></td>
                    <td colspan=2><p>3</p></td>
                    <td colspan=2><input type="text" name="Data" id="Data" value="{score_form['Data']}"></td>
                </tr>
                <tr>
                    <td colspan=2><p>101</p></td>
                    <td colspan=2><p>Web Programming</p></td>
                    <td colspan=2><p>4</p></td>
                    <td colspan=2><input type="text" name="SE" id="SE" value="{score_form['SE']}"></td>
                </tr>
                <tr>
                    <td colspan=2><p>101</p></td>
                    <td colspan=2><p>Web Programming</p></td>
                    <td colspan=2><p>3</p></td>
                    <td colspan=2><input type="text" name="AI" id="AI" value="{score_form['AI']}"></td>
                </tr>
                <tr>
                    <td>
                        <input type="submit" value="Submit"  method="get" action="/transcript/score">
                    </td>
                </tr>
            </table>
        </form>
        
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.post("/update_scores/", )
async def update_scores(Web: str = Form(...), Data: str = Form(...), SE: str = Form(...), AI: str = Form(...)):
    score_form["Web"] = Web
    score_form["Data"] = Data
    score_form["SE"] = SE
    score_form["AI"] = AI
    return {"message": "Scores updated successfully!", "score_form": score_form}
@app.get("/update_scores/")
async def get_html():
    redirect_url = "/transcript/score"
    return RedirectResponse(url=redirect_url,status_code=302)

