document.addEventListener('click', (event) => {
    const element = event.target;
    const output = document.getElementById('result');
    
    if(output.innerHTML === '0'){
        output.innerHTML = '';
    
    } else if (element.id === 'Enter') {
      try {
        output.innerHTML = eval(output.innerHTML);
      } catch (error) {
        output.innerHTML = 'Error';
      }
    } else if (element.id === 'Backspace') {
      output.innerHTML = output.innerHTML.slice(0, -1);
    } else if (element.id === 'c') {
      output.innerHTML = '0';
    } else {
      output.innerHTML += element.textContent;
    }
});
document.addEventListener('keyup', (event) => {
    const key = event.key;
    const output = document.getElementById('result');
  
    if (output.innerHTML === '0') {
      output.innerHTML = '';
    } else if (key === 'Enter') {
      try {
        output.innerHTML = eval(output.innerHTML);
      } catch (error) {
        output.innerHTML = 'Error';
      }
    } else if (key === 'Backspace') {
        output.innerHTML = output.innerHTML.slice(0, -1);
        console.log(output.innerHTML);
    } else if (key === 'c') {
      output.innerHTML = '0';
    } else if (key === '0' || key === '1' || key === '2' || key === '3' || key === '4' || key === '5' || key === '6' || key === '7' || key === '8' || key === '9' || key === '+' || key === '-' || key === '*' || key === '/'
     ) {
      output.innerHTML += key;
    }
  });
  
  
