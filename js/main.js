  var questions = ["世界で一番大きな湖は？", "今何問目？", "2の8乗は？"];

  var choices = {
                  "世界で一番大きな湖は？": {0: "カリブ海", 1: "カスピ海", 2: "琵琶湖"},
                  "今何問目？": {0: "1問目", 1: "2問目", 2:"3問目"},
                  "2の8乗は？": {0: 1024, 1: 64, 2: 256},
  }
  var qNo = 1;//問題数カウント
  var answer = {
                  "世界で一番大きな湖は？":"カスピ海","今何問目？":`${qNo}問目`,"2の8乗は？":"256"
  }
  var qId;//
  var nowQ;
  var activity = true; //活性、非活性の判断
  var rh;//出題された問題の選択肢を変数rhに代入
  var q;//出題中も問題
  var qNo = 1;//問題数カウント
  var eventDOM;//クリックされた要素
  var eventch//クリックされた要素の子要素
  var sco = 0;//スコアカウント

  qId = document.getElementById('question');
    //問題の配列の並びをランダムにする。
  nowQ = shaffle(questions);


  start();
  //問題を出題する。
  function start(){
    q = nowQ[0];
      //出題
    qId.innerHTML = q;
      //選択肢を出力する。
    choi(q);
    //問題シャッフル
    nowQ.shift();
    }

    //　配列シャッフル
  function shaffle(rhk){
      var u = rhk;
      for(var i = u.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = rhk[i];
        u[i] = u[r];
        u[r] = tmp;
      }
      return u;
    }
    //選択肢を出力する。
    function choi(q){
    //出題された問題の選択肢を変数rに代入
     rh = choices[q];
    //連想配列のキーを配列で取得
    var rhk = Object.keys(rh);
    //選択肢のキーをシャッフルする
    rhk = shaffle(rhk);
    //選択肢出力
    for(var i = 0; i < rhk.length; i++){
      var c = document.getElementById(`an${i}`);
      //シャッフルされた配列を使い連想配列の選択肢を出力
      c.innerHTML = rh[rhk[i]];
    }
  }
    //var a0 = document.getElementsByClassName('answer');

    var a0 = document.getElementById('answer0');//回答選択ボタン
    var a1 = document.getElementById('answer1');//回答選択ボタン
    var a2 = document.getElementById('answer2');//回答選択ボタン
    var next = document.getElementById('Next');//nextボタン
    var show = document.getElementById('show');//syowボタン
    var lab = document.getElementById('lab');//syowボタン
    var modalF = document.getElementById('mf');//モーダル全体
    var score = document.getElementById('co');//モーダルのスコア
    var reP = document.getElementById('rp');//モーダルのリプレイボタン


    lab.className="non";
    //a0.addEventListener('click', checkAnswer, false);
    //a1.addEventListener('click', checkAnswer, false);
    //a2.addEventListener('click', checkAnswer, false);
    //next.addEventListener('click', nextQuestion, false);
    //lab.addEventListener('click', nextQuestion, false);
    reP.addEventListener('click', replay, false);

    //回答選択ボタン押した場合
    function checkAnswer(){
      //ボタンの活性、非活性判定
      if(activity === false){
        return;
      }else{
        //nextボタンの活性化
        activity = false;
        //要素取得
        eventDOM = event.target;
        //子要素<span>取得
        eventch = event.target.firstChild;
        //子要素の答え取得
        var eventanswer = eventch.innerHTML;
        //選択した答えが合っているか判定
        if(eventanswer === answer[q]){
          //背景色を白から緑に変える
          eventDOM.className ="colgreen"
          //正解の場合の文字列の変更
          eventch.innerHTML = eventanswer + " ... correct!"
          //正解数加算
          sco++;
          //問題数加算
          qNo++;
          //マウスイベント削除
          mouseremove();
        }else{
          //背景色を白から赤に変える
          eventDOM.className ="colred";
          //文字を赤色に変える
          eventch.className ="colwinered";
          //間違った場合の文字列変更
          eventch.innerHTML = eventanswer + " ... wrong!"
          mouseremove();
          //問題数加算

          qNo++;
        }
        //nextボタン、show scorボタンの色を青に変える
        if(next.className === "non"){
          lab.className ="open_button colblue";
        }
        if(lab.className === "non"){
          next.className ="next colblue";
        }


        //答えを更新
        answer["今何問目？"]= `${qNo}問目`;
      }
    }

    //nextボタン押した場合
    function nextQuestion(){
      //nextボタンの活性、非活性判定
      if(activity === true){
        return;
      }else{
        if(qNo != 4){
          //回答選択ボタン活性化
          activity = true;
          //クリックされた要素
          eventDOM.className ="answer";
          eventch.className ="";
          next.className ="next";
          q = "";
          if(qNo === 3){
            next.className ="non";
            lab.className ="open_button";
          }
          //マウスイベント追加
          mouseadd();
          start();
        }else{
          score.innerHTML =`Score ${sco}/3`;
          //モダール出力　モーダルのdisplay:none;を消す
          modalF.className ="modalFrame";
          //モダール出力時にShow Scoreボタンをグレーにする。
          lab.className ="open_button open_button_grey";
          modalF.position = "fixed";
        }
      }
    }

    function replay(){
      location.reload();
    }

    function mouseremove(){//コードを2本にできませんか？？？
      a0.removeAttribute('onmouseover');
      a0.removeAttribute('onmouseout');
      a1.removeAttribute('onmouseover');
      a1.removeAttribute('onmouseout');
      a2.removeAttribute('onmouseover');
      a2.removeAttribute('onmouseout');
    }

    function mouseadd(){
      a0.setAttribute('onmouseover', 'mouseover(this);');
      a0.setAttribute('onmouseout', 'mouseout(this);');
      a1.setAttribute('onmouseover', 'mouseover(this);');
      a1.setAttribute('onmouseout', 'mouseout(this);');
      a2.setAttribute('onmouseover', 'mouseover(this);');
      a2.setAttribute('onmouseout', 'mouseout(this);');
    }

function mouseover(ev){

  ev.className= "answer mous";
}
function mouseout(ev){
  ev.className= "answer";
}