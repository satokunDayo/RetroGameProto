// レイアウト
export const MARGIN = 10;
export const INFO_HEIGHT = 50;

export function createFields(canvas) {
  const FIELD_HEIGHT = (canvas.height - INFO_HEIGHT - MARGIN * 2) / 2;

  return {
    ENEMY: {
      left: MARGIN,
      right: canvas.width - MARGIN,
      top: MARGIN,
      bottom: MARGIN + FIELD_HEIGHT,
    },
    PLAYER: {
      left: MARGIN,
      right: canvas.width - MARGIN,
      top: MARGIN + FIELD_HEIGHT + INFO_HEIGHT,
      bottom: canvas.height - MARGIN,
    },
    FIELD_HEIGHT,
  };
}

// 弾が-y_maxからy_minに飛翔するのにかかる時間（秒）
export const BULLET_TRAVEL_TIME = 5;

// 角度誤差（度）
export const ERROR_STOP_DEG = 4;
export const ERROR_MOVE_DEG = 10;

// 角度変換
export const DEG = Math.PI / 180;

// プレイヤー挙動
export const PLAYER_MAX_SPEED = 50;
export const PLAYER_ACCEL = 30;
export const PLAYER_DRAG = 50;
export const PLAYER_TURN_SPEED = (Math.PI * 2) / 18;

export const TURRET_TURN_SPEED = (Math.PI * 2) / 30;

export const STOP_FIRE_LOCK_TIME = 3.0;
export const Consider_As_Stopped = 1;

// 装填
export const PLAYER_RELOAD_TIME = 10;

export const MUZZLE_LENGTH = 29;
