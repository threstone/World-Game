# World-Game
1.连接第一层服务器，名为入口服务器

2.入口服务器返回多个地区大厅服务器组中Ping-Server地址

3.通过Http请求Ping-Server，确定最小延迟大厅服务器组的地址

4.连接指定大厅服务器

5.进行逻辑服务器的选择，确定在哪个逻辑服务器组中匹配游戏，用户可刷新以重新确定与各个逻辑服务器组的延迟

6.匹配游戏，获取到指定逻辑服务器地址，连接并开始游戏

```
// 服务器公告牌
提供全世界各种服务器信息，各服务器应定时保持上传服务器信息，否则公告牌将视此服务器故障，设置一个固定的域名
```

```
// 入口服务器, 可以每个大洲一个部署一套，实时性需求低
Enter-Gate: 需要拥有所有大厅服务器组的IP信息，这个信息在服务器公告牌
```

```
// 大厅服务器组, 地区部署粒度中，实时性需求中高
Ping-Server: 提供Http Server,返回大厅服务器地址

Hall-Server: 无状态,实现商城等功能，单点故障后玩家通过重新向Ping-Server获取Hall-Server地址实现重连

Master: 管理Hall-Server\Ping-Server的扩容与销毁，向服务器公告牌注册Ping-Server信息并keep-alive，注册的信息有过期时间，而Master需要一直保持不过期
```

```
// 逻辑服务器组，地区部署粒度高，实时性需求高
Ping-Server: 提供Http Server,返回用户请求，确定延迟

Game-Server: 无状态,实现游戏具体业务，例如PUBG、Dota一局游戏的具体逻辑，单点故障后游戏终止，

             可视具体游戏类型决定是否可以在其他Game-Server上恢复游戏(PUBG、Dota这种多人的一般不行，因为游戏数据要同步到内存外消耗巨大，得不偿失)

Matching—Server: 匹配游戏，成功匹配后向指定的玩家们发送Game-Server地址与Token，实现多个玩家在同一个Game-Server中开始游戏。

Master: 管理Game-Server的扩容与销毁，向服务器公告牌注册逻辑服务器信息并keep-alive，注册的信息有过期时间，而Master需要一直保持不过期
```
