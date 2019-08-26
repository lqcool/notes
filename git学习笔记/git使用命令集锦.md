

### 基础

1.安装篇

（1）windows上面使用git直接到官网下载git安装程序，完成后开始菜单中git->git bash如果能弹出，安装成功。

（2）自报家门，打开git bash，然后配置用户名和邮箱（github注册的）

`git config --global user.name "Your Name" `

`git config --global user.email  "youEmail@xx.com"` 

（3）git config 命令的--global参数，表示这台机器上面的所有GIT仓库都会使用这个配置，也可一对某个指定的仓库使用不同的用户名和Email地址。

（4）git本地生产公钥和私钥rsa（生产好后，直接将本地的公钥配置在github的设置中的ssh配置中，实现免密码推送）

`ssh-keygen -t rsa -C "youEmail@xx.com"` 

2.查看配置信息，要检查已有的配置信息，可以使用

 `git config --list` 或者使用 `git config -l`

3.也可以直接查看某个环境变量的设定（只需要把特定的名字跟在后面）

`git config user.name`

4.要了解git各式工具怎么用，可以阅读使用帮助，例如查看config 命令怎么使用

`git help config`

5.查看git的版本

`git version` 

6.创建文件夹

`mkdir 文件夹名称`

7.显示当前目录

`pwd`

8.查看文件

`cat 文件名`

9.清空git暂存区

`git rm -r --cached`

`git rm -r --cached 文件名`(git移除对某文件的版本控制)

10.打开文件并编辑（打开编辑器）

`vi 文件名称（或者 vim 文件名称）`

11.创建.gitignore文件

（1）进入根目录

（2）touch .gitignore 生成“.gitignore”文件

（3）在.gitignore文件中输入要忽略的文件夹或者文件,例如忽略test文件夹：test/

12.将文件夹变为git仓库（初始化一个git仓库）

`git init`

13.git init在当前目录下面生成.git目录，用来跟中管理版本库，默认是隐藏的，查看命令如下

`ls -ah`

14.把文件添加到仓库暂存区进行跟踪（是指从工作空间添加到暂存区保存）

`git add 文件名`

14.跳过添加到暂存区，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，跳过 `git add` 步骤

`git commit -a -m "提交备注"`

15.强制把文件添加到git中

`git add -f 文件名称`

16.把文件提交到仓库

`git commit -m "提交备注"`

17.查看仓库当前状态（会显示哪些改变的，哪些没有跟踪的，哪些需要提交的）

`git status`

18.要查看尚未暂存的文件更新了哪些部分，不加参数直接输入 `git diff`

`git diff `

19.查看已经暂存起来的变化（比较的是工作目录中和暂存区域快照之间的差异）

`git diff --cached（高版本支持git diff --staged）`

20.显示从最近到最远的提交日志，查看历史记录

`git log`（格式化加上 --pretty=oneline 参数后更好看,`git log --pretty=oneline`） 
每次提交一个版本，实际上Git就会把他们自动串成一条时间线。

21.查看分支合并图

`git log --graph`

22.git log加入如下参数查看分支合并情况（以一个图的方式展现出来）

`git log --graph --pretty=oneline --abbrev-commit`

23.git的版本回退

`git reset --hard commit_id`

24.版本回退到上一个版本

`git reset --hard HEAD^`

这条命令会把你工作目录中所有未提交的内容清空(当然这不包括未置于版控制下的文件 untracked files). 从另一种角度来说, 这会让"git diff" 和"git diff --cached"命令的显示法都变为空. 

25.回退到上上一个版本

`git reset --hard HEAD^^`

26.回退到前100个版本

`git reset --hard HEAD~100`

27.指定到某个版本

`git reset --hard 版本号（版本号是要给生成的hash值，不用写全，可以只是一部分，一般是前面6位数）`

28.git 查看每一次命令记录(在找commit id的时候非常有用，查找需要恢复的版本号)

`git reflog`

git 查看某个分支的创建时间

`git reflog show --date=iso <branch-name>`

29.丢弃工作区的修改（也就是回退一个文件，前面的git reset --hard ***是回退整个工作空间，慎用）

`git checkout -- 文件名`

30.暂存区的修改撤销掉（unstage），重新放回工作区(HEAD表示最新版本)

`git reset HEAD file`

31.当使用git reset --hard **，时候丢失了文件（这个是指的是，我们执行了git add .的文件，但是还没有git commit 的文件）的找回办法（当然，如果我们空间里面没有跟踪的文件，那就是gg了，真的丢了，所以尽量要git add .，然后需要的时候git commit一下）[原文](https://www.cnblogs.com/hope-markup/p/6683522.html)（我没试过，记录一下，万一遇到了呢）

```
git fsck --lost-found  //找回git add过但是已经不存在文件中的内容
然后找到.git/lost-found/other这个路径下的文件
将这些文件拷贝到一个其他的地方，然后通过sublime或者其它的编辑器，查看文件，根据文件的里面的内容从新命名。
```

32.删除一个文件

`git rm 文件名`
`git commit -m ""(使得删除生效，版本库中也被删除)`

33.删除一个文件，如果该文件已经被添加到了暂存区，并且这个时候文件被修改，删除需要强制删除

`git rm 文件名 -f`

34.想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中,仅是从跟踪清单中删除

`git rm --cached 文件名称`

后面可以列出文件或者目录的名字，也可以使用 glob 模式

`git rm log/\*.log`

注意到星号 `*` 之前的反斜杠 `\`，因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开，实际上不加反斜杠也可以运行，只不过按照 shell 扩展的话，仅仅删除指定目录下的文件而不会递归匹配。上面的例子本来就指定了目录，所以效果等同，但下面的例子就会用递归方式匹配，所以必须加反斜杠。）。此命令删除所有 `log/` 目录下扩展名为 `.log` 的文件。

`git rm log \*~ （会递归删除当前目录及其子目录中所有 `~` 结尾的文件）`

35.把本地仓库与git服务器仓库关联

`git remote add 分支名称 git仓库地址`
例子：`git remote add origin https://github.com/LQ55/gitstudy.git（名为origin）`
本地仓库与github仓库的origin分支建立关联例子：

`git remote add gitteee https://github.com/LQ55/gitstudy.git(名字为gitteee)`

36.把本地库的内容推送到远程，用git push命令，实际上就是把当前分支master推送到远程

结构为：`git push origin [本地分支名]:[远程分支名] `

`git push`（是push当前分支到当前分支的追踪关系分支 ，一般本地为master分支，push到远程仓库的master分支）

`git push -u origin master`

37.移除远程仓库

`git remote rm 仓库名称`,例如`git remote rm origin`

38.重命名远程仓库

`git remote rename 原始仓库名 现在仓库名，`例如`git remote rename orgin ddd306ddd`

39.克隆一个本地库

`git clone git仓库地址`

40.希望在克隆的时候，自己定义要新建的项目名称，可以在后面指定新名称。

`git clone git仓库地址 newName`（和上面的差别就是，现在文件名为newName，而不是仓库地址对应的名字）

41.git创建分支

`git branch 分支名称`

42.切换分支

`git checkout 分支名称`

44.加入参数-b表示创建并切换分支

`git checkout -b 分支名称`

45.git删除分支

`git branch -d 分支名称`

46.git强行删除分支（某些时候，开发了并没有用，需要将当前分支，并且当前分支还没有合并）

`git brach -D 分支名称`

47.查看当前分支(git branch会列出所有分支，当前分支前面会有一个*符号)

`git branch`

要从该分支清单中列出已经（或者尚未）与当前分支合并的分支，使用`--merged`和`--no-merged`选项，如查看哪些分支已经并入当前分支（也就是哪些分支是当前分支的直接上游）使用

`git branch --merged`

查看尚未合并到当前分支的分支使用（这些分支运行`git branch -d branchName`是无法删除的，因为没有合并，数据会丢失，要强制删除分支使用`git branch -D branchName`）

`git branch --no-merged`

48.查看当前详细分支信息（可看到当前分支与对应的远程追踪分支）

`git branch -vv `

49.合并指定分支到当前分支

`git merge 分支名称`

50.保存当前工作现场，等以后恢复现场继续工作

`git stash`

51.回到分支以后查看保存的分支现场（列表展示）

`git stash list`

52.恢复分支现场

(1)`git stash apply` (恢复后stash内容 并不会删除需要 git stash drop 删除)
(2)`git stash pop `(恢复的同时把stash内容也删除掉)

53.恢复到指定的stash

(1)先用`git stash list` 查看，然后恢复到指定的stash
(2)`git stash apply stash@{0}`

53.根据名字删除stash

(1)先用`git stash list` 查看，然后删除指定的stash

(2)`git stash drop stash@{0}`

也可以使用 `git stash clear` 命令一次性删除所有缓存的stash

54.查看远程库的信息

`git remote`

55.查看更佳详细的远程库信息

`git remote -v`(查看到可以抓取和推送的origin地址，没有推送权限看不到push地址)

56.推送指定分支到分支到远程

`git push origin` 分支名称

57.使用强制push方法发（这样会覆盖远程分支，丢失修改）

`push -u origin master -f `

58.创建远程origin的dev分支到本地

`git checkout -b dev origin/dev`

59.设置本地分支跟踪服务器的远程某个分支，可以使用如下命令

`git branch -u remote-name/branch-name branch-name`

或者使用

`git branch --set-upstream remote-name/branch-name branch-name`

例如设置本地master分支跟踪服务器的dev分支，使用如下

`git branch --set-upstream orign/dev master`

使用上面的将本地分支关联到远程分支后，以后在此分支上面的推送将会是推送到远程关联的分支上面（通常这种在开发的时候，就是远程一个开发分支关联到本地分支，本地推送到远程开发分支以后，然后将远程的开发分支合并到远程的master分支）

60.抓取远程分支最新内容到本地

`git pull` (有时候抓取以后有冲突，需要手动解决，该命令相当于`git fetch` + `git merge`)

61.打新标签（Git 也可以对某一时间点上的版本打上标签。人们在发布某个软件版本（比如 v1.0 等等）的时候，经常这么做。 ）

`git tag 标签名字`

62.查看所有标签

`git tag`

63.对指定commit打标签

(1)先`git log --pretty=oneline --abbrev-commit`查看历史提交的`commit id`
(2)`git tag 标签名称 commit-id`

64.查看标签信息

`git show 标签名称`

65.创建带有说明的标签，用-a指定标签名，-m指定说明文字

`git tag -a 标签名 -m “说明文字”`

66.删除标签

`git tag -d 标签名称`

67.推送某个标签到远程

`git push origin 标签名称`

68.一次性推送全部尚未推送到远程的本地标签

`git push origin --tags`

69.删除已经推送到远程的标签

(1)先删除本地标签 `git tag -d 标签名称`
(2)删除远程标签 `git push origin :refs/tags/标签名`
70.查看远程分支
`git branch -r` 或者 `git branch -a`
71.查看远程分支详情
`git branch -r -v` 或者 `git branch -a -v`
72.删除远程分支
(1)`git branch -r -d origin/分支名称`
(2)`git push origin :分支名称`

73.移动文件

`git mv file_from file_to`

74.git设置文件上传的上限（遇到>100M的文件上传失败）=====>失败了

`git config --global http.postBuffer 524288000`（设置http.postBuffer为500M，上限为500M）

75.查看配置（全局与局部和系统）

`git config --global --list `（查看全局配置）

`git config --local --list`（查看局部配置）

`git config --system --list`（查看系统配置）

### 开发

76.用git把单个文件退到某一个版本（经过下面3步）

(1)git log filename.xxx（查看filename.xxx的提交记录【提供文件所在的路径与文件名】）

git log filename.xxx 会列出一个提交日志列表，并提供commit id

(2)找到需要会退的版本号：例如c9419862（只需要复制某一次commit id的前面一部分）

(3)git reset c9419862 filename.xxx（把文件回退到指定的版本）

77.本地修改了一堆文件（并没有使用git add 到缓存区），想放弃修改

(1)git checkout — filename（放弃单个文件或者文件夹）

(2)git checkout .（放弃所有的文件的修改）

78.本次新增了一堆文件（并没有git add到暂存区），放弃修改

(1)rm filename / rm dir -rf（单个文件/文件夹）

(2)git clean -xdf（所有文件/文件夹）

79.本地修改/新增了一堆文件，已经git add到暂存区，想放弃修改

(1)git reset HEAD filename（单个文件/文件夹：）

(2)git reset HEAD .（所有文件/文件夹：）

80.本地通过git add & git commit 之后，想要撤销此次commit

(1)git reset commit_id（这个id是你想要回到的那个节点，可以通过git log查看，可以只选前6位）**撤销之后，你所做的已经commit的修改还在工作区！**【参考：https://blog.csdn.net/ustccw/article/details/79068547】

81.查看(追踪)某一行代码的修改历史，查看某行代码是由谁写的，在那个commit中提交的

(1)`git blame file_name`

(2)`git blame -L 201,208 ddd.js` 这样会把ddd.js代码文件的201到208航的代码的改动记录输出(显示格式为：commitID|代码提交作者|提交时间|代码位于文件中的行数|实际代码)

 知道了commit ID，使用`git show commitID`来看更加详细的信息

82.将开发分支的部分功能合并到稳定的分支。例如，假设我们有个稳定版本的分支，叫v2.0，另外还有个开发版本的分支v3.0，我们不能直接把两个分支合并，这样会导致稳定版本混乱，但是又想增加一个v3.0中的功能到v2.0中

用法：`git cherry-pick <commit id>` 注意：当执行完成cherry-pick后，将会生成一个新的提交，这个新的提交的hash值和原来的不同，但是标志名一样。

**例如：**
(1)`git checkout v2.0`（切换到要稳定分支）

(2)`git log`（查看提交的commit-id）

(3)`git cherry-pick 38361a55`（这个 38361a55 号码，位于v3.0分支中。执行完成后，会将v3.0中的提交id为38361a55的合并到v2.0稳定版本中）

命令集合：

```bash
git cherry-pick --continue
git cherry-pick --quit
git cherry-pick --abort
git cherry-pick <commit id> #:单独合并一个提交
git cherry-pick -x <commit id>#：同上，不同点：保留原提交者信息。
#Git从1.7.2版本开始支持批量cherry-pick，就是一次可以cherry-pick一个区间的commit。
git cherry-pick <start-commit-id>..<end-commit-id> #把<start-commit-id>到<end-commit-id>之间(左开右闭，不包含start-commit-id)的提交cherry-pick到当前分支
git cherry-pick <start-commit-id>^..<end-commit-id> #有"^"标志的表示把<start-commit-id>到<end-commit-id>之间(闭区间，包含start-commit-id)的提交cherry-pick到当前分支

```

(83) git commit 参数

(1)--amend参数：`git commit --amend -m "new commit message"`（--amend`参数用于撤销上一次 commit，然后生成一个新的 commit。）

(2)-a参数：`git commit -am "message"`（-a参数用于先将所有工作区的变动文件，提交到暂存区，再运行`git commit`。用了`-a`参数，就不用执行`git add .`命令了。）

如果没有指定提交说明，运行下面的命令会直接打开默认的文本编辑器，让用户撰写提交说明。

`git commit -a`

(2018-3-7修订)

(2019-3-14修订)

