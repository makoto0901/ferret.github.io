var map;
var marker = [];
var infoWindow = [];
var r = [];
var markerData = [ // マーカーを立てる場所名・緯度・経度
  {
     name: '越中島駅',
     tag: 'koshi',
     message: 'JR駅で利用者数最少!!',
     lat: 35.6679779,
     lng: 139.7904614
  },
  {
     name: '上中里駅',
     tag: 'kami',
     message: 'JR駅で利用者数下から2番目!!',
     lat: 35.7465785,
     lng: 139.7447686
  },
  {
     name: '尾久駅',
     tag: 'oku',
     message: '鉄道ファンは結構好き!',
     lat: 35.746815,
     lng: 139.7516873
  },
  {
     name: '西ケ原駅',
     tag: 'nishi',
     message: 'メトロの駅の中で一番利用者数が少ない!',
     lat: 35.745926,
     lng: 139.7400493
  },
  {
     name: '桜田門駅',
     tag: 'sakura',
     message: '霞ヶ関、日比谷駅が近い!',
     lat: 35.677295,
     lng: 139.7491903
  },
  {
     name: '北参道駅',
     tag: 'kita',
     message: '乗換できる地下鉄路線はない!',
     lat: 35.678905,
     lng: 139.7029163
  },
  {
     name: '豊洲市場前駅',
     tag: 'toyo',
     message: '市場への移転がようやく決まった!',
     lat: 35.6456836,
     lng: 139.7834632
  },
  {
     name: '南新宿駅',
     tag: 'minami',
     message: '新宿駅から一駅!',
     lat: 35.6836957,
     lng: 139.6967319
  },
  {
     name: '新桜台駅',
     tag: 'sin',
     message: '西武有楽町線唯一の中間駅!',
     lat: 35.7411563,
     lng: 139.6665487
  },
  {
     name: '亀戸水神駅',
     tag: 'kame',
     message: '水をつかさどる神様に由来する!',
     lat: 35.699878,
     lng: 139.8311823
  }
];

function initMap() {

  document.getElementById("button").onclick = function() {
    checkStation();
  };

 // 地図の作成
  var mapLatLng = new google.maps.LatLng('35.683329', '139.739905'); // 緯度経度のデータ作成
  map = new google.maps.Map(document.getElementById('target'), { // #sampleに地図を埋め込む
    center: mapLatLng, // 地図の中心を指定
    // mapTypeId: 'satellite',
    clickableIcons: false,
    zoom: 12 // 地図のズームを指定
  });

  // マーカー毎の処理
  var i = 0;
  while (i < 3) {
    // ランダムに0から9の数値を取得
    r[i] = Math.floor(Math.random() * 10);

    if (filterFunc(r)) {
      continue;
    }

    markerLatLng = new google.maps.LatLng({lat: markerData[r[i]]['lat'], lng: markerData[r[i]]['lng']}); // 緯度経度のデータ作成
    marker[i] = new google.maps.Marker({ // マーカーの追加
      position: markerLatLng, // マーカーを立てる位置を指定
      map: map // マーカーを立てる地図を指定
    });

    infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
      content: '<div class="target">' + markerData[r[i]]['message'] + '</div>' // 吹き出しに表示する内容
    });

    markerEvent(i); // マーカーにクリックイベントを追加
    i++;
  }

}

function filterFunc(ary) {
  var ary2 = ary.filter(function(value, index, array){
    return array.indexOf(value) === index;
  })

  if (ary.length === ary2.length) {
    // 重複なし
    return false;
  }
  // 重複あり
  return true;
}

function checkStation() {
  let stAry = [];
  let st1 = document.getElementById("station1");
  let st2 = document.getElementById("station2");
  let st3 = document.getElementById("station3");
  stAry[0] = st1.options[st1.selectedIndex].value;
  stAry[1] = st2.options[st2.selectedIndex].value;
  stAry[2] = st3.options[st3.selectedIndex].value;
  if (filterFunc(stAry)) {
      alert('駅名が重複しています!');
      return;
  }
  for (var i = 0; i < stAry.length; i++) {
    if (stAry.indexOf(markerData[r[i]].tag) === -1) {
      alert('不正解の駅が存在します!');
      return
    }
  }
  alert('正解!駅にあなたは詳しい!');
}

// マーカーにクリックイベントを追加
function markerEvent(i) {
  marker[i].addListener('click', function() { // マーカーをクリックしたとき
    infoWindow[i].open(map, marker[i]); // 吹き出しの表示
  });
}
