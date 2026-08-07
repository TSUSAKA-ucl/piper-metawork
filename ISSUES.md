# `metawork-publisher`と`joints`と`one-axis-mover`

フロントエンド側の`metawork-publisher`は、ik-workerが更新する
`this.el.workerData.current.joints`と直結しているため、このままでは
`one-axis-mover`に対応できない。schemaで、ik-workerジョイント値にするか
`one-axis-mover`の`this.scalar`にするか選択可能にする

エッジ側の`MQTT_Client.py`は劉さん版ではarm jointsと
tool(gripper,finger)ではトピックだけでなくplayloadの型(キー)も異なる
(armは`joint`, fingerは`tool`)こちらは`joint`がメインキーで無ければ
`tool`もチェックする実装に変更する。

# PiPERにgripperを付けると初期joint-move-toができなくなる問題

## 予想される原因
cd-workerに送られるrigid bodyのposeの問題
joint-move-to(ik-workerにおける`set_joint_targets`)は
ik-workerが`jMove`モードになりik-worker(のikCdStepClassオブジェクト)のstep関数で
動き、干渉チェックの結果が反映される(干渉していたら停止する)。
`attach-to-another`したのち一度も`send-base-coord`(ik-workerの`set_base_coord`)
される前にik-workerのstepが動き出すと、想定外の配置がcd-workerに送られて、その結果
干渉が発生することがある

簡単のためには、初期化完了まで干渉チェックを無視(ignoreCollision)すればよいが、
全てのレイアウトが完了したことをどのように知らせればよいか??

# immersive web emuratorでVRコントローラーで動かす時、動かしはじめの一発だけとんでもない場所に行ってしまう問題

`armMotionUI.js`は、トリガーオンイベント時の(アームとコントローラー双方の)位置姿勢を覚えておき、そこからの相対位置姿勢を反映させるシンプルな実装(要確認)。そのためトリガーオンイベント時のどちらかの位置姿勢が正しく取れていないと暴走する

