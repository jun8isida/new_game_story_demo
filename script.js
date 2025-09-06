document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const titleScreen = document.getElementById('title-screen');
    const gameScreen = document.getElementById('game-screen');
    const debateScreen = document.getElementById('debate-screen');
    const startButton = document.getElementById('start-button');

    const backgroundLayer = document.getElementById('background-layer');
    const charLeft = document.getElementById('char-left');
    const charCenter = document.getElementById('char-center');
    const charRight = document.getElementById('char-right');
    const charName = document.getElementById('char-name');
    const message = document.getElementById('message');
    const textbox = document.getElementById('textbox');
    const choicesBox = document.getElementById('choices-box');

    // 論破パートの要素
    const debateStatement = document.getElementById('debate-statement');
    const evidenceList = document.getElementById('evidence-list');
    const breakAnimation = document.getElementById('break-animation');

    // キャラクター定義
    const characters = {
        aoi: { name: '葵', image: 'images/char_aoi.png' },
        hayato: { name: '隼人', image: 'images/char_hayato.png' },
        haruto: { name: '陽翔', image: 'images/char_haruto.png' },
        riko: { name: '理子', image: 'images/char_riko.png' },
        mio: { name: '澪', image: 'images/char_mio.png' },
        miu: { name: '美羽', image: 'images/char_miu.png' },
        player: { name: 'あなた', image: 'images/char_silhouette.png' },
        unknown: { name: '？？？', image: 'images/char_silhouette.png' },
    };

    // シナリオデータ
    const scenario = [
        { type: 'scene', background: 'images/bg_classroom.jpg', text: '（転校してきて数週間。新しい生活にも少しずつ慣れてきた頃だった）' },
        { char: 'aoi', pos: 'center', text: 'ねえ、聞いた？ またあったんだって。嫌がらせ。' },
        { char: 'hayato', pos: 'left', text: 'ああ、今度は美羽の教科書が破られてたって話だろ？ マジで胸糞悪いぜ。' },
        { char: 'riko', pos: 'right', text: 'これで3件目ね。SNSでの悪口、掲示物の改ざん、そして私物への攻撃…だんだんエスカレートしているわ。' },
        { char: 'miu', pos: 'center', text: 'うぅ…なんで私がこんな目に…っ。', emotion: 'sad' },
        { char: 'player', text: '（またか…。このクラス、どこかおかしい）' },
        {
            type: 'choice',
            question: '美羽にどう声をかける？',
            choices: [
                { text: '「大丈夫？」と心配する', next: 'choice_kind' },
                { text: '「犯人の心当たりは？」と聞く', next: 'choice_suspect' },
                { text: '黙って様子を見る', next: 'choice_observe' },
            ]
        },
        // --- 選択肢分岐 ---
        { label: 'choice_kind', char: 'miu', text: '…ありがとう。でも、誰がやったのか分からなくて、怖くて…。' },
        { char: 'aoi', text: '大丈夫だよ美羽ちゃん！ みんながついてるから！', next: 'common_route' },

        { label: 'choice_suspect', char: 'miu', text: 'えっ…？ わ、分からないよ…。私が誰かに恨まれるなんて…。' },
        { char: 'riko', text: '…直接的すぎるわね。でも、確かに情報は必要よ。', next: 'common_route' },

        { label: 'choice_observe', char: 'player', text: '（今は下手に動くべきじゃない。まずは状況を整理しよう）' },
        { char: 'hayato', text: 'おい、何とか言えよ！ お前もこのクラスの一員だろ！', next: 'common_route' },

        // --- 共通ルート ---
        { label: 'common_route', char: 'haruto', pos: 'right', text: '騒いでも解決しない。犯人は巧妙に証拠を残していない。…冷静になるべきだ。' },
        { char: 'mio', pos: 'left', text: 'フン、優等生のご高説ね。でも、犯人はこの中にいる…。そう思うだけでゾクゾクしない？' },
        { char: 'player', text: '（この日から、僕たちの日常は歪な謎に侵食されていった…）' },
        { type: 'debate',
          statement: "昨日の放課後、<span class='contradiction' data-evidence='alibi'>誰も教室には残っていなかった</span>はずよ。だから、犯行は今朝早くに行われたに違いないわ。",
          evidence: [
              { id: 'alibi', name: '隼人のアリバイ' },
              { id: 'message', name: '澪のメッセージ' },
          ],
          correctEvidence: 'alibi'
        },
        { type: 'scene', text: '（議論は、まだ始まったばかりだ…）', next: 'end' }
    ];

    let currentScene = 0;
    let gameState = {
        evidence: ['隼人のアリバイ', '澪のメッセージ'], // 所持している証拠
    };
    
    // ゲームの状態管理
    function updateScene() {
        const scene = scenario[currentScene];
        
        // シーンタイプに応じて処理を分岐
        switch(scene.type) {
            case 'choice':
                displayChoices(scene);
                break;
            case 'debate':
                startDebate(scene);
                break;
            default:
                displayScene(scene);
                break;
        }
    }

    // 通常のシーンを表示
    function displayScene(scene) {
        choicesBox.style.display = 'none'; // 選択肢を隠す

        // 背景設定
        if (scene.background) {
            backgroundLayer.style.backgroundImage = `url(${scene.background})`;
        }

        // キャラクター表示
        [charLeft, charCenter, charRight].forEach(c => {
            c.src = '';
            c.classList.remove('active');
        });

        if (scene.char) {
            const charData = characters[scene.char];
            charName.textContent = charData.name;
            charName.style.display = 'inline-block';

            let targetCharImg;
            if (scene.pos === 'left') targetCharImg = charLeft;
            else if (scene.pos === 'right') targetCharImg = charRight;
            else targetCharImg = charCenter;
            
            targetCharImg.src = charData.image;
            targetCharImg.classList.add('active');
        } else {
            charName.style.display = 'none';
        }
        
        // テキスト表示
        message.textContent = scene.text;
    }

    // 選択肢を表示
    function displayChoices(scene) {
        message.textContent = scene.question;
        choicesBox.innerHTML = ''; // 既存の選択肢をクリア
        choicesBox.style.display = 'flex';
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.onclick = () => {
                currentScene = findSceneIndex(choice.next);
                updateScene();
            };
            choicesBox.appendChild(button);
        });
    }

    // 論破パートを開始
    function startDebate(scene) {
        showScreen(debateScreen);
        debateStatement.innerHTML = scene.statement;
        evidenceList.innerHTML = '';

        // 所持している証拠品を表示
        gameState.evidence.forEach(evi => {
            const item = document.createElement('div');
            item.className = 'evidence-item';
            item.textContent = evi;
            item.dataset.id = evi.includes('アリバイ') ? 'alibi' : 'message'; // 簡易的なID付け
            item.onclick = () => {
                // 証拠品選択のロジック
                document.querySelectorAll('.evidence-item').forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
            };
            evidenceList.appendChild(item);
        });
        
        // 矛盾点クリックのイベント
        document.querySelector('.contradiction').onclick = (e) => {
            const selectedEvidence = document.querySelector('.evidence-item.selected');
            if (!selectedEvidence) {
                alert('証拠品を選択してください！');
                return;
            }

            if (selectedEvidence.dataset.id === e.target.dataset.evidence) {
                // 正解
                showBreakAnimation(() => {
                    showScreen(gameScreen);
                    // 成功したら次のシーンへ
                    currentScene++;
                    updateScene();
                });
            } else {
                // 不正解
                alert('違う！その証拠では矛盾を突けない！');
            }
        };
    }

    // BREAK!アニメーション
    function showBreakAnimation(callback) {
        breakAnimation.style.display = 'flex';
        setTimeout(() => {
            breakAnimation.style.display = 'none';
            if (callback) callback();
        }, 1500); // アニメーション時間 + 余裕
    }

    // ラベル名からシナリオのインデックスを探す
    function findSceneIndex(label) {
        return scenario.findIndex(scene => scene.label === label);
    }
    
    // 次のシーンへ進めるための関数
    function next() {
        const currentSceneData = scenario[currentScene];

        // 現在のシーンに 'next' プロパティがあるか確認
        if (currentSceneData && currentSceneData.next) {
            if (currentSceneData.next === 'end') {
                alert('GAME CLEAR (Prototype)');
                showScreen(titleScreen);
                currentScene = 0;
                return;
            }
            // ラベルが指定されている場合、そのシーンにジャンプ
            currentScene = findSceneIndex(currentSceneData.next);
        } else {
            // 'next' プロパティがなければ、次のインデックスに進む
            currentScene++;
        }

        // シナリオの範囲内かチェック
        if (currentScene < scenario.length) {
            updateScene();
        } else {
            // シナリオの終端に達した場合
            alert('GAME CLEAR (Prototype)');
            showScreen(titleScreen);
            currentScene = 0;
        }
    }
    
    // スクリーン切り替え
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    // イベントリスナー
    startButton.addEventListener('click', () => {
        showScreen(gameScreen);
        currentScene = 0;
        updateScene();
    });
    
    textbox.addEventListener('click', () => {
        // 選択肢や論破パートが表示されている間はクリックで進まない
        if (choicesBox.style.display === 'none' && !debateScreen.classList.contains('active')) {
            next();
        }
    });

    // 初期化
    showScreen(titleScreen);
});
