<h1>RetroGameProto</h1>

<p>HTML5 Canvas による、レトロ風自走砲プロトタイプA<br>
Retro-style self-propelled gun prototype built with JavaScript and HTML5 Canvas.</p>

<h2>概要 / Overview</h2>

<p>
このプロジェクトは、現在開発中の 3D 飛行シューティングゲームの前身となった、JavaScript 製の 2D 対戦戦車ゲームのプロトタイプです。当初は『りっくじあーす』に登場する「75式自走155mmりゅう弾砲」への愛と、実機の 70 年代的な機能美を自分の手で動かしたいという欲求から始まりました。<br>
This project is a 2D tank battle prototype built with JavaScript, serving as a precursor to current 3D flight simulation developments. It originated from a personal affinity for the "Type 75-shiki-chan" from Rick G Earth and a desire to manually implement the 1970s functional beauty of the actual Type 75 self-propelled howitzer.
</p>

<p>
<strong>低頻度更新環境の検証 (10Hz Synchronization)</strong><br>
将来的な Laravel と DB を介した通信対戦を見据え、あえて 10FPS（100ms更新）という厳しい制約下での操作感と同期の可能性を検証しました。<br>
I aimed to test the feasibility and "feel" of controls under a strict 10FPS (100ms update) constraint, anticipating future multiplayer synchronization via Laravel and database state management.
</p>

<p>
<strong>「不自由さ」による遊びの再定義 (Redefining Gameplay via Constraints)</strong><br>
アメリカ滞在時代に友人と遊んだボードゲーム「バトルシップ」の記憶を元に、暗闇の中で「発射時のマズルフラッシュ」だけを頼りに敵を索敵する、ステルス性の高いゲームデザインを目指しました。<br>
Inspired by memories of playing the board game Battleship with friends during a stay in the United States, I designed a stealth-focused system where the "muzzle flash" from firing is the only means of detecting an enemy in the dark.
</p>

<h2>技術構成 / Technical Architecture</h2>

<p>
このシステムは外部ライブラリに頼らず、ピュアな JavaScript と Canvas 2D API によるベクター描画で構成されています。<br>
The system is built entirely with pure JavaScript and vector rendering via the Canvas 2D API, without reliance on external libraries.
</p>

<h3>コア・アーキテクチャ / Core Architecture</h3>

<p>
<strong>エントリーポイント / Entry Point (index.html)</strong><br>
GameBase.js を起点に、全てのロジックをブートします。<br>
Boots all game logic, using GameBase.js as the primary entry point.
</p>

<p>
<strong>コアエンジン / Core Engine (GameBase.js)</strong><br>
毎 100msの更新・描画サイクルを統制します。将来の DB 同期負荷を見越した設計です。<br>
Governs the 100ms update/render cycle, designed to anticipate future database synchronization loads.
</p>

<p>
<strong>入力処理 / Input Handling (Input.js)</strong><br>
WASD 移動とマウス射撃・照準をポーリング形式で処理します。<br>
Processes WASD movement and mouse-based firing/aiming via polling.
</p>

<p>
<strong>自機制御 / Player Control (Player.js)</strong><br>
155mm りゅう弾砲の挙動を再現。リロード管理に加え、停車時のみ精度が上がる「停止射撃ロック」を実装しています。<br>
Reproduces the behavior of a 155mm self-propelled howitzer. Implements reload management and a "Stop-Fire Lock" system that increases accuracy only when stationary.
</p>

<h3>エフェクト・描画システム / Effects &amp; Rendering System</h3>

<p>
<strong>弾道計算 / Trajectory Calculation (Bullet.js)</strong><br>
砲口からマウスクリック地点までの距離と弾速を動的に計算します。<br>
Dynamically calculates bullet speed and distance from the muzzle to the mouse-click coordinates.
</p>

<p>
<strong>継承クラス / Inheritance Classes (BlastEffect.js, Explosion.js, MuzzleFlash.js)</strong><br>
エフェクトの基底クラスを作り、閃光と爆風を効率的に生成します。<br>
Utilizes base classes for effects to efficiently generate muzzle flashes and blast waves.
</p>

<p>
<strong>ベクター描画 / Vector Rendering (Renderer.js, Type75_chan.js)</strong><br>
Canvas 2D API を使用。スプライトに頼らず、コードによるストローク（線）だけで 75 式の機能美を描画します。<br>
Leverages the Canvas 2D API to render the functional beauty of the Type 75 using code-based strokes (lines) instead of pre-rendered sprites.
</p>

<h3>設定管理 / Configuration</h3>

<p>
<strong>constantValues.js</strong><br>
全パラメータの心臓部。FPS、リロード時間、命中誤差（三角分布）などを集約しています。<br>
The heart of all parameters. Centralizes constants such as FPS, reload times, and hit error probabilities using triangular distribution.
</p>

<h2>ゲームの流れ / Game Flow</h2>

<p>
入力受け取り → プレイヤー更新（移動/回転/発射） → 弾飛行 → 着弾で爆発エフェクト生成 → 毎フレーム画面描画（残光処理）<br>
Input Polling → Player Update (Move/Rotate/Fire) → Bullet Trajectory → Explosion Effect Generation on Impact → Per-frame Rendering (with persistence/afterglow effects).
</p>

<h2>得られた教訓 / Lessons Learned</h2>

<p>
開発中、constantValues.js のパラメータを極端に操作したことでゲームバランスが瞬時に崩壊する事態（通称：砲撃マシンガン状態）を確認しました。この経験から、ゲームの根幹をなす定数データは外部から容易に改ざんされないよう、適切なカプセル化やバリデーションが必要であることを痛感しました。<br>
During development, extreme manipulation of parameters in constantValues.js led to an immediate collapse of game balance (the "machine-gun artillery" incident). This taught me the critical importance of proper data encapsulation and validation to ensure that core constant data cannot be easily compromised or tampered with.
</p>

<h2>最後に / Conclusion</h2>

<p>
この 75 式ちゃんは別のグループプロジェクトのために一度筆を置くことになりましたが、ここで培った「制約下での表現」や「座標変換」の経験は、現在の 3D プロジェクトの血肉となっています。理想を追い、挫折し、それでも手を動かした証として、ここに公開します。<br>
Development of this project was paused to prioritize a different group endeavor, but the experience gained here—rendering under constraints and manual coordinate transformation—remains the backbone of my current 3D projects. This is published as a record of chasing ideals, facing setbacks, and continuing to build regardless.
</p>
