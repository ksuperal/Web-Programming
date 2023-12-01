var m1 = "0";
document.addEventListener('click', (event) => {
    const element = event.target;
    const output = document.getElementById('result');
    
    if (output.innerHTML === 'Error') {
        output.innerHTML = '0';
    }
    
    if (output.innerHTML === '0' && element.id !== 'pi') {
        output.innerHTML = '';
    }
    
    if (element.id === 'Enter') {
        try {
            output.innerHTML = eval(output.innerHTML);
        } catch (error) {
            output.innerHTML = 'Error';
        }
    } else if (element.id === 'Backspace') {
        output.innerHTML = output.innerHTML.slice(0, -1);
    } else if (element.id === 'c') {
        output.innerHTML = '0';
    } else if (element.id === 'sin') {
        output.innerHTML = Math.sin(eval(output.innerHTML));
    } else if (element.id === 'sqrt') {
        output.innerHTML = Math.sqrt(eval(output.innerHTML));
    } else if (element.id === 'mc') {
        m1 = '0'; // Reset m1 to "0"
    } else if (element.id === 'cos') {
        output.innerHTML = Math.cos(eval(output.innerHTML));
    } else if (element.id === 'square') {
        output.innerHTML = Math.pow(eval(output.innerHTML), 2);
    } else if (element.id === 'm+') {
        try {
            console.log(m1);
            m1 += '+' + output.innerHTML;
            console.log(m1);
            output.innerHTML = '0';
        } catch (error) {
            output.innerHTML = 'Error';
        }
    } else if (element.id === 'tan') {
        output.innerHTML = Math.tan(eval(output.innerHTML));
    } else if (element.id === '1/x') {
        output.innerHTML = 1 / eval(output.innerHTML);
    } else if (element.id === 'm-') {
        try {
            m1 += '-' + output.innerHTML;
            output.innerHTML = '0';
        } catch (error) {
            output.innerHTML = 'Error';
        }
    } else if (element.id === 'pi') {
        output.innerHTML += Math.PI;
    } else if (element.id === 'factorial') {
        let n = 1;
        for (let i = 1; i <= eval(output.innerHTML); i++) {
            n *= i;
        }
        output.innerHTML = n;
    } else if (element.id === 'mr') {
        console.log(m1);
        try {
            output.innerHTML = eval(m1);
        } catch (error) {
            output.innerHTML = 'Error';
        }
    } else {
        output.innerHTML += element.textContent;
    }
});
