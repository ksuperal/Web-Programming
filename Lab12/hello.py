from fastapi import FastAPI

app = FastAPI()

student={
            29:{"ID":29 , "first_name":"Ahmed" , "last_name":"Ali"},
            30:{"ID":30 , "first_name":"Mohamed" , "last_name":"Ali"},
            
        }
@app.get("/student/all")
async def root():
    return student

@app.get("/student/{student_id}")
async def root(student_id:int):
    return student[student_id]

@app.post("/student/new/{student_id}/{first_name}/{last_name}")
async def root(student_id:int,first_name:str,last_name:str):
    student[student_id]={"ID":student_id , "first_name":first_name , "last_name":last_name}
    return student[student_id]    

@app.post("/student/new/")
async def root(dict:dict):
    if str(dict["ID"]) in student:
        return "ID is already exist"
    else:
        student[dict["ID"]]=dict
        return student[dict["ID"]]
    
@app.post("/student/newForm")
async def root(student_id:int,first_name:str,last_name:str):
    student[student_id]={"ID":student_id , "first_name":first_name , "last_name":last_name}
    return student[student_id]
