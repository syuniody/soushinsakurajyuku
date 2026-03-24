/**
 * 桜の花びら装飾 — ページ背景にランダムに花びらを散らす
 */
(function () {
  'use strict';

  // 花びらのSVGパス（丸みのある桜の花びら型）
  var petalPaths = [
    'M8 0C12 2 14 6 12 10C10 13 6 13 4 10C2 6 4 2 8 0Z',
    'M7 0C10 3 11 7 9 10C7 12 4 11 3 8C1 5 3 1 7 0Z',
    'M6 0C9 2 10 5 8 8C6 10 3 10 2 7C0 4 3 1 6 0Z'
  ];

  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
  document.body.insertBefore(container, document.body.firstChild);

  // 花びらの数（PCは多め、スマホは少なめ）
  var count = window.innerWidth > 768 ? 18 : 10;

  for (var i = 0; i < count; i++) {
    var size = 10 + Math.random() * 16;
    var path = petalPaths[Math.floor(Math.random() * petalPaths.length)];
    var rotation = Math.floor(Math.random() * 360);
    var opacity = 0.25 + Math.random() * 0.20;
    var left = Math.random() * 100;
    var top = Math.random() * 100;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 14 14');
    svg.style.cssText = 'position:absolute;left:' + left + '%;top:' + top + '%;opacity:' + opacity + ';transform:rotate(' + rotation + 'deg);';

    var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', path);
    pathEl.setAttribute('fill', '#F4B8C8');
    svg.appendChild(pathEl);
    container.appendChild(svg);
  }
})();
