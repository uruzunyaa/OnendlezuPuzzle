	var answer = [];
	var check = [];
	var remaining1 = [];
	var remaining2 = [];
	var sequence = 1;
	var group = [];
	var groupcheck = 0;
	var groupstart = [1,1];
	var groupbanngou = 0;
	var probabilitysticking = [100,30,40,20,50,80,80,80,80,80,80,80,80,80,80,80,0];
	var calculation = [];
	var resultcalculation = [];
	var keisannkekkahyouzi = [];
	var mugenntyekku = 0;
	var sakuseisita = 0;
	var clickflag = 0;
	var nyuuryokusize = [];//配列0番目が横、1番目が縦
	var answerchecker0 = [];//０が＋のチェッカー
	var answerchecker1 = [];//１が×のチェッカー
	
	
	//この確率は、前の個数到達後、更にくっつけるかの確立。
	for(var i = 0 ; i <= 22; i++){
		answer [i] = [];
		check [i] = [];
		group [i] = [];
	}
	function makepuzzle(){
		if(sakuseisita == 0 && Number(document.getElementById("number1").value) <= 11 && Number(document.getElementById("number1").value) >= 2){
			sakuseisita = 1;
			console.log(document.body.scrollWidth);
			document.getElementById("createCSS").disabled = true;
			document.getElementById("puzzleCSS").disabled = false;
			size = Number(document.getElementById("number1").value);
			document.getElementById("setumei").innerHTML = "ルール<br/>1.図のマスに1~" + size + "までの数字を入れます。 <br/>2.どの列（たて、横とも）にも1~" + size + "までの数字が一つずつ入ります。<br/>3.太線で囲まれたブロック内に書かれている数字は、マスに入る数字の和、または積のどちらかを表します。";
			console.log( typeof size );
			//改行の調整
			document.getElementById("brkaizyo").innerHTML = '<br clear="right"><br clear="left">';
			
			//入力板のサイズを決める。パズルサイズから、計算し、縦横を決める。
			nyuuryokusize[0]=0;
			nyuuryokusize[1]=0;
			do{
				nyuuryokusize[0]=nyuuryokusize[0] + 1;
				if (nyuuryokusize[0] * nyuuryokusize[1] >= size){
					break;
				}
				nyuuryokusize[1]=nyuuryokusize[1] + 1;
				if (nyuuryokusize[0] * nyuuryokusize[1] >= size){
					break;
				}
			}while (1);
			
			//答えを入力する時のスタイル
			var fillinStyle = {
				border:'none',
				color:'red',
				textAlign:'center',
				//display:'table.cell',
				verticalAlign:'middle',
				fontSize:'5vw',
				position:'absolute',
				top:'50%',
				left:'50%',
				transform:'translateY(-50%) translateX(-50%)',
				tableLayout:'auto',
				wordWrap:'normal'
				//-webkit-transform:translateY(-50%) translateX(-50%);
				//top:'0',
				//right:'0',
				//bottom:'0',
				//left:'0',
				//margin:'auto'
			}
			for(var i = 0 ; i <= size + 1; i++){
				for(var j = 0 ; j <= size + 1; j++){
					group[i][j] = -1;
					check[i][j] = -1;
					keisannkekkahyouzi[i*size+j] = 0;
				}
			}
			for(var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					answer[i][j] = 0;
					check[i][j] = 1;
					group[i][j] = 0;
				}
				remaining1[i] = size;
				remaining2[i] = size;
			}
			//window.alert(size);
			//console.log(size);
			//iは種類目の数字を入れているか。（0~size-1なので実際表示の際は注意）
			//jはその数字を何回入れたかをカウントする（こちらも0~size-1）で縦軸を決める数値でもある
			//randomは横軸の何処に入れるかを決定する
			//sequenceで何列目に入れるかを決定している
			//remaining1でその横列に空きが何個あるか測定
			for(var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					for(l=1 ; l <= size; l++){
						if((sequence > 0 ? remaining1[sequence] : remaining2[sequence * -1]) < remaining1[l] ){
							sequence = l;
						}
					}
					for(l=1 ; l <= size; l++){
						if((sequence > 0 ? remaining1[sequence] : remaining2[sequence * -1]) > remaining1[l] && remaining1[l] > 0){
							sequence = l;
						}
						if((sequence > 0 ? remaining1[sequence] : remaining2[sequence * -1]) > remaining2[l] && remaining2[l] > 0){
							sequence = -l;
						}
					}
					//ここまでで、どの列、行に入れるかが決定
					//sequenceが不なら縦列でランダムに数字を入れる　正なら横
					if(sequence > 0){
						mugenntyekku = 0;
						do {
							var random = Math.floor( Math.random() * size * 100);
							random = random % size + 1;
							//console.log(i,j);
							mugenntyekku=mugenntyekku + 1;
							if(mugenntyekku > 10000){
								console.log("mugennhaitta!");
								j = 0;
								for(l=1 ; l <= size; l++){
									for(p=1 ; p <= size; p++){
										if (answer[l][p] == i){
											answer[l][p] = 0;
										}
										if (answer[l][p] == 0){
											check[l][p] = 1;
										}
									}
								}
								break;	
							}
						} while (check[random][sequence] == 0);
						if(mugenntyekku <= 10000){
							answer[random][sequence] = i;
							//console.log(random,sequence,i,"ヨコが軸");
							for(l=1 ; l <= size; l++){
								check[random][l] = 0;
								check[l][sequence] = 0;
							}
						}
					}else{
						mugenntyekku = 0;
						do {
							var random = Math.floor( Math.random() * size * 100);
							random = random % size + 1;
							//console.log(i,j);
							mugenntyekku=mugenntyekku + 1;
							if(mugenntyekku > 10000){
								console.log("mugennhaitta!");
								j = 0;
								for(l=1 ; l <= size; l++){
									for(p=1 ; p <= size; p++){
										if (answer[l][p] == i){
											answer[l][p] = 0;
										}
										if (answer[l][p] == 0){
											check[l][p] = 1;
										}
									}
								}
								break;	
							}
						} while (check[-sequence][random] == 0);
						if(mugenntyekku <= 10000){
							answer[-sequence][random] = i;
							//console.log(-sequence,random,i,"縦が軸");
							for(l=1 ; l <= size; l++){
								check[-sequence][l] = 0;
								check[l][random] = 0;
							}
						}
					}
					//1になる事がない状態が出来てしまっているよう,iが１になる前にここでループしているよう。jは１でループ？しているっぽい
					//ここで答えを入力＆デバッグ
					for(l=1 ; l <= size; l++){
						remaining1[l] = size;
						remaining2[l] = size;
					}
					//列、行に入れる数のリセット
					for(l=1 ; l <= size; l++){
						for(p=1 ; p <= size; p++){
							if (check[p][l] == 0){
								remaining1[l] = remaining1[l] - 1;
								remaining2[p] = remaining2[p] - 1;
							}
						} 
					}
					//列、行に入れる数の計算
				
				}
				//console.log(size+1);
				//checkはその数字が終るまで、上乗せ形式で0が入力されていく。ここまで来たらこの後、checkを数字が入ってない場所を1にする。
				sequence = 1;
				for(l=1 ; l <= size; l++){
					remaining1[l] = size;
					remaining2[l] = size;
				}
				for(l=1; l <= size; l++){
					for(p=1; p <= size; p++){
						if (answer[p][l] == 0){
							check[p][l] = 1;
						}
						if (check[p][l] == 0){
							remaining1[l] = remaining1[l] - 1;
							remaining2[p] = remaining1[p] - 1;
						}
					}
				}
			}
			//ここまでで正解の数字の配置完了
			for(var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					//console.log(answer[j][i]);
				}
			}
			//ここから切り分け
			//console.log(kiriwake.findIndex((element) => element = 0));
			//checkは　隣接してる　空きの数
			//グループリングして、それぞれ番号を振ってゆく（グループ番号は配列管理）グループ番号を定義するごとに配列化していく。
			//groupを使って何所属かを纏める
			//groupcheck
		
			while(groupcheck == 0){
				//groupbanngou　は　今何回目のグループリングなのかを判定
				groupbanngou = groupbanngou + 1;
				for(var i = 1 ; i <= size; i++){
					for(var j = 1 ; j <= size; j++){
						check[i][j] = 0;
						if(group[i+1][j] == 0){
							check[i][j] = check[i][j] + 1;
						}
						if(group[i-1][j]　== 0){
							check[i][j] = check[i][j] + 1;
						}
						if(group[i][j+1] == 0){
							check[i][j] = check[i][j] + 1;
						}
						if(group[i][j-1] == 0){
							check[i][j] = check[i][j] + 1;
						}
					}
				}
				/*if (groupbanngou < 10){
					console.log(groupbanngou);
					for(var i = 1 ; i <= size; i++){
						for(var j = 1 ; j <= size; j++){
							console.log(check[i][j]);
						}
					}
				}*/
				//checkに周囲の空きのマス入れるの完了
				for(var i = 1 ; i <= size; i++){
					for(var j = 1 ; j <= size; j++){
						if (check[groupstart[0]][groupstart[1]]　<= check[i][j] && group[i][j] == 0){
							//このifの条件をgroupの場所が空きである事のみにした結果、稀に1マス孤立の奴じゃないパターンで詰まる事が起こるようになった。
							//また、下のif毎コメントにしてみる。10/8
							groupstart[0] = i;
							groupstart[1] = j;
						}
					}
				}
				for(var i = 1 ; i <= size; i++){
					for(var j = 1 ; j <= size; j++){
						if (check[groupstart[0]][groupstart[1]]　> check[i][j] && group[i][j] == 0){
							groupstart[0] = i;
							groupstart[1] = j;
						}
					}
				}
				//ここまでグループリングの位置決め
				//groupstartが　どこのポイントからグループリングを行うかを入れている。
				//ここから位置が決まったのでグループリング開始
				//groupの配列の横を調べて0ならcheckのその位置を１追加と行きたいが外側がネックになるので序盤でgroup側に外側を入れておく
				//外側をー１で定義
			
				/*
				ここでやる事groupstart[0]、groupstart[1]を座標とする　場所に　groupの値が０の所にgroupbanngouを代入する。
				また、何個目のそのグループの値かにより、確率でさらに次にくっつけるかを決める　くっつけるなら隣り合う空きがあるかをチェックしあるならその中からランダムな場所をそのグループに入れる。
				そして、そのグループを足し算、掛け算のどちらなのかを決定する。
				calculation の配列に　group番号番目が　＋なのか×なのかを入れる。
				くっつく確率を纏めた変数を定義しておく。それと、乱数を比較して確率が外れるまでwhileを回す。
				また、くっつける場所が無くなった場合もwhileから抜ける。くっつく確率の配列をprobabilitystickingとする。
			
				probabilitystickingの配列は0番目が2個目以降くっつく確率になる。
				*/

				//ここは永遠に4,4が選ばれてしまっている
				group[groupstart[0]][groupstart[1]] = groupbanngou;
				if(check[groupstart[0]][groupstart[1]] == 0){
				}
				//このwhileをifの中に入れて、ifで1マス孤立でないかを判断する。孤立じゃなければ、do whileで回す。
				if(check[groupstart[0]][groupstart[1]] != 0){
					var i = 0;
					var j = 0;
					do {
						do {
							var randomy = Math.floor( Math.random() * size * 100);
							randomy = randomy % size + 1;
							var randomx = Math.floor( Math.random() * size * 100);
							randomx = randomx % size + 1;
						} while (group[randomx][randomy] != 0 || (group[randomx-1][randomy] != groupbanngou && group[randomx+1][randomy] != groupbanngou && group[randomx][randomy-1] != groupbanngou && group[randomx][randomy+1] != groupbanngou));
					
						group[randomx][randomy] = groupbanngou;
						var random = Math.floor( Math.random() * 10000);
						random = random % 100;
						i = i + 1
						j = 1;
						for(var l = 1 ; l <= size; l++){
							for(var p = 1 ; p <= size; p++){
								if (group[l][p] == 0 && (group[l-1][p] == groupbanngou || group[l+1][p] == groupbanngou || group[l][p-1] == groupbanngou || group[l][p+1] == groupbanngou)){
									j　= 0;
								}
							}
						}
					}while(random < probabilitysticking[i] && j == 0);
				}
				
				//ここから　今作ったグループを＋なのか×なのかを決める。
				var random = Math.floor( Math.random() * 10000);
				random = random % 2;
				calculation[groupbanngou] = random;
				//0なら　＋　1なら　×　とする。			
				
				//ここから完成かどうか
				groupcheck = 1;
				for(var i = 1 ; i <= size; i++){
					for(var j = 1 ; j <= size; j++){
						if (group[i][j] == 0){
							groupcheck　= 0;
							//console.log();
							
						}
					}
				}
			}
			for(var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					//console.log(group[j][i]);
				}
			}
			for(var i = 1 ; i <= groupbanngou; i++){
				//console.log(calculation[i]);
			}
			//ここまででパズル生成に必要な材料が揃った。
			//answer[][]で答え、group[][]で切り分け、groupbanngouで何個にグループ分けされてるか、calculation[]で＋か×かの演算が入っている。
			//resultcalculation[]でそのグループの表示する数字（計算結果）を入れる。
			for(var i = 1 ; i <= groupbanngou; i++){
				resultcalculation[i] = calculation[i];
				//これは＋なら初期値0　×なら初期値1を代入するようにしている。
				for(var j = 1 ; j <= size; j++){
					for(var l = 1 ; l <= size; l++){
						if(group[j][l] == i){
							if(calculation[i] == 0){
								//＋の場合
								resultcalculation[i] =  resultcalculation[i] + answer[j][l];
							}else{
								//×の場合
								resultcalculation[i] =  resultcalculation[i] * answer[j][l];
							}
						}
					}
				}
			}
			for(var i = 1 ; i <= groupbanngou; i++){
				//console.log(resultcalculation[i]);
			}
			//ここから変数の値を元に表示をしていく。
			//document.getElementById("puzzle").innerHTML = 'バーカ！';
			//ｘ列をパズルの横列（trタグ、divのidはpuzzleで編集する。）
			//y列をパズルの縦列（tdタグ、divのidはpuzzle+x列の番号で編集する。）
			//テーブルのサイズ設定
			//document.getElementById("puzzle").innerHTML = '<table border="1" id="puzzle" width='+ 100/size +'% ></table>'
			
			//テーブルの中身の作成
			for(var i = 1 ; i <= size; i++){
				puzzlex = document.getElementById("puzzle").innerHTML;
				document.getElementById("puzzle").innerHTML = puzzlex + '<tr id ="puzzle' +String(i)+'"></tr>';
				for(var j = 1 ; j <= size; j++){
					puzzley = document.getElementById("puzzle" + String(i)).innerHTML;
					document.getElementById("puzzle" + String(i)).innerHTML = puzzley + '<td id="zahyou' + String(i) + 'and' + String(j) + '" valign="top" width="'+document.body.scrollWidth*0.6/size+'" height="' + document.body.scrollWidth *0.55/size  + '" class="nowValue">  </td>';
					//この時にwidthをここで掛けると、横の比重がおかしくなるのを防げた？っぽいが、CSS側を消すと極小になる。恐らく、元々テーブルのサイズを決める必要があると思われる。　仕様の解明の為に後々、調査したい。（テーブルとtd両方に指定して成功）
					//ここのｔｄに横と同じグループか。下と同じグループか。を見てタグを入れる　そのタグにCSSで指定を掛ける
				}
			}
			//テーブル外側の大木さ固定
			document.getElementById("puzzle").width = document.body.scrollWidth*0.6;
		
			//テーブルの中の枠線の設定
			//id = zahyou(x座標)and(y座標)がテーブルidと対応している。 
			for(var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					if(group[i][j] == group[i][j+1]){
						document.getElementById("zahyou" + String(i) + "and" + String(j)).classList.add("yokotunage");
					}else{
						document.getElementById("zahyou" + String(i) + "and" + String(j)).classList.add("yokowake");
					}
					if(group[i][j] == group[i+1][j]){
						document.getElementById("zahyou" + String(i) + "and" + String(j)).classList.add("tatetunage");
					}else{
						document.getElementById("zahyou" + String(i) + "and" + String(j)).classList.add("tatewake");
					}
				}
			}
			//y,xの順の座標になっている。
			//計算結果表示（keisannkekkahyouzi）は、計算結果を表示したかどうかを判断する変数
			for(var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					
					if(keisannkekkahyouzi[group[i][j]]==0){
						document.getElementById( "zahyou" + String(i) + "and" + String(j)).innerHTML = resultcalculation[group[i][j]];
						keisannkekkahyouzi[group[i][j]]=1;
					}
					//fillinxyはただの一時確保、id=fillin"x"and"y"が答えを入れる座標、（x,yは具体値）
					fillinxy=document.getElementById( "zahyou" + String(i) + "and" + String(j)).innerHTML;
					document.getElementById( "zahyou" + String(i) + "and" + String(j)).innerHTML = fillinxy + '<table border="0" id="fillin' + String(i) + 'and' + String(j) + '"width="'+document.body.scrollWidth*0.6/size+'" height="' + document.body.scrollWidth *0.55/size  + '"><td id="fillintd' + String(i) + 'and' + String(j) + '"></td></table>';
					//document.getElementById("fillin" + String(i) + "and" + String(j)).classList.add("fillin");
					for(var prop in fillinStyle) {
						document.getElementById("fillin" + String(i) + "and" + String(j)).style[prop] = fillinStyle[prop];
					}
				}
			}
			//console.log(document.getElementById("table").innerHTML);
			for (var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					var osareta = document.getElementById( "fillintd" + String(i) + "and" + String(j));
					osareta.onclick = function(){Sentaku(this);}
				}
			}
			//生成版を作る。nyuuryokusize[0](横一列の長さ)*j(y座標、0~nyuuryokusize[1]－１)　＋i(x座標、１～マス数ことnyuuryokusize[0]) 
			for(var i = 0 ; i <= nyuuryokusize[1] -1; i++){
				nyuuryokux = document.getElementById("nyuuryoku").innerHTML;
				document.getElementById("nyuuryoku").innerHTML = nyuuryokux + '<tr id ="nyuuryoku' +String(i)+'"></tr>';
				for(var j = 1 ; j <= nyuuryokusize[0]; j++){
					nyuuryokuy = document.getElementById("nyuuryoku" + String(i)).innerHTML;
					document.getElementById("nyuuryoku" + String(i)).innerHTML = nyuuryokuy + '<td id="nyuuryokubannzahyou' + String(i) + 'and' + String(j) + '" valign="middle" width="'+document.body.scrollWidth*0.3/nyuuryokusize[0]+'" height="' + document.body.scrollWidth *0.28/nyuuryokusize[0]  + '" >' + Number(nyuuryokusize[0] * i + j) + '</td>';
					var nyuuryokubannzahyou = document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j));
					nyuuryokubannzahyou.style.fontSize = '5vw';
					nyuuryokubannzahyou.style.color = 'red';
					nyuuryokubannzahyou.style.textAlign = 'center';
					nyuuryokubannzahyou.style.border = '5px solid black';
					nyuuryokubannzahyou.onclick = function(){Nyuuryoku(this);}
				}
			}
			//余分な生成数字の削除
			for(var i = 0 ; i <= nyuuryokusize[1] -1; i++){
				for(var j = 1 ; j <= nyuuryokusize[0]; j++){
					if (document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j)).innerHTML > size){
						document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j)).innerHTML = "";
					}
				}
			}
			//取り消しボタン作成
			nyuuryokutorikesi = document.getElementById("nyuuryoku").innerHTML;
			document.getElementById("nyuuryoku").innerHTML = nyuuryokutorikesi + '<tr><td id ="nyuuryokutorikesi" colspan=' + nyuuryokusize[0] + ' height="' + document.body.scrollWidth *0.18/nyuuryokusize[0] +'">取り消し</td></tr>';
			document.getElementById("nyuuryokutorikesi").style.fontSize = '5vw';
			document.getElementById("nyuuryokutorikesi").style.color = 'red';
			document.getElementById("nyuuryokutorikesi").style.textAlign = 'center';
			document.getElementById("nyuuryokutorikesi").style.border = '5px solid black';
			//入力版のクリック判定
			for(var i = 0 ; i <= nyuuryokusize[1] -1; i++){
				for(var j = 1 ; j <= nyuuryokusize[0]; j++){
					var osareta2 = document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j));
					if (osareta2.innerHTML >= 1){
						osareta2.onclick = function(){Nyuuryoku(this);}
					}
				}
			}
			//キャンセルのクリック判定
			document.getElementById("nyuuryokutorikesi").onclick = function(){Torikesi(this);}
		}//このカッコの中に、パズル生成時に動かすプログラムを書く
	//var teiburu = document.getElementById('banmen');//テーブルを取得
	//パズル本体をクリックした時のイベント
	}
	function Sentaku(Cell){
		for (var i = 1 ; i <= size; i++){
			for(var j = 1 ; j <= size; j++){
				//console.log(document.getElementById( "fillin" + String(i) + "and" + String(j)));
				document.getElementById( "fillintd" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,0,0)';
				if(Cell.innerHTML == document.getElementById( "fillintd" + String(i) + "and" + String(j)).innerHTML && Cell.innerHTML >= 1){
					document.getElementById( "fillintd" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,256,0.1)';
				}
			}
		}
		for(var i = 0 ; i <= nyuuryokusize[1] -1; i++){
			for(var j = 1 ; j <= nyuuryokusize[0]; j++){
				document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,0,0)';
				if(Cell.innerHTML == document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j)).innerHTML && Cell.innerHTML >= 1){
					document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,256,0.2)';
				}
			}
		}
		//console.log(Cell)
		Cell.style.background = 'rgba(0,0,256,0.2)';
		clickflag = Cell;
		//ここで、この座標にフラグが立ったら、フラグを元にもう一つのテーブルから、onclickでここに値をぶち込む。
	};
	//入力版数字が、押された際のプログラム
	function Nyuuryoku(Cell2){
		for(var i = 0 ; i <= nyuuryokusize[1] -1; i++){
			for(var j = 1 ; j <= nyuuryokusize[0]; j++){
				document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,0,0)';
			}
		}
		for (var i = 1 ; i <= size; i++){
			for(var j = 1 ; j <= size; j++){
				document.getElementById( "fillintd" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,0,0)';
			}
		}
		Cell2.style.background = 'rgba(0,0,256,0.2)';
		if(clickflag != 0){
			clickflag.innerHTML = Cell2.innerHTML;
		}
		//console.log(Cell2.innerHTML);
		for (var i = 1 ; i <= size; i++){
			for(var j = 1 ; j <= size; j++){
				if(Cell2.innerHTML == document.getElementById( "fillintd" + String(i) + "and" + String(j)).innerHTML){
					document.getElementById( "fillintd" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,256,0.1)';
				}
			}
		}
		if(clickflag != 0){
			clickflag.style.background = 'rgba(0,0,256,0.2)';
		}
		//ここから正解チェック
		var seikaicheck = 1;
		//盤面が全て埋まっているかチェック
		for (var i = 1 ; i <= size; i++){
			for(var j = 1 ; j <= size; j++){
				if(document.getElementById( "fillintd" + String(i) + "and" + String(j)).innerHTML >= 1){
					//そのマスに回答が入って居た場合
				}else{
					seikaicheck = 0;
				}
			}	
		}
		//ここから正解判定の、グループ毎の演算チェック。
		for (var k = 1 ; k <= groupbanngou; k++){
			answerchecker0[k] = 0;
			answerchecker1[k] = 1;
			for (var i = 1 ; i <= size; i++){
				for(var j = 1 ; j <= size; j++){
					if(group[i][j] == k){
						answerchecker0[k] = answerchecker0[k] + Number(document.getElementById( "fillintd" + String(i) + "and" + String(j)).innerHTML);
						answerchecker1[k] = answerchecker1[k] * document.getElementById( "fillintd" + String(i) + "and" + String(j)).innerHTML;
					}
				}
			}
			
			if (answerchecker0[k] != resultcalculation[k] && answerchecker1[k] != resultcalculation[k]){
				seikaicheck = 0;
			}
		}
		//ここから、縦横のチェック。
		for (var i = 1 ; i <= size; i++){
			for(var j = 1 ; j <= size; j++){
				for (var l = 1 ; l <= size; l++){
					if(document.getElementById( "fillintd" + String(i) + "and" + String(j)).innerHTML == document.getElementById( "fillintd" + String(i) + "and" + String(l)).innerHTML){
						if(document.getElementById( "fillintd" + String(i) + "and" + String(j)) != document.getElementById( "fillintd" + String(i) + "and" + String(l))){
							seikaicheck = 0;
						}
					}
					if(document.getElementById( "fillintd" + String(i) + "and" + String(j)).innerHTML == document.getElementById( "fillintd" + String(l) + "and" + String(j)).innerHTML){
						if(document.getElementById( "fillintd" + String(i) + "and" + String(j)) != document.getElementById( "fillintd" + String(l) + "and" + String(j))){
							seikaicheck = 0;
						}
					}
				}
			}
		}
		
		//上の正解判定を利用して、クリアの場合、クリア演出を出す。
		if(seikaicheck == 1){
			console.log('clear!');
			document.getElementById("clear").innerHTML = '<dialog open><p>congratulation!</p><menu><button value="reset" onclick="reset()">リセット</button><button id="confirmBtn" value="ok" onclick ="toziru()">OK</button></menu></dialog>';
			document.getElementById("bodii").style.background = 'rgba(0,0,0,0.4)';
		}
	};
	//取り消しボタンクリック時処理
	function Torikesi(Cell3){
		for(var i = 0 ; i <= nyuuryokusize[1] -1; i++){
			for(var j = 1 ; j <= nyuuryokusize[0]; j++){
				document.getElementById("nyuuryokubannzahyou" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,0,0)';
			}
		}
		for (var i = 1 ; i <= size; i++){
			for(var j = 1 ; j <= size; j++){
				document.getElementById( "fillintd" + String(i) + "and" + String(j)).style.background = 'rgba(0,0,0,0)';
			}
		}
		clickflag.innerHTML = "";
		clickflag = 0;
	};
	function toziru(){
		document.getElementById("clear").innerHTML = "";
		document.getElementById("bodii").style.background = 'rgba(0,0,0,0)';
	};
	function reset(){
		console.log("リセット！")
		location.reload();
	}