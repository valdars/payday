function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

var unique = [].filter(onlyUnique);

var index = 0;
var chosen = '';

var $buttons = $('.buttons');
var $words = $('.words');
var $answer = $('.answer');

function update() {
    var words = data.map(x => x.last.split('').reverse().join('').toLocaleLowerCase()).filter(x => x.startsWith(chosen));
    var letters = words.map(x => x.charAt(index)).filter(onlyUnique);

    $buttons.empty();
    letters.forEach(x => $buttons.append(createBtn(x)));

    $words.empty();
    words.forEach(x => $words.append(createWord(x.split(''))));
}

function createBtn(char) {
    var $btn = $(`<button title="${char}" class="cipher buttom" style="background-image: url(\'img/${char}.png\')"></button>`).on('click', function () { chooseChar(char); });
    return $btn;
}

function createWord(chars) {
    var $container = $('<div class="row">').on('click', function () {
        chooseAnswer(chars);
    });
    chars.forEach(x => $container.append(createChar(x)));
    return $container;
}

function createChar(char) {
    var $img = $(`<img title="${char}" src="img/${char}.png" class="cipher center" />`);
    return $img;
}

function chooseChar(char) {
    chosen = chosen + char;
    index++;
    update();
}

function chooseAnswer(chars) {
    $buttons.empty();
    $words.empty();
    var last = chars.reverse().join('');
    var result = data.find(x => x.last === last);
    var answer = result.answer;
    createAnswerRow()
        .append(createChar(answer[1]))
        .append(createChar(answer[0]))
        .appendTo($answer);
    createAnswerRow()
        .append(createChar(answer[2]))
        .append(createChar(''))
        .appendTo($answer);
    createAnswerRow()
        .append(createChar(answer[4]))
        .append(createChar(answer[3]))
        .appendTo($answer);
}

function createAnswerRow() {
    return $('<div class="row">');
}

update();