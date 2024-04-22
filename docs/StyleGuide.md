# Vue.js/JavaScript全般
 - Vue.js
   - Composition APIを使う(Not Options API)
   - propsの型を定義する
     - array/objectも、どのようなデータか定義を忘れずに。
        - PropTypeを使う
   - watch / watchEffect / computed
     - watchは、バグの原因になるので実装には注意を。(watchを定義したときには実行されない/watchされる変数が事前にセットされる場合は呼ばれない）
       - { immediate: true } を使う
     - watchEffectは定義時に実行される。しかし、後で実装に変更が入った場合に副作用が増える可能性もある。（追加した変数がwatch対象になり想定してないケースで更新されるなど）
     - computedのほうがわかりやすい（ただしwatchも便利）
   - SFC(single file component)は使わない(<script setup> の利用)
     - templateで使う変数とそうでないものが区別がつかなくなる
     - 小さなコンポーネントでのみ使う
   - importはalias pathを使う（ファイルを移動したときに、相対パスだと壊れる）
     - from '@/hogehoge' 形式
   - propsにFunctionsを定義しない
     - emitを使う
   - reactiveよりrefを推奨
     - hoge.valueで明示的に変更したほうが安全
     - reactiveは挙動がわかりづらい
   - v-htmlなど脆弱性の危険性があるものは使わない

 - JavaScript
   - varは禁止。letも極力やめて、constを使うようにする(immutable)
     - for(let ...) もfor ofやforEach, map, reduceを使えないか検討する
   - Array操作はfind, some, every, includesなどを使う
   - 型は必ずつける。any/unknownは使わない。
     - 「as」(type assertion)は極力使わない
     - 判別可能なユニオン型 (discriminated union)を活用する
   - Promise
     - 特別な場合を除き then, promiseではなくasync/await を使う
     - setTimeoutも、await sleep(src/utils/utils.ts)などを使う
   - hash値は使えるときは省略記法を使う
     - { hoge: hoge } ではなく { hoge }
   - 数値を直接ソースに書かない。定数（変数として定義する)
     - const sleepTimeSecond = 10; 
     - await sleep(sleepTimeSecond);
   - 変数名は、極力誰が読んでも意味がわかるように付ける
      - x, ではな くmodalBoxPositionX など
      - 単位などもつける sleep_time_ms
        - distance_to_home_km
      - 同じ変数名を違う意味で複数箇所で使わない
　　　　　　　　　　　　　　　　　- configではなく、userConfig/projectConfig
   - ifやforを深くnestさせない
   -  DRY(Don't repeat yourself)
   - 変更に強い実装を。 arrayは数が増えても動くか、順番が変わっても問題なく動作するか。

# Firebase
 - dataのインスタンス化
   - firestoreからとったデータはmodelのインスタンスして(src/models/以下参照）使う
     - データをメソッドで操作することで、変更を一箇所にまとめられる
     - 型の定義も同時にする
 - onSnapshotのdetacherの処理を忘れずに。
 - v8ではなくv9以降のライブラリででかく

# i18n
 - vue-i18nを使っている
   - templateには直接文言を書かないでi18nのhepler関数を使う {{ $t() }}
   - 通貨などもi18nをかならず使う{{$n() }}
   - router-linkのリンク先もi18n対応が必要(localizedUrl)
   - 日本語だけのサイトでも、i18nで文言をわけておくと、文言部分だけの変更を他の人に依頼しやすくなる
   - 利用規約など、全体が言語ごとに切り替わる場合は、hepler関数ではなくv-ifで切り替える、もしくは言語ごとにcomponentで切り替える（v-if）とよい。
 - timezoneを意識する
 
 # style
   - tailwind cssを使う
   - どうしても必要なとき以外は、styleタグには記述しない
     
# Git
   - rebaseは使わない
     - 　きれいにするのはコードであってcommit履歴ではない
   - forceは使わない
     - forceはジェダイ・マスターのみ。
   - こまめにcommitしてPRも読める量を素早く
     - 意味がある変更なら1行でもcommitする
     - commit履歴でどういう思考で変更したかがわかる
     - 大きなPRは読めない、見落とす
     - 小さなPRを早く回すにはレビューも素早く
# format
  - commit前に yarn run formatを行う
    
