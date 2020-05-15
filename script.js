'usestrict'

const elements = [];
attachEventForRange();
attachEventForMain();

// レンジスライダーの値を表示する為のイベントを追加する
function attachEventForRange() {
    const range   = document.querySelector('.range-input');

    if(!range) return;

    range.addEventListener('mousedown', displayRangeValue);
    range.addEventListener('mouseup', hideRangeValue);
    document.addEventListener('mousemove', changeRangeValue);
}

function displayRangeValue() {
    const value = document.querySelector('.range-value');
    
    if(!value) return;

    value.style.display = 'block';
}

function hideRangeValue() {
    const value = document.querySelector('.range-value');
  
    if(!value) return;
  
    value.style.display = 'none';
}

// マウスにあわせて要素を動かす
function changeRangeValue(event) {
    const range = document.querySelector('.range-input');
    const value = document.querySelector('.range-value');

    if(!range || !value) return;
    
    const x = event.offsetX;
    const e = document.querySelector('.range-value');
    e.innerHTML = `${range.value}px`;
    e.style.left = `${x}px`;
}

// メイン機能のためのイベントを追加する
function attachEventForMain() {
    const pushBtn = document.querySelector('.push-btn');
    const popBtn  = document.querySelector('.pop-btn');

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
    const target = document.querySelector('.circle');
    if(!target) return;
    const e = document.createElement('div');
    const size = getElementSize();
    e.style.width = `${size}px`;
    e.style.height = `${size}px`;
    target.insertAdjacentElement('beforeend', e);
    elements.push(e);
}

function getElementSize() {
    const range = document.querySelector('.range-input');
    if(!range) return 0;
    return Number(range.value);
}

// 要素の配置を整形する
function adjustElement() {
    elements.forEach((e, i) => {
        const pos = getPosition(i);
        e.style.position = 'absolute';
        e.style.left = `${pos.posX}px`;
        e.style.top = `${pos.posY}px`;
        e.style.transform = 'translate(-50%, -50%)'
    });
}

// 要素の座標を計算する
function getPosition(i) {
    const target = document.querySelector('.circle');
    if(!target) return;

    // 半径を取得する
    const r = target.clientWidth / 2;

    // 角度を取得する
    const a = 360 / elements.length;
    const d = a * i

    // 座標を取得する
    const x = Math.cos(d * Math.PI / 180) * r + r;
    const y = Math.sin(d * Math.PI / 180) * r + r;

    return {posX: x, posY: y};
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
