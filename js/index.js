$('.button').click(function(event){
 input(event)
});
let operand1 = '', operand2 = '', operator = '';
$('.equal').click(calculate);
$('.clear').click(clear);

function input(event){
    const val = event.target.dataset.val;
    if(val === '=' || val === 'C') {
 return;
}
    if (!$(event.target).hasClass('num')){
        operator = val;
    } else if (!operator){
        operand1 += val;
    } else if (operator){
        operand2 +=val;
    }
    $('.display').text(`${operand1 ?? ''}${operator ?? ''}${operand2 ?? ''}`);
}

function calculate(){
    let result;
    if(!operand1 && operand2 && operator){
        operand1 = 0;
    }
    if (operand2 === '0' && operator === '/'){
        $('.display').text('ERROR');
        operand1 = '0';
    } else {
        result = evaluate(`${operand1 ?? ''}${operator ?? ''}${operand2 ?? ''}`);
        $('.display').text(result);
        const log = `${operand1 ?? '0'}${operator ?? ''}${operand2 ?? ''}=${result}`;
        $('#log').prepend(logEntry(log));
        $('.circle').hover(function(){
 $(this).css('border-color', 'red')
}, function(){
 $(this).css('border-color', 'black')
});
        $('.circle').click(function(){
 $(this).toggleClass('fill')
});
        $('.cross').hover(function(){
 $(this).css('color', 'red')
}, function(){
 $(this).css('color', 'black')
})
    }
    operand1 = result;
    operand2 = '';
    operator = '';
}

function evaluate(fn) {
    return new Function('return ' + fn)();
}

function logEntry(log){
    let eqClass = 'equation';
    if (log.includes('48')){
        eqClass += ' underline';
    }
    return`
        <div class="entry">
          <div>
            <div class="circle" ></div>
          </div>
          <div class="${eqClass}">${log}</div>
          <div class="cross" onclick='deleteRecord(event)'>&#10006;</div>
        </div>
        `
}

function clear(){
    operand1 = '';
    operand2 = '';
    operator = '';
    $('.display').text('0');
}

function changeColor(e){
    e.target.classList.toggle('fill');
}

function deleteRecord(e){
    e.target.parentNode.remove();
}

$('#log').scroll(function () {
    console.log(`Scroll Top: ${$(this).scrollTop()}`);
  });
