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
        // =============================================
        // プロローグ
        // =============================================
        { type: 'scene', background: 'images/bg_black.jpg', text: '―笑顔の裏に潜む、むき出しの悪意。' },
        { text: 'これはもう、遊びやイタズラなんかじゃない。' },
        { type: 'scene', background: 'images/bg_classroom.jpg', text: '午前の教室。まだ朝の光は白く、窓から差し込む風は静かだった。' },
        { text: '僕は転校生として新しい席に腰を下ろす。' },
        { text: 'ほんの少しだけ胸を膨らませて、「今日から僕の新しい日常が始まるのだ」と思い込もうとしていた。' },
        { text: 'だが、そこにあったのは――' },
        { type: 'scene', background: 'images/bg_desk_closeup.jpg', text: '机に深く刻み込まれた、たった二文字。“死ね”' },
        { text: '硬い木材に残された線は、誰かの震える手が残したものではなかった。' },
        { text: '強く、繰り返し、何度も押し込むように刻まれた傷跡。' },
        { text: 'その文字の底には、ただの衝動ではなく、冷たい悪意が染み込んでいるように思えた。' },
        { type: 'scene', background: 'images/bg_classroom.jpg', text: '息を呑んだ僕の耳に、廊下のざわめきが飛び込んでくる。' },
        { type: 'scene', background: 'images/bg_lockers.jpg', text: '駆け寄ると、生徒用ロッカーが荒らされていた。' },
        { text: '制服、教科書、化粧ポーチ……生活の破片が床に散らばっている。' },
        { text: 'その中で、ひときわ目を引くもの。' },
        { text: '誰かの下着が、わざと晒すように天井の蛍光灯の下に置かれていた。' },
        { text: '羞恥を狙った、露骨で下劣な仕打ち。' },
        { text: 'ただのイタズラではない。――これは、誰かを「壊すための意思」だ。' },
        { type: 'scene', background: 'images/bg_classroom.jpg', text: '教室に戻ると、友人たちの視線が交錯する。' },
        { text: '笑う者も、怯える者も、沈黙する者もいた。' },
        { text: 'だが、その誰もが口を開かず、まるで「見てはいけないもの」として処理しようとしていた。' },
        { text: '僕は思った。' },
        { text: 'この学園には、目に見えない「声」が渦巻いている。' },
        { text: '机に刻まれた刃のような言葉。廊下に撒き散らされた生活の断片。' },
        { text: 'そのすべてが、誰かの心を切り裂き、生きる居場所を奪おうとしている。' },
        { text: '胸の奥で冷たい感情が芽える。' },
        { text: '――これは始まりにすぎない。' },
        { text: '――これから僕は、醜く汚い人間の憎悪と、正面から戦っていくことになるのだ。' },
        { text: '窓の外で、曇った太陽がほんの少し揺らいだ。その光さえも、どこか嘲笑しているように見えた。' },

        // =============================================
        // Day1 ― 炎の痕
        // =============================================
        { type: 'scene', background: 'images/bg_black.jpg', text: 'Day1 ― 炎の痕' },
        { type: 'scene', background: 'images/bg_hallway.jpg', text: '朝、ホームルームが始まる前。廊下に甲高い悲鳴が響き渡った。' },
        { text: '心臓を掴まれたように胸が跳ね、僕らは声のする方へ駆け出す。' },
        { type: 'scene', background: 'images/bg_shoebox_burnt.jpg', text: 'そこにあったのは、焼け焦げた靴箱だった。' },
        { text: '木材は黒く炭のようになり、ひしゃげた金具からはまだ熱が残っている。' },
        { text: '中に入っていた上履きは、片方が真っ黒に焦げ、もう片方は辛うじて形を保っていた。' },
        { text: 'だが漂うオイルの匂いが、これが自然発火ではなく、“誰かが意図的に仕組んだ火”であることを告げていた。' },
        { char: 'aoi', pos: 'center', text: 'だ、誰か……！　見てっ！' },
        { char: 'riko', pos: 'right', text: '……これは“イタズラ”の域を超えている。放火未遂よ。' },
        { type: 'scene', background: 'images/bg_shoebox_burnt.jpg', text: 'クラスメイトたちは口々にざわめく。' },
        { text: '「危なかったらどうするんだよ」「誰の靴だった？」「先生には言うべきだ」' },
        { text: 'だが、その声には妙な温度差があった。怯える者。苛立つ者。一方で、目を逸らし、関わりたくないと距離を取る者。' },
        { text: 'まるで火を放った“誰か”が、この場に混зっていることを、全員が心の奥で薄々感じているかのように。' },
        { text: '僕の背筋を冷たい汗が伝った。' },
        { text: '犯人の姿は見えない。だが、その気配は確実にここに存在している。' },
        { text: '影は形を持たず、教室の空気に溶け込んでいる。' },
        { text: '誰の瞳が嘘を隠しているのか――判別できないまま、僕はひたすらに周囲の気配を探ろうとした。' },
        { text: '炎の痕跡は、ただの警告ではない。「次は人を焼く」という意思表示のように思えた。' },
        { text: '――悪意は確実にエスカレートしている。次に狙われるのは、僕か、それとも隣に立つ誰かか。' },
        { type: 'scene', background: 'images/bg_classroom.jpg', text: '窓の外で、曇天に隠れた太陽がぼんやりと揺れていた。まるでそれすらも、静かに見下ろし、笑っているかのように。' },

        // =============================================
        // 調査パート（午前・教室）(ここからが追加したシナリオ)
        // =============================================
        { type: 'scene', background: 'images/bg_classroom.jpg', text: '（午前中の授業が終わり、教室がざわめき始める。僕は改めて情報を整理することにした）' },
        { type: 'scene', background: 'images/bg_desk_closeup.jpg', text: '（まずは、僕の机に刻まれた“死ね”の文字。これは単なる衝動的な落書きとは思えない…）' },
        { type: 'add_evidence', evidenceId: 'graffiti_memo', evidenceName: '落書きメモ', text: '【証拠：落書きメモ】を手に入れた！', next: 'investigation_2' },
        { label: 'investigation_2', type: 'scene', background: 'images/bg_lockers.jpg', text: '（次に、プロローグで見たロッカーの惨状。あれもただの嫌がらせじゃない。強い羞恥心を狙った悪意だ）' },
        { type: 'add_evidence', evidenceId: 'locker_clue', evidenceName: '廊下の惨状', text: '【証拠：廊下の惨状】を手に入れた！', next: 'investigation_3' },
        { label: 'investigation_3', char: 'aoi', pos: 'center', background: 'images/bg_classroom.jpg', text: 'ねぇ、ちょっといいかな…？' },
        { char: 'player', text: '（葵が心配そうな顔で話しかけてきた）' },
        { char: 'aoi', text: 'あのね、昨日の放課後、澪ちゃんが黒いマジックを持ってたのを見たんだ。でも、何に使ったかまでは見てなくて…。' },
        { type: 'add_evidence', evidenceId: 'aoi_testimony', evidenceName: '目撃証言・葵', text: '【証拠：目撃証言・葵】を手に入れた！', next: 'to_debate_2' },
        
        // =============================================
        // 討論パート（昼休み）
        // =============================================
        { label: 'to_debate_2', type: 'scene', background: 'images/bg_classroom.jpg', text: '（そして昼休み。集まった僕たちの間で、重い口火が切られた）' },
        { char: 'aoi', pos: 'left', text: 'こんなのもう“嫌がらせ”じゃない！ 誰かを本気で潰そうとしてる……！' },
        { char: 'riko', pos: 'right', text: '確かに、標的を精神的に追い詰める意図を感じるわ。私たちは早く犯人を見つけなきゃ。' },
        { char: 'mio', pos: 'center', text: '大げさね。ただの落書きと悪ふざけよ。……証拠でもあるの？' },
        { type: 'debate',
            statement: "大げさね。<span class='contradiction' data-evidence='graffiti_memo'>ただの落書きと悪ふざけよ</span>。……証拠でもあるの？",
            correctEvidence: 'graffiti_memo',
            successNext: 'debate_success_2_pre'
        },
        { label: 'debate_success_2_pre', char: 'mio', pos: 'center', text: 'っ……！　それは……！ でも、私じゃない！' },
        { type: 'scene', text: '（僕の指摘に、澪は一瞬言葉を詰まらせた。クラスの空気は、さらに張り詰めていく…）', next: 'main_story_start'},


        // =============================================
        // ここからが本編開始
        // =============================================
        { label: 'main_story_start', type: 'scene', background: 'images/bg_classroom.jpg', text: '（そして数日後。教室の空気は最悪のまま、次の事件が起こった）' },
        { type: 'add_evidence', evidenceId: 'alibi', evidenceName: '隼人のアリバイ', text: '（そういえば、隼人が昨日の放課後、部活で遅くまで残っていたと言っていたな…）', next: 'get_evidence_2' },
        { label: 'get_evidence_2', type: 'add_evidence', evidenceId: 'message', evidenceName: '澪のメッセージ', text: '（澪から「面白いものが見れるかも」とだけ書かれた、意味深なメッセージが届いていたことを思い出した）', next: 'miu_incident' },
        
        { label: 'miu_incident', char: 'aoi', pos: 'center', text: 'ねえ、聞いた？ またあったんだって。嫌がらせ。' },
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
        { char: 'riko', pos: 'center', text: '待って。一つ、気になることがあるわ。' },
        { char: 'riko', pos: 'center', text: '美羽の教科書が破られたのは、昨日の放課後から今朝までの間のはず。' },
        { type: 'debate',
          statement: "昨日の放課後、<span class='contradiction' data-evidence='alibi'>誰も教室には残っていなかった</span>はずよ。だから、犯行は今朝早くに行われたに違いないわ。",
          correctEvidence: 'alibi',
          successNext: 'debate_success_1' // 成功時のジャンプ先
        },

        // --- 第1回論破パート成功後 ---
        { label: 'debate_success_1', char: 'player', text: '（そうだ、隼人のアリバイが証明している。放課後、教室に近づいた人物がいたことを…！）' },
        { char: 'riko', pos: 'right', text: '…！ なるほど、隼人くんが部活帰りに誰かを見たと証言していたわね。' },
        { char: 'hayato', pos: 'left', text: 'ああ。昨日、体育館からの帰りに教室のほうへ向かう人影を見たんだ。暗くて誰かは分からなかったが…。' },
        { char: 'haruto', pos: 'center', text: '…つまり、犯行は放課後に行われた可能性が高い、か。少しだけ絞れたな。' },
        { char: 'mio', pos: 'left', text: 'ふふっ、やっと面白くなってきたじゃない。' },
        { type: 'scene', text: '（一つの矛盾を指摘したことで、停滞していた空気が少しだけ動いた気がした）' },
        { type: 'scene', text: '（しかし、決定的な証拠は何もない。僕たちはもっと情報を集める必要がある）' },
        {
            type: 'choice',
            question: 'どうやって情報を集める？',
            choices: [
                { text: '隼人にもう一度話を聞く', next: 'investigate_hayato' },
                { text: '澪の挑発的な態度について聞く', next: 'investigate_mio' },
                { text: 'もう一度、現場（教室）を調べる', next: 'investigate_classroom' },
            ]
        },

        // --- 調査パート分岐 ---
        { label: 'investigate_hayato', background: 'images/bg_hallway.jpg', char: 'hayato', pos: 'center', text: '人影…？ ああ、そういや何か落としたような音も聞こえた気がするな…。' },
        { type: 'add_evidence', evidenceId: 'hayato_testimony', evidenceName: '隼人の追加証言', text: '【隼人の追加証言】を手に入れた！', next: 'investigation_common' },

        { label: 'investigate_mio', background: 'images/bg_hallway.jpg', char: 'mio', pos: 'center', text: '私？ 私は高みの見物が好きなだけ。…でも、ヒントをあげる。美羽って、昔から"ああ"だったのかしらね？' },
        { type: 'add_evidence', evidenceId: 'mio_hint', evidenceName: '澪の謎のヒント', text: '【澪の謎のヒント】を手に入れた！', next: 'investigation_common' },

        { label: 'investigate_classroom', background: 'images/bg_classroom_evening.jpg', text: '（放課後の教室をもう一度調べてみる。美羽の席の周りを…）' },
        { text: '（…ん？ 机の脚のところに、何か光るものが落ちている…）' },
        { type: 'add_evidence', evidenceId: 'earring', evidenceName: '片方だけのピアス', text: '【片方だけのピアス】を手に入れた！', next: 'investigation_common' },

        // --- 調査パート合流 ---
        { label: 'investigation_common', type: 'scene', background: 'images/bg_classroom.jpg', text: '（翌日、僕たちが教室に集まっていると、葵が血相を変えて飛び込んできた）' },
        { char: 'aoi', pos: 'center', text: '大変！ 大変だよ！ 今度は…今度は陽翔くんのロッカーが…！' },
        { char: 'haruto', pos: 'right', text: '…なんだと？' },
        { background: 'images/bg_lockers.jpg', text: '（陽翔のロッカーには、赤いペンキで『嘘つき』と大きく書かれていた）' },
        { char: 'hayato', pos: 'left', text: 'ちっ、今度は陽翔がターゲットかよ！' },
        { char: 'riko', pos: 'right', text: '…待って。陽翔くんを狙うなんて。まるで、昨日の議論を見ていたかのようね。' },
        { char: 'mio', pos: 'center', text: 'あら、優等生くんも大変ねぇ。誰かに恨みでも買ってたんじゃない？' },
        { char: 'haruto', text: '…心当たりはない。僕を陥れたい誰かの仕業だろう。' },
        { char: 'haruto', text: 'それに、僕には犯行は不可能だ。昨日の放課後は、すぐに塾へ向かったからね。' },
        { type: 'debate',
          statement: "僕じゃない。昨日の放課後はずっと塾にいた。それに、<span class='contradiction' data-evidence='earring'>僕の持ち物には何も変わったところはない</span>。これは僕を犯人に仕立て上げる罠だ。",
          correctEvidence: 'earring', // 調査パートで「片方だけのピアス」を見つけているかが鍵
          successNext: 'debate_success_2_final'
        },

        // --- 第2回論破パート成功後 ---
        { label: 'debate_success_2_final', char: 'player', text: '（いや、変わったところならある。お前が気づいていない、たった一つの変化が…！）' },
        { char: 'haruto', pos: 'center', text: '…！ なんだと…？' },
        { text: '（僕は、教室で見つけたピアスを陽翔に突きつけた）' },
        { text: '（陽翔は、無意識に自分の耳に触れる。そこには、ピアスをしていた跡だけが残っていた）' },
        { char: 'haruto', text: 'これは…いつの間に…。' },
        { char: 'hayato', pos: 'left', text: 'てめぇ…やっぱり犯人はお前だったのか！' },
        { char: 'riko', pos: 'right', text: '陽翔くん、どういうことか説明してもらえるかしら。' },
        { char: 'haruto', text: '違う…僕じゃない！ …信じてくれ！' },
        { type: 'scene', text: '（追い詰められた陽翔。しかし、彼の目は何かを訴えかけているようだった）' },
        { type: 'scene', text: '（本当に、彼が全ての犯人なのだろうか？ 僕たちの謎は、さらに深まっていく…）', next: 'end' },

    ];


    let currentScene = 0;
    // gameStateでプレイヤーの所持品を管理
    let gameState = {
        evidence: [],
    };
    
    // ゲームの状態管理
    function updateScene() {
        // シナリオの終端に来たらタイトルへ
        if (currentScene >= scenario.length) {
            alert('To be continued...');
            showScreen(titleScreen);
            currentScene = 0;
            return;
        }

        const scene = scenario[currentScene];
        
        // シーンタイプに応じて処理を分岐
        switch(scene.type) {
            case 'choice':
                displayChoices(scene);
                break;
            case 'debate':
                startDebate(scene);
                break;
            case 'add_evidence': // 新しいタイプ：証拠品追加
                addEvidence(scene);
                break;
            default:
                displayScene(scene);
                break;
        }
    }

    // 証拠品を追加する処理
    function addEvidence(scene) {
        // すでに持っているかチェック
        if (!gameState.evidence.some(e => e.id === scene.evidenceId)) {
            gameState.evidence.push({ id: scene.evidenceId, name: scene.evidenceName });
        }
        // 証拠入手メッセージを表示
        displayScene(scene);
    }

    // 通常のシーンを表示
    function displayScene(scene) {
        choicesBox.style.display = 'none'; // 選択肢を隠す

        // 背景設定
        if (scene.background) {
            backgroundLayer.style.backgroundImage = `url(${scene.background})`;
        }

        // キャラクター表示
        const allCharImgs = [charLeft, charCenter, charRight];
        const activeCharImgs = [];

        // 一旦全員を非アクティブにする
        allCharImgs.forEach(c => c.classList.remove('active'));

        if (scene.char) {
            const charData = characters[scene.char];
            charName.textContent = charData.name;
            charName.style.display = 'inline-block';

            let targetCharImg;
            if (scene.pos === 'left') targetCharImg = charLeft;
            else if (scene.pos === 'right') targetCharImg = charRight;
            else targetCharImg = charCenter;

            // 他のキャラクターがすでに表示されているか確認し、いなければ画像を設定
            if (targetCharImg.src.includes(charData.image)) {
                // 同じキャラが同じ位置なら何もしない
            } else {
                 targetCharImg.src = charData.image;
            }
            
            targetCharImg.classList.add('active');
            activeCharImgs.push(targetCharImg);
        } else {
            charName.style.display = 'none';
        }
        
        // 発言者以外を少し暗くする
        allCharImgs.forEach(c => {
            if (activeCharImgs.includes(c)) {
                c.style.opacity = 1;
            } else if (c.src) { // 画像が表示されている非アクティブキャラ
                c.style.opacity = 0.5;
            } else { // 画像がない場所
                c.style.opacity = 0;
            }
        });

        // テキスト表示
        message.textContent = scene.text;
    }

    // 選択肢を表示
    function displayChoices(scene) {
        charName.style.display = 'none';
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
            item.textContent = evi.name;
            item.dataset.id = evi.id; 
            item.onclick = () => {
                // 証拠品選択のロジック
                document.querySelectorAll('.evidence-item').forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
            };
            evidenceList.appendChild(item);
        });
        
        // 矛盾点クリックのイベント
        const contradictionEl = document.querySelector('.contradiction');
        if (contradictionEl) {
            contradictionEl.onclick = (e) => {
                const selectedEvidence = document.querySelector('.evidence-item.selected');
                if (!selectedEvidence) {
                    alert('証拠品を選択してください！');
                    return;
                }

                if (selectedEvidence.dataset.id === scene.correctEvidence) {
                    // 正解
                    showBreakAnimation(() => {
                        showScreen(gameScreen);
                        // 成功したら指定のシーンへ
                        currentScene = findSceneIndex(scene.successNext);
                        updateScene();
                    });
                } else {
                    // 不正解
                    alert('違う！その証拠では矛盾を突けない！');
                    // ここにゲームオーバーなどの処理を追加可能
                }
            };
        }
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
        if (!label) return -1;
        return scenario.findIndex(scene => scene.label === label);
    }
    
    // 次のシーンへ進めるための関数
    function next() {
        const currentSceneData = scenario[currentScene];

        // 現在のシーンに 'next' プロパティがあるか確認
        if (currentSceneData && currentSceneData.next) {
            if (currentSceneData.next === 'end') {
                alert('GAME CLEAR (Prototype)');
                // ゲーム状態をリセット
                gameState.evidence = [];
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

        updateScene();
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
        // ゲーム状態を初期化
        gameState = {
            evidence: [],
        };
        updateScene();
    });
    
    textbox.addEventListener('click', () => {
        // 選択肢や論破パートが表示されている間はクリックで進まない
        if (choicesBox.style.display === 'flex' || debateScreen.classList.contains('active')) {
             return;
        }
        next();
    });

    // 初期化
    showScreen(titleScreen);
});

