document.addEventListener('DOMContentLoaded', () => {
    // HTML要素の取得
    const backgroundLayer = document.getElementById('background-layer');
    const characterImage = document.getElementById('character-image');
    const characterName = document.getElementById('character-name');
    const dialogueText = document.getElementById('dialogue-text');
    const chapterTitleLayer = document.getElementById('chapter-title-layer');
    const chapterTitle = document.getElementById('chapter-title');
    
    // ストーリーデータ
    const story = [
        { type: 'narration', text: '―笑顔の裏に潜む、むき出しの悪意。' },
        { type: 'narration', text: 'これはもう、遊びやイタズラなんかじゃない。' },
        { type: 'background', image: 'images/bg_classroom_day.jpg' },
        { type: 'narration', text: '午前の教室。まだ朝の光は白く、窓から差し込む風は静かだった。' },
        { type: 'narration', text: '僕は転校生として新しい席に腰を下ろす。' },
        { type: 'narration', text: 'ほんの少しだけ胸を膨ませて、「今日から僕の新しい日常が始まるのだ」と思い込もうとしていた。' },
        { type: 'narration', text: 'だが、そこにあったのは――' },
        { type: 'narration', text: '机に深く刻み込まれた、たった二文字。' },
        { type: 'narration', text: '“死ね”', flash: true }, // フラッシュ演出の例
        { type: 'narration', text: '硬い木材に残された線は、誰かの震える手が残したものではなかった。' },
        { type: 'narration', text: '強く、繰り返し、何度も押し込むように刻まれた傷跡。' },
        { type: 'narration', text: 'その文字の底には、ただの衝動ではなく、冷たい悪意が染み込んでいるように思えた。' },
        { type: 'background', image: 'images/bg_corridor.jpg' },
        { type: 'narration', text: '息を呑んだ僕の耳に、廊下のざわめきが飛び込んでくる。' },
        { type: 'narration', text: '駆け寄ると、生徒用ロッカーが荒らされていた。' },
        { type: 'narration', text: '制服、教科書、化粧ポーチ……生活の破片が床に散らばっている。' },
        { type: 'narration', text: 'その中で、ひときわ目を引くもの。' },
        { type: 'narration', text: '誰かの下着が、わざと晒すように天井の蛍光灯の下に置かれていた。' },
        { type: 'narration', text: '羞恥を狙った、露骨で下劣な仕打ち。' },
        { type: 'narration', text: 'ただのイタズラではない。――これは、誰かを「壊すための意思」だ。' },
        { type: 'background', image: 'images/bg_classroom_day.jpg' },
        { type: 'narration', text: '教室に戻ると、友人たちの視線が交錯する。' },
        { type: 'narration', text: '笑う者も、怯える者も、沈黙する者もいた。' },
        { type: 'narration', text: 'だが、その誰もが口を開かず、まるで「見てはいけないもの」として処理しようとしていた。' },
        { type: 'narration', text: '僕は思った。この学園には、目に見えない「声」が渦巻いている。' },
        { type: 'narration', text: '机に刻まれた刃のような言葉。廊下に撒き散らされた生活の断片。' },
        { type: 'narration', text: 'そのすべてが、誰かの心を切り裂き、生きる居場所を奪おうとしている。' },
        { type: 'narration', text: '胸の奥で冷たい感情が芽生える。' },
        { type: 'narration', text: '――これは始まりにすぎない。' },
        { type: 'narration', text: '――これから僕は、醜く汚い人間の憎悪と、正面から戦っていくことになるのだ。' },
        { type: 'narration', text: '窓の外で、曇った太陽がほんの少し揺らいだ。その光さえも、どこか嘲笑しているように見えた。' },
        
        // Day 1
        { type: 'chapter', title: 'Day1<br>炎の痕' },
        { type: 'background', image: 'images/bg_shoebox_burnt.jpg' },
        { type: 'narration', text: '朝、ホームルームが始まる前。廊下に甲高い悲鳴が響き渡った。' },
        { type: 'narration', text: '心臓を掴まれたように胸が跳ね、僕らは声のする方へ駆け出す。' },
        { type: 'narration', text: 'そこにあったのは、焼け焦げた靴箱だった。' },
        { type: 'narration', text: '木材は黒く炭のようになり、ひしゃげた金具からはまだ熱が残っている。' },
        { type: 'narration', text: '中に入っていた上履きは、片方が真っ黒に焦げ、もう片方は辛うじて形を保っていた。' },
        { type: 'narration', text: 'だが漂うオイルの匂いが、これが自然発火ではなく、“誰かが意図的に仕組んだ火”であることを告げていた。' },
        // ▼▼▼ 変更点 ▼▼▼
        { type: 'character', name: '葵', image: 'https://placehold.co/400x800/ff00ff/1a1a1a?text=Aoi' },
        { type: 'dialogue', name: '葵', text: 'だ、誰か……！　見てっ！' },
        { type: 'character', name: '理子', image: 'https://placehold.co/400x800/ff00ff/1a1a1a?text=Riko' },
        // ▲▲▲ 変更点 ▲▲▲
        { type: 'dialogue', name: '理子', text: '……これは“イタズラ”の域を超えている。放火未遂よ。' },
        { type: 'character', name: 'none' }, // キャラクターを消す
        { type: 'narration', text: 'クラスメイトたちは口々にざわめく。「危なかったらどうするんだよ」「誰の靴だった？」「先生には言うべきだ」' },
        { type: 'narration', text: 'だが、その声には妙な温度差があった。怯える者。苛立つ者。一方で、目を逸らし、関わりたくないと距離を取る者。' },
        { type: 'narration', text: 'まるで火を放った“誰か”が、この場に混ざっていることを、全員が心の奥で薄々感じているかのように。' },
        { type: 'narration', text: '僕の背筋を冷たい汗が伝った。犯人の姿は見えない。' },
        { type: 'narration', text: 'だが、その気配は確実にここに存在している。影は形を持たず、教室の空気に溶け込んでいる。' },
        { type: 'narration', text: '誰の瞳が嘘を隠しているのか――判別できないまま、僕はひたすらに周囲の気配を探ろうとした。' },
        { type: 'narration', text: '炎の痕跡は、ただの警告ではない。「次は人を焼く」という意思表示のように思えた。' },
        { type: 'narration', text: '――悪意は確実にエスカレートしている。次に狙われるのは、僕か、それとも隣に立つ誰かか。' },
        { type: 'narration', text: '窓の外で、曇天に隠れた太陽がぼんやりと揺れていた。まるでそれすらも、静かに見下ろし、笑っているかのように。' },
        { type: 'narration', text: '（クリックで最初に戻ります）' },
    ];

    let storyIndex = -1;
    let isTyping = false;
    let typingTimeout;

    // テキストを1文字ずつ表示する関数
    function typeWriter(text, callback) {
        isTyping = true;
        let i = 0;
        dialogueText.innerHTML = '';
        function typing() {
            if (i < text.length) {
                dialogueText.innerHTML += text.charAt(i);
                i++;
                typingTimeout = setTimeout(typing, 50); // 文字の表示速度
            } else {
                isTyping = false;
                if(callback) callback();
            }
        }
        typing();
    }
    
    // 次のストーリーを表示する関数
    function displayNextScene() {
        // タイピング中なら、一気に全文表示する
        if (isTyping) {
            clearTimeout(typingTimeout);
            isTyping = false;
            const currentScene = story[storyIndex];
            dialogueText.innerHTML = currentScene.text;
            return;
        }

        storyIndex++;
        if (storyIndex >= story.length) {
            storyIndex = 0; // 最後まで行ったら最初に戻る（ループ）
        }

        const currentScene = story[storyIndex];

        // タイプによって処理を分岐
        switch (currentScene.type) {
            case 'narration':
                characterName.style.display = 'none';
                // キャラクターが表示されている場合、非表示にする
                if (characterImage.style.opacity === '1') {
                    characterImage.style.opacity = '0';
                }
                typeWriter(currentScene.text);
                break;
            case 'dialogue':
                characterName.style.display = 'block';
                characterName.textContent = currentScene.name;
                typeWriter(currentScene.text);
                break;
            case 'background':
                backgroundLayer.style.backgroundImage = `url(${currentScene.image})`;
                displayNextScene(); // 背景変更後、すぐに次のシーンへ
                break;
            case 'character':
                if (currentScene.name === 'none') {
                    characterImage.style.opacity = '0';
                } else {
                    characterImage.src = currentScene.image;
                    characterImage.style.opacity = '1';
                }
                displayNextScene(); // キャラ表示後、すぐに次のシーンへ
                break;
            case 'chapter':
                chapterTitle.innerHTML = currentScene.title;
                chapterTitle.dataset.text = chapterTitle.textContent;
                chapterTitleLayer.classList.add('show-chapter-title');
                setTimeout(() => {
                    chapterTitleLayer.classList.remove('show-chapter-title');
                    displayNextScene();
                }, 3000); // 3秒間タイトルを表示
                break;
        }
    }

    // クリックイベントでストーリーを進行
    document.body.addEventListener('click', displayNextScene);

    // ゲーム開始
    displayNextScene();
});