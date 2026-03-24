/**
 * CMS データ読み込み・動的表示スクリプト
 * Decap CMS で編集した JSON データをページに反映する
 */

(function () {
  'use strict';

  // --- 料金データの読み込み・表示 ---
  function renderPrices(data) {
    var container = document.querySelector('.price-tables-container');
    if (!container || !data.tables) return;

    container.innerHTML = data.tables.map(function (table) {
      var rows = table.rows.map(function (r) {
        return '<tr><th>' + r.grade + '</th><td>' + r.weekly1 + '</td><td>' + r.weekly2 + '</td><td>' + r.weekly3 + '</td><td>' + r.unlimited + '</td></tr>';
      }).join('');

      return '<h3 class="price-table__heading">' + table.title + '</h3>' +
        '<div class="table-wrapper">' +
        '<table class="price-table">' +
        '<thead><tr><th></th><th>週1回</th><th>週2回</th><th>週3回</th><th>通い放題</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
        '</table></div>';
    }).join('');

    // その他の費用
    var feeGrid = document.querySelector('.fee-notes__grid');
    if (feeGrid && data.fees) {
      feeGrid.innerHTML = data.fees.map(function (f) {
        return '<div class="fee-notes__item"><span class="fee-notes__label">' + f.label + '</span><span class="fee-notes__value">' + f.value + '</span></div>';
      }).join('');
    }

    // 備考
    var notesEl = document.querySelector('.fee-notes__notes');
    if (notesEl && data.notes) {
      notesEl.innerHTML = data.notes.map(function (n) {
        return '<p class="fee-notes__note">' + n + '</p>';
      }).join('');
    }
  }

  // --- 成績アップ・合格実績の読み込み・表示 ---
  function renderAchievements(data) {
    // 成績アップカード
    var grid = document.querySelector('.score-showcase__grid');
    if (grid && data.score_ups) {
      grid.innerHTML = data.score_ups.map(function (s) {
        var up = s.after - s.before;
        return '<div class="score-showcase__card">' +
          '<span class="score-showcase__student">' + s.subject + '</span>' +
          '<span class="score-showcase__subject">' + s.before + '点→' + s.after + '点</span>' +
          '<span class="score-showcase__number">' + up + '</span>' +
          '<span class="score-showcase__unit">点UP!</span>' +
          '</div>';
      }).join('');
    }

    // 合格実績
    var resultsGrid = document.querySelector('.pass-results__grid');
    if (resultsGrid && data.pass_results) {
      var publicSchools = data.pass_results.public_schools || [];
      var privateSchools = data.pass_results.private_schools || [];

      resultsGrid.innerHTML =
        '<div class="pass-results__category">' +
          '<span class="pass-results__badge pass-results__badge--public">公立</span>' +
          '<div class="pass-results__schools">' +
            publicSchools.map(function (s) {
              return '<span class="pass-results__school">' + s + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="pass-results__category">' +
          '<span class="pass-results__badge pass-results__badge--private">私立</span>' +
          '<div class="pass-results__schools">' +
            privateSchools.map(function (s) {
              return '<span class="pass-results__school">' + s + '</span>';
            }).join('') +
          '</div>' +
        '</div>';
    }
  }

  // --- データ取得ヘルパー ---
  function loadJSON(url, callback) {
    fetch(url)
      .then(function (res) { return res.json(); })
      .then(callback)
      .catch(function (err) {
        console.warn('CMS data load failed:', url, err);
      });
  }

  // --- パス判定ヘルパー ---
  function isHomePage() {
    return !!document.querySelector('link[href*="pages/home"]');
  }

  function dataPath(filename) {
    return isHomePage() ? 'data/' + filename : '../data/' + filename;
  }

  // --- 初期化 ---
  function init() {
    // 料金テーブルがある場合（ホーム・コースページ共通）
    if (document.querySelector('.price-tables-container')) {
      loadJSON(dataPath('prices.json'), renderPrices);
    }

    // 合格実績セクションがある場合（ホームページ）
    if (document.querySelector('.score-showcase__grid') || document.querySelector('.pass-results__grid')) {
      loadJSON(dataPath('achievements.json'), renderAchievements);
    }
  }

  // DOM読み込み後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
