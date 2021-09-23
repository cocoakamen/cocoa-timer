function CocoaTimer() {
  this.numberColor = 'black';
  this.GRAY_OUT_COLOR = '#EFEFEF';
  this.remainingTime = 0;
  this.timer = 0;
  this.alerm = new Audio('Medium Bell Ringing Near.mp3');
  this.isAlermPlaying = false;
};

 CocoaTimer.prototype.startAlerm = function() {
    this.alerm.play();
    this.isAlermPlaying = true;
 };

 CocoaTimer.prototype.stopAlerm = function() {
  this.alerm.pause();
  this.alerm.currentTime = 0;
  this.isAlermPlaying = false;
};
CocoaTimer.prototype.drawNumber = function(upElement, downElement, num) {
  // :
  document.getElementById('separater-up').style.backgroundColor = this.numberColor;
  document.getElementById('separater-down').style.backgroundColor = this.numberColor;
  // 数字
  switch(num) {
    case 0:
      upElement.style.borderColor = this.numberColor;
      upElement.style.borderBottomColor = this.GRAY_OUT_COLOR;
      downElement.style.borderColor = this.numberColor;
      downElement.style.borderTopColor = this.GRAY_OUT_COLOR;
      break;
    case 1:
      upElement.style.borderColor = this.GRAY_OUT_COLOR;
      upElement.style.borderRightColor = this.numberColor;
      downElement.style.borderColor = this.GRAY_OUT_COLOR;
      downElement.style.borderRightColor = this.numberColor;
      break;
    case 2:
      upElement.style.borderColor = this.numberColor;
      upElement.style.borderLeftColor = this.GRAY_OUT_COLOR;
      downElement.style.borderColor = this.numberColor;
      downElement.style.borderRightColor = this.GRAY_OUT_COLOR;
      break;
    case 3:
      upElement.style.borderColor = this.numberColor;
      upElement.style.borderLeftColor = this.GRAY_OUT_COLOR;
      downElement.style.borderColor = this.numberColor;
      downElement.style.borderLeftColor = this.GRAY_OUT_COLOR;
      break;
    case 4:
      upElement.style.borderColor = this.numberColor;
      upElement.style.borderTopColor = this.GRAY_OUT_COLOR;
      downElement.style.borderColor = this.numberColor;
      downElement.style.borderLeftColor = this.GRAY_OUT_COLOR;
      downElement.style.borderBottomColor = this.GRAY_OUT_COLOR;
      break;
    case 5:
      upElement.style.borderColor = this.numberColor;
      upElement.style.borderRightColor = this.GRAY_OUT_COLOR;
      downElement.style.borderColor = this.numberColor;
      downElement.style.borderLeftColor = this.GRAY_OUT_COLOR;
      break;
    case 6:
      upElement.style.borderColor = this.numberColor;
      upElement.style.borderRightColor = this.GRAY_OUT_COLOR;
      downElement.style.borderColor = this.numberColor;
      break;
    case 7:
      upElement.style.borderColor = this.GRAY_OUT_COLOR;
      upElement.style.borderRightColor = this.numberColor;
      upElement.style.borderTopColor = this.numberColor;
      downElement.style.borderColor = this.GRAY_OUT_COLOR;
      downElement.style.borderRightColor = this.numberColor;
      break;
    case 8:
      upElement.style.borderColor = this.numberColor;
      downElement.style.borderColor = this.numberColor;
      break;
    case 9:
      upElement.style.borderColor = this.numberColor;
      downElement.style.borderColor = this.numberColor;
      downElement.style.borderLeftColor = this.GRAY_OUT_COLOR;
      downElement.style.borderBottomColor = this.GRAY_OUT_COLOR;
      break;
    default:
      break;
  }
};

CocoaTimer.prototype.drawTime = function(timeArray) {
  const m_left = timeArray[0];
  const m_right = timeArray[1];
  const s_left = timeArray[2];
  const s_right = timeArray[3];

  // 分：10の位の数字
  const numMinuteLeftUp = document.getElementById('number-minute-left-up');
  const numMinuteLeftDown = document.getElementById('number-minute-left-down');
 
  // 秒：1の位の数字
  const numMinuteRightUp = document.getElementById('number-minute-right-up');
  const numMinuteRightDown = document.getElementById('number-minute-right-down');

  // 秒：10の位の数字
  const numSecondLeftUp = document.getElementById('number-second-left-up');
  const numSecondLeftDown = document.getElementById('number-second-left-down');
 
  // 秒：1の位の数字
  const numSecondRightUp = document.getElementById('number-second-right-up');
  const numSecondRightDown = document.getElementById('number-second-right-down');

  this.drawNumber( numMinuteLeftUp, numMinuteLeftDown, m_left);
  this.drawNumber( numMinuteRightUp, numMinuteRightDown, m_right);
  this.drawNumber( numSecondLeftUp, numSecondLeftDown, s_left);
  this.drawNumber( numSecondRightUp, numSecondRightDown, s_right);
};

CocoaTimer.prototype.resetTime = function(){
  this.remainingTime = 0;
  this.timer = 0;
  cocoaTimer.numberColor = 'black';
  this.drawTime([0,0,0,0]);
}

/*
  1minute = 60000ms
  1second = 1000ms
*/
CocoaTimer.prototype.remainingTimeArray = function(milli){
  const minute = Math.floor(milli /60000);
  const second = Math.floor((milli - 60000 * minute) / 1000 );
  console.log('minute: ' + minute);
  console.log('second: ' + second);
  return [ Math.floor(minute/10), minute % 10, Math.floor(second/10), second % 10];
}

CocoaTimer.prototype.convTimeArrayToMilli = function(timeArray) {
  const milliSeconds = ( timeArray[0] * 10 + timeArray[1] ) * 60000 +
                       ( timeArray[2] * 10 + timeArray[3] ) * 1000;
  console.log('milliSeconds: ' + milliSeconds);
  return milliSeconds;
}

CocoaTimer.prototype.addRemainingTime = function(milliSeconds) {
  const newRemainingTime = this.remainingTime + milliSeconds;

  // 60分を超えたら足さない
  if (newRemainingTime < 3600000) {
    this.remainingTime = newRemainingTime;
  }
}

CocoaTimer.prototype.start = function(milliSeconds) {
  const INTERVAL_TIME = 1000;
  const cocoaTimer = this;
  const recalc = function(){
    
    cocoaTimer.addRemainingTime(-1 * INTERVAL_TIME);
    console.log('cocoaTimer.remainingTime: ' + cocoaTimer.remainingTime );

    if( cocoaTimer.remainingTime < 0) {
      // アラーム音
      if( !cocoaTimer.isAlermPlaying) {
        cocoaTimer.startAlerm();
      }
      // 点滅
      if( cocoaTimer.remainingTime % 2000 == -1000){
        cocoaTimer.numberColor = 'crimson';
      } else {
        cocoaTimer.numberColor = 'black';
      }
      cocoaTimer.drawTime(cocoaTimer.remainingTimeArray(0));
    } else {
      cocoaTimer.drawTime(cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
    }
    
    console.log( cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));  
  }
  // setInterval実行中は処理しない
  // setIntervalは、0ではない正の整数値を戻す
  if (cocoaTimer.timer == 0) {
    cocoaTimer.timer = setInterval(recalc, INTERVAL_TIME);
    console.log('cocoaTimer.timer:' + cocoaTimer.timer);
  }
}

const cocoaTimer = new CocoaTimer();

window.onload = function(){

  cocoaTimer.resetTime();

  // スタートボタン
  document.getElementById('timer-start').addEventListener("click", function(){
    cocoaTimer.start();
  });
 
  // ストップボタン
   document.getElementById('timer-stop').addEventListener("click", function(){
    clearInterval(cocoaTimer.timer );
    cocoaTimer.timer = 0;
    cocoaTimer.stopAlerm();
  });

  // リセットボタン
  document.getElementById('timer-reset').addEventListener("click", function(){
    clearInterval(cocoaTimer.timer );
    cocoaTimer.resetTime();
    cocoaTimer.stopAlerm();
  });

  
  // 10分
  document.getElementById('button-10min').addEventListener("click", function(){
    cocoaTimer.addRemainingTime(600000);
    cocoaTimer.drawTime(cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
    console.log( cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
  });

  // 1分
  document.getElementById('button-1min').addEventListener("click", function(){
    cocoaTimer.addRemainingTime(60000);
    cocoaTimer.drawTime(cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
    console.log( cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
  });

  // 10秒
  document.getElementById('button-10sec').addEventListener("click", function(){
    cocoaTimer.addRemainingTime(10000);
    cocoaTimer.drawTime(cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
    console.log( cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
  });

  // 1秒
  document.getElementById('button-1sec').addEventListener("click", function(){
    cocoaTimer.addRemainingTime(1000);
    cocoaTimer.drawTime(cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
    console.log( cocoaTimer.remainingTimeArray(cocoaTimer.remainingTime));
  });
}