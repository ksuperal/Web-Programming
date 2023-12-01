from js import document
from pyodide import create_proxy
from datetime import datetime

def getTime():
    now = datetime.now()
    return now.strftime("%m/%d/%Y, %H:%M:%S")

class InputLog():
    def __init__(self, element_id):
        self.element_id = element_id
        self._element = None

    @property
    def element(self):
        """Return the dom element"""
        if not self._element:
            self._element = document.querySelector(f"#{self.element_id}")
        return self._element

    def on_click(self, event):
        temp = document.createTextNode("Clicking at "+getTime())
        self.element.appendChild(temp)
        lineBreak = document.createElement('br');
        self.element.appendChild(lineBreak)

    def on_event(self, event):
        text = "Keypress: Key code: " + str(event.keyCode) + \
        " Key: " + str(event.key) + " at: " + getTime()
        temp = document.createTextNode(text)
        self.element.appendChild(temp)
        lineBreak = document.createElement('br');
        self.element.appendChild(lineBreak)
    
output = InputLog("output")

event_proxy = create_proxy(output.on_event)
click_proxy = create_proxy(output.on_click)

document.addEventListener("click", click_proxy)
document.addEventListener("keydown", event_proxy)