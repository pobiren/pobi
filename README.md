Pobi Project
============

What: A `Kill You 3000` package for G.F.W. LOL a.k.a. A Fan-Qiang tool-chains minimize your configure works. you can even set it up for your old man.

Proto: shadow, socks5, for now.

Works: ie, safari, chrome, firefox, iOS device.

Does Not Works yet: Andriod device(does not support config a proxy at all, but you can install some app to enable it).

Best Practice: set up an virtual machine(bridge network). install it, auto start when boot. and point your DNS to the vm in your router.

_The name was Inspired by Liu Cixin's science fiction `The Three Body Trilogy` (aka. `SanTi`) part II._

_Inspired and forks of ShadowSocks._

Diagram
-------

```
                 +---------------LOCAL----------------+         +--WORKER--+
                 |                                    |         |          |
+-------+        | +---+  +----+  +-----+    +------+ |  +---+  | +------+ |
|Browser| --DNS--> |DNS|  |WPAD|  |HTTP |    |SOCKS5| |  |GFW|  | |SERVER| |
|       | <------- |   |  |    |  |PROXY|    |PROXY | |  |   |  | |      | |
|CHROME |        | +---+  |    |  |     |    |      | |  |   |  | |      | |
|SAFARI | --WPAD PAC----> |    |  |     |    |      | |  |   |  | |      | |
|FIREFOX| <-------------- |    |  |     |    |      | |  |   |  | |      | |
|OPERAE |        |        +----+  |     |    |      | |  |   |  | |      | |
|IE     | --HTTP PROXY----------> |     | -> |      | --ENCODED-> |      | |
|...    | <---------------------- |     | <- |      | <-ENCODED-- |      | |
+-------+        |                +-----+    |      | |  |   |  | |      | |
                 |                           |      | |  |   |  | |      | |
+-------+        |                           |      | |  |   |  | |      | |
|Tools  | --SOCKS5 PROXY-------------------> |      | --ENCODED-> |      | |
|CURL   | <--------------------------------> |      | <-ENCODED-- |      | |
+-------+        |                           +------+ |  +---+  | +------+ |
                 +------------------------------------+         +----------+
```

Install & Run
-------------

1. Download and install node for your platform. http://nodejs.org/download/
1. Install by `npm install https://github.com/pobiren/pobi/tarball/master`
1. Run (test locally, you cannot use it to cross the wall)
  1. for local test `sudo npm start pobi local`
  1. for local test `sudo npm start pobi worker`
1. Run (with remote worker, obviously, you need a server outside)
  1. you can setup your remote server by `npm install https://github.com/pobiren/pobi/tarball/master` and `npm start pobi worker shadow://pass@1.1.1.1:1234`
  1. for run with remote worker `sudo npm start pobi local shadow://pass@1.1.1.1:1234` make sure the 1.1.1.1 is your server ip and port or pass is right.

**Test running**

* testing dns try `dig wpad @127.0.0.1` or `nslookup wpad 127.0.0.1`
* testing wpad try `curl http://wpad/wpad.dat` *please set dns first*.
* testing http proxy try `curl -x http://127.0.0.1:8080 http://qq.com`
* testing http tunnel try `curl -x http://127.0.0.1:8080 https://github.com`
* testing socks5 proxy try `curl -x socks5://127.0.0.1:7070 http://qq.com`

**Setting up your network and/or browser**

1. Pointing dns to your ip (or you can set it in your router, then all device will works)
2. Setting proxy `automaticlly config by network`. for ie/xp or other system don't support autoconfig, set the auto config url to http://wpad/wpad.dat

Q & A
-----

Why http proxy?

* It's the only proxy protocol works on every device/browser, even ie6.

Where is the logs, if something goes wrong?

* It's disabled by default, you can enable it by simply add `DEBUG=*`. such as `sudo DEBUG=* npm start pobi local` or `DEBUG=* npm start pobi worker`

Thanks
------

* AutoProxyGFWList: http://code.google.com/p/autoproxy-gfwlist/
* AutoProxy2Pac: http://autoproxy2pac.appspot.com/pac/ssh-d
* *The Party*, *The Country*, and *The G.F.W.* ;)