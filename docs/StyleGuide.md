# Vue.js/JavaScript全般
 - Vue.js
   - Composition APIを使う(Not Option API)
   - watch / watchEffect / computed
    - watchは、バグの原因になるので実装には注意を。(watchを定義したときには実行されない/watchされる変数が事前にセットされる場合は呼ばれない）
    - watchEffectは定義時に実行される。しかし、後で実装に変更が入った場合に副作用が増える可能性もある。（追加した変数がwatch対象になり想定してないケースで更新されるなど）
    - computedのほうがわかりやすい
 - JavaScript
   - varは禁止。letも極力constを使うようにしてletは使わない(immutable)
   - for(let ...) もfor ofやforEach, map, reduceを使えないか検討する
     - Array操作はfind, some, every, includesなどを使う
   - 型は必ずつける
   - Promise
     - 特別な場合を除き then, promiseではなくasync/await を使う
   - hash値は使えるときは省略記法を使う
   - 数値を直接ソースに書かない。定数（変数として定義する)
　　   - const sleepTimeSecond = 10; await sleep(sleepTimeSecond);
   - 変数名は、極力誰が読んでも意味がわかるように付ける
     - x, ではなくmodalBoxPositionX など
   - ifやforを深くnestさせない
   -  DRY(Don't repeat yourself)
   - 変更に強い実装を。 arrayは数が増えても動くか、順番が変わっても問題なく動作するか。

# Firebase
 - dataのインスタンス化
   - firestoreからとったデータはmodelのインスタンスして(src/models/以下参照）使う
     - データをメソッドで操作することで、変更を一箇所にまとめられる
     - 型の定義も同時にする
 - onSnapshotのdetacherの処理を忘れずに。

# i18n
 - vue-i18nを使っている
   - templateには直接文言を書かないでi18nのhepler関数を使う {{ $t() }}
   - 通貨などもi18nをかならず使う{{$n() }}
   - router-linkのリンク先もi18n対応が必要(localizedUrl)
 
 
