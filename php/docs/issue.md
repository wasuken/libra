延長処理と予約処理の実装。

# 延長

延長はふつうに一週間追加、ただし予約がはいっていれば失敗判定(予約があるということがクライアントにわかるように)。

# 予約

予約処理は列にならぶイメージ。

本AにたいしてユーザーAが予約すると

本Aの最前列にはAがならぶ。

次にBが予約をすると

Aの次の一にBがならぶ。

予約日付でソートして最初のレコードに関連するユーザーに通知をおくりつつ、通知したユーザー以外のレンタルをロックする。

予約テーブルの実装は確定。

レンタルロックについては結合で確認するか、本自体にそういったカラムを追加するか。
