'usestrict'

const elements = [];
attachEvent();

function attachEvent() {
    const pushBtn = document.querySelector('.push-btn');
    const popBtn = document.querySelector('.pop-btn');
    if(!pushBtn || !popBtn) return;
    pushBtn.addEventListener('click', push);
    popBtn.addEventListener('click', pop);
}

function push() {
    pushElement();
    adjustElement();
}

function pop() {
    popElement();
    adjustElement();
}

// 要素を追加する
function pushElement() {
    const target = document.querySelector('#js-target');
    if(!target) return;
    const e = document.createElement('div');
    const size = getElementSize();
    e.style.width = `${size}px`;
    e.style.height = `${size}px`;
    target.insertAdjacentElement('beforeend', e);
    elements.push(e);
}

function getElementSize() {
    const target = document.querySelector('.elm-size');
    if(!target) return 0;
    return Number(target.value);
}

// 要素の配置を整形する
function adjustElement() {
    elements.forEach((e, i) => {
        const pos = getPosition(i);
        e.style.position = 'absolute';
        e.style.left = `${pos[0]}px`;
        e.style.top = `${pos[1]}px`;
        e.style.transform = 'translate(-50%, -50%)'
    });
}

// 要素の座標を計算する
function getPosition(i) {
    const target = document.querySelector('#js-target');
    if(!target) return;

    // 半径を取得する
    const r = target.clientWidth / 2;

    // 角度を取得する
    const a = 360 / elements.length;
    const d = a * i

    // 座標を取得する
    const x = Math.cos(d * Math.PI / 180) * r + r;
    const y = Math.sin(d * Math.PI / 180) * r + r;

    return [x, y];
}

// 最後に追加した要素を削除する
function popElement() {
    elements.forEach((e, i) => {
        if (isLastElement(i) === false) return;
        e.remove();
    });
    elements.pop();
}

function isLastElement(i) {
    return i === elements.length - 1;
}


