import ZODB, ZODB.FileStorage
import transaction
import BTrees._OOBTree

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root
root.students = BTrees._OOBTree.OOBTree()

@app.post("/students/new/")
async def create_student(body = Body(...)):
    sid = int(body["ID"])
    root.students[sid] = body
    transaction.commit()
    return root.students[sid]

@app.on_event("shutdown")
def shutdown_event():
    connection.close()
    db.close()
    storage.close()

